import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewProduct } from '../features/products/productsSlice';
import ProductForm from '../components/forms/ProductForm';

function AddProductPage() {
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (productData) => {
    setIsSaving(true);
    try {
      // unwrap() will throw an error if the thunk is rejected
      await dispatch(addNewProduct(productData)).unwrap();
      navigate('/admin');
    } catch (error) {
      console.error('Failed to save the product: ', error);
      // Here you could show an error message to the user
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1>Aggiungi Nuovo Prodotto</h1>
      <ProductForm onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
}

export default AddProductPage;
