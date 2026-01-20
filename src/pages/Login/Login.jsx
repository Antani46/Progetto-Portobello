import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import './Login.css';

//Pagina di Login

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(''); //Stato per errori di validazione locale

  const dispatch = useDispatch();

  const { isAuthenticated, error: reduxError, isLoading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profilo';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    //Avvio processo di login tramite Thunk Redux
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            placeholder="es. admin@portobello.com"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Inserisci password"
          />
        </div>

        {/*Visualizzazione Errori */}
        {(localError || reduxError) && <p className="error-message">{localError || reduxError}</p>}

        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? 'Accesso in corso...' : 'Accedi'}
        </button>
      </form>
    </div>
  );
}

export default Login;