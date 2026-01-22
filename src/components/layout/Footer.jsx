import './Footer.css';

//Componente Footer
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
