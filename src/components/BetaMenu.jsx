import React, { useState, useEffect, useContext } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './BetaMenu.css';

const BetaMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/menu/BetaMenu.csv');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text();
        Papa.parse(data, {
          header: true,
          complete: results => {
            const itemsWithNumbers = results.data.map(item => ({
              ...item,
              price: parseFloat(item.price) || 0
            }));
            setMenuItems(itemsWithNumbers);
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: parseInt(value, 10) || 0,
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 0;
    if (quantity > 0) {
      addToCart(item, quantity);
    }
  };

  const handleProceedToCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="menu-container">
      <div className="header">
        <h2>Beta Menu</h2>
        <button className="proceed-button" onClick={handleProceedToCart}>Proceed to Cart</button>
      </div>
      <table className="menu-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(item => (
            <tr key={item.id}>
              <td className="item-name">{item.name}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={quantities[item.id] || 0}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="quantity-input"
                />
              </td>
              <td className="item-price">₹{item.price}</td>
              <td>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BetaMenu;
