import React from 'react';
import './RestaurantBlock.css'; // Import CSS for individual restaurant block

const RestaurantBlock = ({ name }) => {
    return (
        <div className="restaurant-block">
            {name}
        </div>
    );
};

export default RestaurantBlock;
