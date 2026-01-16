import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
  fetchProducts,
} from '../features/products/productsSlice';
import './Catalog.css';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.imageUrl} alt={product.name} className="product-image" />
    <div className="product-info">
      <h3>{product.name}</h3>
      <p className="product-price">€{product.price}</p>
      <Link to={`/catalogo/${product.id}`} className="details-link">
        Vedi Dettagli
      </Link>
    </div>
  </div>
);

function Catalog() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    // Carica i prodotti solo se non sono già stati caricati o se il caricamento non è in corso
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <p>Caricamento prodotti...</p>;
  } else if (status === 'succeeded') {
    content = (
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } else if (status === 'failed') {
    content = <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>Catalogo Prodotti</h1>
      <p>Esplora la nostra collezione di tesori usati.</p>
      {content}
    </div>
  );
}

export default Catalog;