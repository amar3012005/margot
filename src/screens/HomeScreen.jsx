import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import backgroundImage from '../assets/FOODLES.gif'; // Correct path for JSX import
import cartIcon from '../assets/cart-Icon.png'; // Ensure this path is correct
import orderNowGif from '../assets/ORDER.gif'; // Import the GIF

const HomeScreen = () => {
    const navigate = useNavigate();

    const handleOrderNowClick = () => {
        navigate('/restaurants'); // Ensure you have this route defined
    };

    const handleCartClick = () => {
        navigate('/cart'); // Redirect to Cart page
    };

    return (
        <div className="home-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <img src={cartIcon} alt="Cart" className="cart-icon" onClick={handleCartClick} />
            <div className="nav-bar">
                <a href="#home">HOME</a>
                <a href="#info">INFO</a>
                <a href="#about">ABOUT</a>
            </div>
            <h1 className="title"></h1> {/* Add content for accessibility */}
            <div className="order-now-box">
                <img src={orderNowGif} alt="Order Now" className="order-now-gif" onClick={handleOrderNowClick} />
            </div>
        </div>
    );
};

export default HomeScreen;
