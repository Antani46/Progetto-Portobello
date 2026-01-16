import { Link } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 - Pagina non trovata</h1>
      <p>La pagina che stai cercando non esiste.</p>
      <Link to="/" className="btn-home">Torna alla Homepage</Link>
    </div>
  );
}

export default NotFound;