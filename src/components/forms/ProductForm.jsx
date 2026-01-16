import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';

const ProductForm = ({ product, onSubmit, isSaving }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // If we are editing, populate the form with the product's data
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        imageUrl: product.imageUrl || '',
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Il nome è obbligatorio.";
    if (!formData.description) newErrors.description = "La descrizione è obbligatoria.";
    if (!formData.price) {
        newErrors.price = "Il prezzo è obbligatorio.";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
        newErrors.price = "Il prezzo deve essere un numero positivo.";
    }
    if (!formData.category) newErrors.category = "La categoria è obbligatoria.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        const finalData = { ...formData, price: Number(formData.price) };
        onSubmit(finalData);
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form" noValidate>
        <div className="form-group">
          <label htmlFor="name">Nome Prodotto</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrizione</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Prezzo (€)</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
          {errors.price && <p className="error-text">{errors.price}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
          {errors.category && <p className="error-text">{errors.category}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">URL Immagine</label>
          <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={isSaving}>
            {isSaving ? 'Salvataggio...' : 'Salva Prodotto'}
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/admin')}>
            Annulla
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
