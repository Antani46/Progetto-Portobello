import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAllProducts,
  selectProductsStatus,
  fetchProducts,
  deleteProduct,
} from '../features/products/productsSlice';
import { selectUser } from '../features/auth/authSlice';
import './AdminDashboard.css';

function AdminDashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Amministratore</h1>
      {user && <p>Benvenuto, <strong>{user.name}</strong>! Gestisci il catalogo da qui.</p>}
      
      <Link to="/admin/new-product" className="add-product-btn">
        &#43; Aggiungi Nuovo Prodotto
      </Link>

      <h2>Elenco Prodotti</h2>
      {status === 'loading' && <p>Caricamento...</p>}
      {status === 'succeeded' && (
        <table className="products-table">
          <thead>
            <tr>
              <th>Nome Prodotto</th>
              <th>Prezzo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>€{product.price}</td>
                <td className="actions-cell">
                  <Link to={`/admin/edit-product/${product.id}`} className="action-btn edit-btn">
                    Modifica
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="action-btn delete-btn">
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {status === 'failed' && <p style={{color: 'red'}}>Errore nel caricamento dei prodotti.</p>}
    </div>
  );
}

export default AdminDashboard;