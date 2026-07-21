// src/pages/Checkout.jsx
import { useState, useMemo } from "react";
import { useCart } from "./CartContext";
import "./checkout.css"; 

export function Checkout() {
  const { cart, clearCart } = useCart(); 
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Deriving transactional calculation totals dynamically
  const cartTotals = useMemo(() => {
    let subtotal = 0;
    cart.forEach(item => {
      subtotal += (item.price ?? 0) * (item.quantity ?? 1);
    });
    const tax = subtotal * 0.0825; // Example 8.25% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Compile order payload summary 
    const orderSummary = {
      customer: formData,
      items: cart,
      grandTotal: cartTotals.total
    };
    
    console.log("Processing Order Summary API payload:", orderSummary);
    
    setOrderPlaced(true);
    clearCart(); // Wipes local context cart state clean
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h2>🎉 Thank You for your Order!</h2>
        <p>A confirmation email has been dispatched to <strong>{formData.email}</strong>.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <h2>Checkout Workspace</h2>
      
      <div className="checkout-split-layout">
        {/* Left Side: Shipping / Payment Form */}
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <h3>Shipping Particulars</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Delivery Address</label>
            <textarea name="address" value={formData.address} onChange={handleInputChange} required />
          </div>
          
          <button type="submit" className="place-order-btn" disabled={cart.length === 0}>
            Place My Order
          </button>
        </form>

        {/* Right Side: Shared Context Summary Matrix */}
        <div className="checkout-summary-panel">
          <h3>Your Items ({cart.length})</h3>
          <div className="summary-items-list">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="summary-item-row">
                <span>{item.name} (x{item.quantity})</span>
                <span>${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-financial-matrix">
            <div className="matrix-row"><span>Subtotal:</span><span>${cartTotals.subtotal.toFixed(2)}</span></div>
            <div className="matrix-row"><span>Tax (8.25%):</span><span>${cartTotals.tax.toFixed(2)}</span></div>
            <div className="matrix-row total-row"><strong>Total:</strong><strong>${cartTotals.total.toFixed(2)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}


