import "./Catalog.css";
import { useEffect, useState, useMemo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getProducts } from "../Services/productService";
import QuantityPicker from "../QuantityPicker";
import { useCart } from "../pages/CartContext";
import { useAuth } from "../Features/AuthForm";
import favoriteProductService from "../Services/favoriteProductService";

function Catalog() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState(() =>
    user ? favoriteProductService.getFavoriteIds(user.email) : []
  );

  // Fetch initial catalog data
  useEffect(() => {
    const data = getProducts() || [];
    setProducts(data);

    // Initialize quantities for all products safely
    const initialQuantities = {};
    data.forEach(prod => {
      if (prod?.id) initialQuantities[prod.id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  // Keep favorites in sync if the logged-in user changes
  useEffect(() => {
    setFavoriteIds(user ? favoriteProductService.getFavoriteIds(user.email) : []);
  }, [user]);

  // Derive unique categories from products state
  const categories = useMemo(() => {
    return [...new Set(products.map(prod => prod.category).filter(Boolean))];
  }, [products]);

  // Derive products to display based on active filter
  const productsToDisplay = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter(prod => prod.category === activeFilter);
  }, [products, activeFilter]);

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const handleToggleFavorite = (productId) => {
    if (!user) {
      alert('Please log in to favorite products.');
      return;
    }
    const updated = favoriteProductService.toggleFavorite(user.email, productId);
    setFavoriteIds(updated);
  };

  function addToShoppingCart(product) {
    const selectedQuantity = quantities[product.id] || 1;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: selectedQuantity
    });

    // Reset picker baseline for this specific product
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  }

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catalog</h1>

      <div className="filter-buttons-row">
        <button
          onClick={() => setActiveFilter("all")}
          className={`custom-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
        >
          All Products
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`custom-filter-btn ${activeFilter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="catalog-grid-container-1">
        {productsToDisplay.map((product) => (
          <div key={product.id} className="custom-product-card">
            <div className="image-wrapper">
              <img
                src={product.imageUrl || 'https://placeholder.com'}
                alt={product.name}
                className="custom-product-img"
              />
              <button
                type="button"
                className={`favorite-toggle-btn ${favoriteIds.includes(product.id) ? 'active' : ''}`}
                onClick={() => handleToggleFavorite(product.id)}
                aria-label={favoriteIds.includes(product.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {favoriteIds.includes(product.id) ? <FaHeart color="red" /> : <FaRegHeart />}
              </button>
            </div>
            <h3 className="custom-product-title">{product.name}</h3>
            <span className="custom-product-tag">{product.category}</span>
            <div className="custom-product-price">
              ${Number(product.price ?? 0).toFixed(2)}
            </div>

            <div className="picker-wrapper">
              <QuantityPicker
                value={quantities[product.id] ?? 1}
                onChange={(qty) => handleQuantityChange(product.id, qty)}
              />
            </div>

            <div className="product-rating">
              <span className="rating-score">★ {product.rating ?? 0}</span>
              <span className="rating-count">({product.reviews ?? 0} reviews)</span>
            </div>

            <button
              onClick={() => addToShoppingCart(product)}
              disabled={!product.inStock}
              className={`custom-add-btn product-button ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
             {/* button to add to favorites */}
            <button
              onClick={() => handleToggleFavorite(product.id)}
              className={`custom-favorite-btn ${favoriteIds.includes(product.id) ? 'active' : ''}`}
            >
              {favoriteIds.includes(product.id) ? (
                <>
                  <FaHeart color="#B4432F" /> Favorited
                </>
              ) : (
                <>
                  <FaRegHeart /> Add to Favorites
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {productsToDisplay.length === 0 && (
        <p className="empty-catalog-message">No items match this category.</p>
      )}
    </div>
  );
}

export default Catalog;
