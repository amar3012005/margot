import React from 'react';

const Menu = ({ menuItems }) => {
  return (
    <ul>
      {menuItems.map(item => (
        <li key={item.id}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  );
};

export default Menu;

