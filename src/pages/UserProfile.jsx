import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, logout } from '../features/auth/authSlice';
import './UserProfile.css';

function UserProfile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) {
    return <div>Caricamento profilo...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <h1>Profilo Utente</h1>
        <div className="profile-info">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Ruolo:</strong> {user.role}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;