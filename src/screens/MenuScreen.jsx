import React from 'react';
import './MenuScreen.css';

const MenuScreen = ({ restaurant, onBack }) => {
    return (
        <div className="menu-container">
            <header className="menu-header">
                <button onClick={onBack} className="back-button">Back</button>
                <h2>{restaurant.name}</h2>
            </header>
            <div className="menu-items">
                {restaurant.menu.map((item) => (
                    <div key={item.id} className="menu-item">
                        <h3>{item.name}</h3>
                        <p>${item.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuScreen;


