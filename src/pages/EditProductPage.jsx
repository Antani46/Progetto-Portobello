import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct, selectProductById } from '../features/products/productsSlice';
import ProductForm from '../components/forms/ProductForm';

function EditProductPage() {
  const { id } = useParams();
  const productId = Number(id);

  const product = useSelector((state) => selectProductById(state, productId));

  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (productData) => {
    setIsSaving(true);
    try {
      // The product object from the form doesn't have the id, so we add it
      await dispatch(updateProduct({ ...productData, id: productId })).unwrap();
      navigate('/admin');
    } catch (error) {
      console.error('Failed to update the product: ', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!product) {
    return <div>Prodotto non trovato.</div>;
  }

  return (
    <div>
      <h1>Modifica Prodotto</h1>
      <ProductForm product={product} onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
}

export default EditProductPage;
