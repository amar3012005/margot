import React, { useState } from 'react';
import RestaurantBlock from '../screens/RestaurantBlock';
import MenuScreen from './MenuScreen';
import './HomeScreen.css';

const HomeScreen = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const restaurants = [
        { id: 1, name: 'Pizza Palace', image: '/images/pizza-palace.jpg', menu: [{ id: 1, name: 'Pizza', price: 9.99 }, { id: 2, name: 'Garlic Bread', price: 4.99 }] },
        { id: 2, name: 'Burger Haven', image: '/images/burger-haven.jpg', menu: [{ id: 1, name: 'Burger', price: 5.99 }, { id: 2, name: 'Fries', price: 2.99 }] },
        // Add more restaurants here
    ];

    const handleSelectRestaurant = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    if (selectedRestaurant) {
        return <MenuScreen restaurant={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />;
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Food Ordering App</h1>
            </header>
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <RestaurantBlock 
                        key={restaurant.id} 
                        restaurant={restaurant} 
                        onSelect={handleSelectRestaurant} 
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;
