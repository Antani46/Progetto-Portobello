import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import ProductForm from '../../components/forms/ProductForm';

import { generateProductMeta } from '../../utility/idGen';

//Pagina per l'aggiunta di un nuovo prodotto.
function AddProductPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  //Gestione dell'invio del form
  const handleSubmit = async (productData) => {
    setIsSaving(true);
    try {
      //Aggiunge ID univoco e data di creazione da idGen
      const newProduct = {
        ...productData,
        ...generateProductMeta()
      };

      //Chiamata API POST per creare il prodotto
      await apiClient.post('/products', newProduct);
      navigate('/admin');
    } catch (error) {
      console.error("Errore salvataggio:", error);
      alert('Errore nel salvataggio del prodotto');
    } finally {
      setIsSaving(false);
    }
  };

  //Renderizzazione
  return (
    <div style={{ padding: '20px' }}>
      <h1>Aggiungi Nuovo Prodotto</h1>
      <ProductForm onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
}

export default AddProductPage;