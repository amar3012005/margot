import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartScreen.css';

const CartScreen = () => {
  const { cart, updateCartItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharges = 25;
  const convenienceCharges = 5;
  const total = subtotal + deliveryCharges + convenienceCharges;

  const handleQuantityChange = (id, value) => {
    const newQuantity = parseInt(value, 10) || 0;
    if (newQuantity >= 0) {
      updateCartItem(id, newQuantity);
    }
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      setError('Your cart is empty. Please add items before proceeding to payment.');
      return;
    }
    setError('');
    navigate('/payment', { state: { total } });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="cart-items">
        {cart.length > 0 ? (
          <>
            <div className="cart-header">
              <div className="header-item">Item</div>
              <div className="header-price">Price</div>
              <div className="header-quantity">Quantity</div>
              <div className="header-total">Total</div>
            </div>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-name">{item.name}</div>
                <div className="item-price">₹{item.price}</div>
                <div className="item-quantity">
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="quantity-input"
                  />
                </div>
                <div className="item-total">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </>
        ) : (
          <div className="empty-cart">Your cart is empty.</div>
        )}
      </div>
      <div className="cart-summary">
        <div className="cart-summary-item">Subtotal: ₹{subtotal}</div>
        <div className="cart-summary-item">Delivery Charges: ₹{deliveryCharges}</div>
        <div className="cart-summary-item">Convenience Charges: ₹{convenienceCharges}</div>
        <div className="cart-summary-item"><strong>Total: ₹{total}</strong></div>
      </div>
      <button className="proceed-button" onClick={handleProceedToPayment}>Continue</button>
      <button className="clear-button" onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default CartScreen;


