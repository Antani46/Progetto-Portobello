import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Componente condiviso per la visualizzazione della card prodotto.
 * Utilizzato in Catalog e Homepage per garantire consistenza visiva.
 */
const ProductCard = ({ product }) => (
    <div className="product-card">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <div className="product-info">
            <h3>{product.name}</h3>
            <p className="product-price">€{product.price}</p>
            <Link to={`/catalogo/${product.id}`} className="btn-details">
                Vedi Dettagli
            </Link>
        </div>
    </div>
);

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
};

export default ProductCard;
