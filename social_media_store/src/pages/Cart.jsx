import React from 'react';
import './cart.css'
import QuantityPicker from "../QuantityPicker"; 


// initialize cart array
const initialCart = JSON.parse(localStorage.getItem('ShoppingCart')) || [];

function SaveShoppingCart() {
  localStorage.setItem('shoppingcart', JSON.stringify(ShoppingCart));
}

//  f to update or add to the shopping cart
function AddToShoppingCart(id, name, price, quantity = 1){
  const ExistingItems = cart.find(item => item.id === id);

  if (ExistingItems) {
    ExistingItems.quantity += quantity;
  }else {
    cart.push({id, name, price, quantity});
  }

  SaveShoppingCart();
  console.log({name}, 'added to shoping cart')

}

// f to remove items 
function RemoveItem(id) {
  cart = cart.filter(items => item.id !== id);
  SaveShoppingCart();
}

function getShoppingCartTotal(){
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function ShoppingCart() {
  
  const cartItems = [
    { 
      id: 1, 
      name: 'Social Hive Premium Hoodie', 
      price: 49.99, 
      quantity: 1, 
      // image: 'https://placehold.co' 
    },
    { 
      id: 2, 
      name: 'Honeycomb Coffee Mug', 
      price: 15.99, 
      quantity: 2, 
      // image: 'https://placehold.co' 
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

 return (
  <div className="cart-page">
    <h1 className="cart-page__title">Your Cart</h1>
    
    <div className="cart-container">
      {/* Left Column: Items */}
      <div className="cart-items-list">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img 
              className="cart-item__image" 
              src={item.image || null} 
              alt={item.name} 
            />
            
            <div className="cart-item__details">
              <h3 className="cart-item__name">{item.name}</h3>
              <p className="cart-item__price">${item.price.toFixed(2)}</p>
              <span className="cart-item__quantity">Qty: {item.quantity}</span>
            </div>
            
            <button type="button" className="cart-item__remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Right Column: Summary Card */}
      <div className="cart-summary">
        <h2 className="cart-title">Order Summary</h2>
        
        <div className="cart-summary-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="cart-summary">
          <span>Shipping</span>
          <span className="free-shipping">Free Shipping</span>
        </div>
        
        <hr className="cart-summary__divider" />
        
        <div className="cart-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <button type="button" className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
);
}

export default ShoppingCart;