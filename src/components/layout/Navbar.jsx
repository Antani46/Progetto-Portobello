import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import './Navbar.css';

/**
 * Componente Navbar.
 * Gestisce la navigazione principale e la visualizzazione condizionale basata sull'autenticazione.
 */
function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Gestisce il logout dell'utente.
   * Dispatcha l'azione di logout e reindirizza alla homepage.
   */
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo Principale */}
        <Link to="/" className="nav-logo">
          Portobello
        </Link>

        {/* Menu di Navigazione */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/catalogo" className="nav-link">Catalogo</Link>
          </li>
          <li className="nav-item">
            <Link to="/contatti" className="nav-link">Contatti</Link>
          </li>

          {/* Sezione Autenticata */}
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/profilo" className="nav-link">Profilo</Link>
              </li>

              {/* Link Admin visibile solo agli amministratori */}
              {user?.role === 'Admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">Admin</Link>
                </li>
              )}

              <li className="nav-item">
                <button onClick={handleLogout} className="nav-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            /* Sezione Non Autenticata */
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;