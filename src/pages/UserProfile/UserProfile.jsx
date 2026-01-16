import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import './UserProfile.css';

/**
 * Pagina Profilo Utente.
 * Visualizza le informazioni dell'utente loggato e permette il logout.
 */
function UserProfile() {
  // Accesso allo stato di autenticazione Redux
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Gestione Logout
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  if (!user) {
    return <div className="user-profile-container">Caricamento profilo...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <h1>Profilo Utente</h1>
        <div className="profile-info">
          <p><strong>Nome:</strong> {user.name || user.user?.name}</p>
          <p><strong>Email:</strong> {user.email || user.user?.email}</p>
          <p><strong>Ruolo:</strong> {user.role || user.user?.role}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;