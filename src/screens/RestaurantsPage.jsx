import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantsPage.css';

// Importing images
import alphaImage from '../assets/alpha.jpg';
import betaImage from '../assets/beta.jpg';
import gammaImage from '../assets/gamma.jpg';
import deltaImage from '../assets/delta.jpg';

// Example restaurant data with images and menu links
const restaurants = [
    { name: 'Alpha', image: alphaImage, menuPath: '/alpha-menu' },
    { name: 'Beta', image: betaImage, menuPath: '/beta-menu' },
    { name: 'Gamma', image: gammaImage, menuPath: '/gamma-menu' },
    { name: 'Delta', image: deltaImage, menuPath: '/delta-menu' },
];

const RestaurantsPage = () => {
    const navigate = useNavigate();

    const handleRestaurantClick = (path) => {
        navigate(path); // Navigate to the menu page based on path
    };
    
    return (
        <div className="restaurants-page">
            <h1 className="title">NEARBY FOODCOURTS</h1>
            <div className="restaurant-container">
                {restaurants.map((restaurant, index) => (
                    <div
                        className="restaurant-block"
                        key={index}
                        onClick={() => handleRestaurantClick(restaurant.menuPath)}
                    >
                        <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                        <div className="restaurant-name-overlay">{restaurant.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantsPage;


