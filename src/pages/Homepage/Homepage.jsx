import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import './Homepage.css';
import ProductCard from '../../components/common/ProductCard';

/**
 * Componente per la card del prodotto in vetrina.
 */
// ProductCard rimosso in favore del componente condiviso in components/common

/**
 * Pagina principale dell'applicazione.
 * Visualizza l'header promozionale (Hero) e una selezione di prodotti in vetrina.
 */
function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effetto per il caricamento dei prodotti in vetrina
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await apiClient.get('/products');

        // Ordina per data creazione (dal più recente al più vecchio)
        const sortedProducts = response.data.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return 0; // Fallback se mancano le date
        });

        // Seleziona i primi 4 prodotti per la vetrina
        setProducts(sortedProducts.slice(0, 4));
      } catch (error) {
        console.error("Errore caricamento vetrina", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section: Area promozionale principale */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Benvenuto a Portobello!</h1>
          <p>La tua vetrina sull'usato di qualità. Scopri tesori nascosti e pezzi unici.</p>
          <Link to="/catalogo" className="cta-button">
            Esplora il Catalogo
          </Link>
        </div>
      </header>

      {/* Featured Products: Griglia prodotti in evidenza */}
      <section className="featured-products">
        <h2>In Vetrina</h2>

        {loading ? (
          <p>Caricamento vetrina...</p>
        ) : (
          <div className="featured-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Homepage;