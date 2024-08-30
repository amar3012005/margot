import React from 'react';
import PaymentSuccess from './screens/PaymentSuccess'; // Adjust this path as necessary

import './PaymentSuccess.css'; // Importing the CSS file for styles

const PaymentSuccess = () => {
  return (
    <div className="success-container">
      <h2>Payment Successful!</h2>
      <p>Thank you for your payment. Your transaction was successful.</p>
      <p>We will process your order shortly.</p>
    </div>
  );
};

export default PaymentSuccess;
