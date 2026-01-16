import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import './AdminDashboard.css';

/**
 * Dashboard di Amministrazione.
 * Permette agli utenti con ruolo 'Admin' di visualizzare, modificare ed eliminare prodotti.
 */
function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Recupera la lista completa dei prodotti
  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Errore nel caricamento della dashboard:", error);
    } finally {
      setLoading(false);
    }
  };


  // Gestisce l'eliminazione di un prodotto
  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

    try {
      await apiClient.delete(`/products/${id}`);
      // Aggiorna lo stato locale rimuovendo il prodotto eliminato
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert("Errore durante l'eliminazione del prodotto.");
    }
  };

  if (loading) return <p className="loading-text">Caricamento dashboard...</p>;

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Amministratore</h1>

      <Link to="/admin/new-product" className="btn-primary add-product-btn">
        + Aggiungi Prodotto
      </Link>

      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Prezzo</th>
            <th>Categoria</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>€{product.price}</td>
              <td>{product.category}</td>
              <td className="actions-cell">
                <Link to={`/admin/edit-product/${product.id}`} className="btn-secondary btn-small">
                  Modifica
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn-danger btn-small"
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;