// pages/Cart.jsx
import React from 'react';

function Cart() {
  // Mock data - replace with your global state or context later
  const cartItems = [
    { id: 1, name: 'Social Hive Premium Hoodie', price: 49.99, quantity: 1, image: 'https://placeholder.com' },
    { id: 2, name: 'Honeycomb Coffee Mug', price: 15.99, quantity: 2, image: 'https://placeholder.com' }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Cart</h1>
      
      <div style={styles.cartLayout}>
        <div style={styles.itemsList}>
          {cartItems.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
                <span style={styles.itemQty}>Qty: {item.quantity}</span>
              </div>
              <button style={styles.removeBtn}>Remove</button>
            </div>
          ))}
        </div>

        <div style={styles.summaryCard}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>FREE</span>
          </div>
          <hr style={styles.divider} />
          <div style={{ ...styles.summaryRow, fontWeight: '700', fontSize: '1.2rem' }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button style={styles.checkoutBtn}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
