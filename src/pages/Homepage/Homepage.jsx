import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import './Homepage.css';
import ProductCard from '../../components/common/ProductCard';

//Pagina principale dell'applicazione.
function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //Effetto per il caricamento dei prodotti in vetrina
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await apiClient.get('/products');

        //Ordina per data creazione
        const sortedProducts = response.data.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return 0; //Fallback se mancano le date
        });

        //Seleziona i primi 4 prodotti per la vetrina
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
      {/*Area promozionale principale */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Benvenuto a Portobello!</h1>
          <p>La tua vetrina sull'usato di qualità. Scopri tesori nascosti e pezzi unici.</p>
          <Link to="/catalogo" className="cta-button">
            Esplora il Catalogo
          </Link>
        </div>
      </header>

      {/*Griglia prodotti in evidenza */}
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