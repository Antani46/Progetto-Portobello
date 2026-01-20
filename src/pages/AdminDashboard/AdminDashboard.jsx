import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../features/products/productsSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

//Dashboard di Amministrazione.
function AdminDashboard() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);

  //Caricamento prodotti se necessario
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  //Gestisce l'eliminazione di un prodotto tramite Redux
  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (error) {
      alert("Errore durante l'eliminazione del prodotto: " + error);
    }
  };

  if (status === 'loading') return <p className="loading-text">Caricamento dashboard...</p>;

  //Ordinamento per Data di Creazione
  const sortedProducts = [...products].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

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
            <th>Data Creazione</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>€{product.price}</td>
              <td>{product.category}</td>
              <td>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : '-'}</td>
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