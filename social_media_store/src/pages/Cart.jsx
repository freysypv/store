import React from 'react';
import './cart.css';
import QuantityPicker from "../QuantityPicker";
import { useCart } from "../pages/CartContext";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const { cart: cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Your Cart</h1>
      <div className="cart-container">
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is ßempty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img className="cart-item__image" src={item.image || 'https://placehold.co'} alt={item.name} />
                <div className="cart-item__details">
                  <h3 className="cart-item__name">{item.name}</h3>
                  <p className="cart-item__price">${item.price.toFixed(2)}</p>
                  <span className="cart-item__quantity">Qty: {item.quantity}</span>
                </div>
                <button type="button" className="cart-item__remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h2 className="cart-title">Order Summary</h2>
          <div className="cart-summary-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-2">
            <span>Shipping</span>
            <span className="free-shipping">Free Shipping</span>
          </div>
          <hr className="cart-summary__divider" />
          <div className="cart-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button onClick={() => navigate("/checkout")} type="button" className="checkout-btn" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;