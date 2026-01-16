import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAllProducts,
  selectProductsStatus,
  fetchProducts,
} from '../features/products/productsSlice';
import './Homepage.css';

// Potremmo riutilizzare il ProductCard dal catalogo se lo spostassimo in components/common
const ProductCard = ({ product }) => (
    <div className="product-card-hp">
      <img src={product.imageUrl} alt={product.name} className="product-image-hp" />
      <div className="product-info-hp">
        <h3>{product.name}</h3>
        <p className="product-price-hp">€{product.price}</p>
        <Link to={`/catalogo/${product.id}`} className="details-link-hp">
          Vedi Dettagli
        </Link>
      </div>
    </div>
  );

function Homepage() {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(selectProductsStatus);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchProducts());
      }
    }, [status, dispatch]);

    // Mostra solo i primi 4 prodotti come "in vetrina"
    const featuredProducts = products.slice(0, 4);

  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Benvenuto a Portobello!</h1>
          <p>La tua vetrina sull'usato di qualità. Scopri tesori nascosti e pezzi unici.</p>
          <Link to="/catalogo" className="cta-button">
            Esplora il Catalogo
          </Link>
        </div>
      </header>

      <section className="featured-products">
        <h2>In Vetrina</h2>
        {status === 'loading' && <p>Caricamento...</p>}
        {status === 'succeeded' && (
            <div className="featured-grid">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )}
      </section>
    </div>
  );
}

export default Homepage;