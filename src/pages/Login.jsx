import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, selectAuthStatus, selectAuthError, selectIsAuthenticated } from '../features/auth/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Determina da dove reindirizzare dopo il login
  const from = location.state?.from?.pathname || '/profilo';

  const validateForm = () => {
    if (!email || !password) {
      setFormError('Email e password sono obbligatori.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Il formato dell'email non è valido.");
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // L'oggetto passato qui sono le 'credentials' nel thunk
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={authStatus === 'loading'}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={authStatus === 'loading'}
          />
        </div>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        {authStatus === 'failed' && <p style={{ color: 'red' }}>{authError}</p>}
        <button type="submit" disabled={authStatus === 'loading'}>
          {authStatus === 'loading' ? 'Accesso in corso...' : 'Accedi'}
        </button>
      </form>
    </div>
  );
}

export default Login;