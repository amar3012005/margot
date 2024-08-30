import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const MenuPage = ({ restaurantName, csvFile }) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        Papa.parse(csvFile, {
            download: true,
            header: true,
            complete: (result) => {
                setMenuItems(result.data);
            }
        });
    }, [csvFile]);

    return (
        <div>
            <h1>{restaurantName} Menu</h1>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        {item.Item} - ${item.Price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuPage;
