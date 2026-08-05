import './favorites.css'
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '../Features/AuthForm';
import favoriteProductService from '../Services/favoriteProductService';
import { getProducts } from '../Services/productService';

export default function Favorites() {
  const { user: authUser } = useAuth();

  const [allProducts] = useState(() => {
    try {
      return getProducts() || [];
    } catch (err) {
      console.error('Failed to load products:', err);
      return [];
    }
  });

  const [favoriteProductIds, setFavoriteProductIds] = useState(() =>
    authUser ? favoriteProductService.getFavoriteIds(authUser.email) : []
  );

  const favoriteProducts = allProducts.filter((product) =>
    favoriteProductIds.includes(product.id)
  );

  const handleUnfavoriteProduct = (productId) => {
    if (!authUser) return;
    const updated = favoriteProductService.toggleFavorite(authUser.email, productId);
    setFavoriteProductIds(updated);
  };

  return (
    <div className="profile-container">
      <h1 className='title'>Favorites</h1>

      {!authUser ? (
        <p className="no-posts">Log in to see your favorite products.</p>
      ) : favoriteProducts.length === 0 ? (
        <p className="no-posts">You haven't favorited any products yet.</p>
      ) : (
        <div className="products-grid-container">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="custom-product-card">
              <div className="image-wrapper">
                <img
                  src={product.imageUrl || 'https://placeholder.com'}
                  alt={product.name}
                  className="custom-product-img"
                />
              </div>
              <h3 className="custom-product-title">{product.name}</h3>
              <span className="custom-product-tag">{product.category}</span>
              <div className="custom-product-price">
                ${Number(product.price ?? 0).toFixed(2)}
              </div>
              <button
                type="button"
                className="favorite-toggle-btn active"
                onClick={() => handleUnfavoriteProduct(product.id)}
                aria-label="Remove from favorites"
              >
                <FaHeart color="red" /> Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
