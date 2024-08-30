import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the cart
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((i) => i.id === item.id);
      const newCart = [...prevCart];
      if (existingItemIndex >= 0) {
        newCart[existingItemIndex].quantity += quantity;
      } else {
        newCart.push({ ...item, quantity, price: parseFloat(item.price) }); // Ensure price is a number
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };
  

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the CartContext
export const useCart = () => useContext(CartContext);
