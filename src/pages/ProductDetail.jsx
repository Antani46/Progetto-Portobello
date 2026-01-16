import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById, fetchProducts, selectProductsStatus } from '../features/products/productsSlice';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // L'ID dall'URL è una stringa, lo converto in numero se necessario
  const productId = Number(id);
  const product = useSelector((state) => selectProductById(state, productId));
  const status = useSelector(selectProductsStatus);

  useEffect(() => {
    // Se i prodotti non sono stati caricati (es. accesso diretto alla pagina), avvia il fetch
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  

  if (status === 'loading' || status === 'idle' ) {
    return <p>Caricamento prodotto...</p>;
  }

  if (!product) {
    return (
      <div>
        <h2>Prodotto non trovato</h2>
        <Link to="/catalogo">Torna al Catalogo</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
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