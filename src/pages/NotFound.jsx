import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>404 - Pagina non trovata</h1>
      <p>La pagina che stai cercando non esiste.</p>
      <Link to="/">Torna alla Homepage</Link>
    </div>
  );
}

export default NotFound;