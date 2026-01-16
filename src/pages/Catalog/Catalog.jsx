import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage, setSearchTerm, setCategory, selectPaginatedProducts } from '../../features/products/productsSlice';
import './Catalog.css';

/**
 * Componente per la visualizzazione della card prodotto nel catalogo.
 */
const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.imageUrl} alt={product.name} className="product-image" />
    <div className="product-info">
      <h3>{product.name}</h3>
      <p className="product-price">€{product.price}</p>
      <Link to={`/catalogo/${product.id}`} className="btn-details">
        Vedi Dettagli
      </Link>
    </div>
  </div>
);

/**
 * Pagina Catalogo.
 * Visualizza la lista dei prodotti con funzionalità di ricerca, filtro per categoria e paginazione.
 * Utilizza Redux per la gestione dello stato.
 */
function Catalog() {
  const dispatch = useDispatch();

  // Selezione stato da Redux (base e derivato)
  const { status, error, currentPage, searchTerm, selectedCategory } = useSelector((state) => state.products);
  const { items: paginatedItems, totalPages } = useSelector(selectPaginatedProducts);

  // Effetto per caricare i prodotti all'avvio se non presenti
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  // Gestione stati di caricamento ed errore
  if (status === 'loading') return <p className="loading-text">Caricamento prodotti in corso...</p>;

  if (status === 'failed') {
    const errorMsg = typeof error === 'object' ? JSON.stringify(error) : error;
    return (
      <div className="error-container">
        <p className="error-message">{errorMsg}</p>
        <button onClick={() => window.location.reload()} className="btn-retry">
          Riprova
        </button>
      </div>
    );
  }

  // Lista categorie (Simulata)
  const categories = ["Tutte", "Antiquariato", "Arredamento", "Musica", "Illuminazione", "Elettronica"];

  return (
    <div className="catalog-page">
      <h1>Catalogo Prodotti</h1>

      {/* Barra dei Filtri */}
      <div className="catalog-filters">
        <input
          type="text"
          placeholder="Cerca prodotto..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Griglia Risultati */}
      <div className="products-grid">
        {paginatedItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Controlli Paginazione */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Precedente
          </button>

          <span className="page-info">
            Pagina {currentPage} di {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Successiva
          </button>
        </div>
      )}
    </div>
  );
}

export default Catalog;