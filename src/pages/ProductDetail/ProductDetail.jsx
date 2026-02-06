import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiClient from '../../api/apiClient';
import { selectProductById } from '../../features/products/productsSlice';
import NotFound from '../NotFound/NotFound';
import './ProductDetail.css';

//Pagina di Dettaglio Prodotto.

function ProductDetail() {
  const { id } = useParams();

  const existingProduct = useSelector((state) => selectProductById(state, id));

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    // Se il prodotto è già presente nello stato globale, usalo direttamente
    if (existingProduct) {
        setProduct(existingProduct);
        return;
    }

    // Se il prodotto non è già presente nello stato, effettua la chiamata API
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        setProduct(response.data);
      } catch  (err) {
        setError(err.response?.data || 'Prodotto non trovato');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, existingProduct]);

  if (loading) return <p className="loading-text">Caricamento dettagli...</p>;

  if (error || !product) return <NotFound />;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        {/* Immagine del Prodotto */}
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />

        {/* Informazioni testuali */}
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-category">{product.category}</p>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">€{product.price}</p>

          <Link to="/catalogo" className="back-link">
            &larr; Torna al Catalogo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;