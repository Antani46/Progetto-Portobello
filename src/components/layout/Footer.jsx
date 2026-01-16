import './Footer.css';

/**
 * Componente Footer.
 * Visualizza le informazioni di copyright e i crediti a fondo pagina.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Portobello - Negozio di Articoli Usati. Tutti i diritti riservati.</p>
        <p>Progetto a scopo didattico.</p>
      </div>
    </footer>
  );
}

export default Footer;
