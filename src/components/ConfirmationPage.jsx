import React from 'react';
import './ConfirmationPage.css'; // Import CSS for styling

const ConfirmationPage = () => {
  return (
    <div className="confirmation-container">
      <h2>Payment Successful!</h2>
      <div className="animation-container">
        <div className="checkmark">&#10003;</div> {/* Green checkmark */}
      </div>
      <p>Thank you for your payment. Your order has been confirmed!</p>
    </div>
  );
};

export default ConfirmationPage;
