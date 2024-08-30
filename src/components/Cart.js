// src/components/Cart.js
import React from 'react';

const Cart = ({ cartItems }) => {
    console.log('Cart items:', cartItems); // Check if cartItems is undefined

    if (!cartItems) return <p>Loading...</p>;

    const items = cartItems || [];

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Cart</h2>
            {items.length > 0 ? (
                <div>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>{item.name} - {item.price} x {item.quantity}</li>
                        ))}
                    </ul>
                    <h3>Total: ${totalAmount.toFixed(2)}</h3>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;



