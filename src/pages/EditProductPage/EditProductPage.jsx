import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import ProductForm from '../../components/forms/ProductForm';

//Pagina di Modifica Prodotto.
function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productToEdit, setProductToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  //Recupera i dati del prodotto all'avvio
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        setProductToEdit(response.data);
      } catch (error) {
        alert('Prodotto non trovato!');
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  //Gestisce il salvataggio delle modifiche
  const handleUpdate = async (updatedData) => {
    setIsSaving(true);
    try {
      await apiClient.patch(`/products/${id}`, updatedData);
      navigate('/admin');
    } catch (error) {
      alert('Errore durante la modifica del prodotto');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <p style={{ padding: '20px' }}>Caricamento dati prodotto...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Modifica Prodotto</h1>

      {/*Form riutilizzabile per la modifica */}
      <ProductForm
        product={productToEdit}
        onSubmit={handleUpdate}
        isSaving={isSaving}
      />
    </div>
  );
}

export default EditProductPage;