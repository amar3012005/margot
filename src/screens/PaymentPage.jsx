import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const totalAmount = location.state?.total || 0;
  console.log('Total Amount:', totalAmount);

  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
  });
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [smsStatus, setSmsStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isValidIndianPhoneNumber = (number) => {
    const regex = /^(\+91|91)?[6789]\d{9}$/;
    return regex.test(number);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!isValidIndianPhoneNumber(formData.phoneNumber)) {
      setIsValidPhone(false);
      return;
    }
    setIsValidPhone(true);

    // Construct the payment link
    const paymentLink = `https://rzp.io/l/mqDAE4r8RD?amount=${totalAmount * 100}`;
    console.log('Opening Razorpay link:', paymentLink);
    window.open(paymentLink, '_blank');

    // Send SMS via your backend
    try {
      const response = await fetch('http://localhost:3001/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          message: `Your payment of ₹${totalAmount} is being processed. Your order will be delivered to ${formData.address}.`,
        }),
      });

      if (response.ok) {
        setSmsStatus('SMS sent successfully!');
      } else {
        setSmsStatus('Failed to send SMS.');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      setSmsStatus('Error sending SMS.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <form onSubmit={handlePayment}>
        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {!isValidPhone && <p className="error">Please enter a valid Indian phone number.</p>}
        </div>
        <div className="input-group">
          <label htmlFor="address">Address To Deliver</label>
          <textarea
            id="address"
            name="address"
            rows="4"
            placeholder="Enter Your Address Here"
            required
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Proceed to Payment</button>
      </form>
      {smsStatus && <p className="sms-status">{smsStatus}</p>}
      
      {/* Razorpay Button */}
      <div 
        className="razorpay-embed-btn" 
        data-url="https://pages.razorpay.com/pl_OpbHKSq2u9jEQy/view" 
        data-text="Pay Now" 
        data-color="#528FF0" 
        data-size="large" 
        dangerouslySetInnerHTML={{
          __html: `
            <script>
              (function(){
                var d=document; var x=!d.getElementById('razorpay-embed-btn-js');
                if(x){ 
                  var s=d.createElement('script'); 
                  s.defer=!0; 
                  s.id='razorpay-embed-btn-js';
                  s.src='https://cdn.razorpay.com/static/embed_btn/bundle.js'; 
                  d.body.appendChild(s);
                } else{
                  var rzp=window['__rzp__'];
                  rzp && rzp.init && rzp.init();
                }
              })();
            </script>
          `,
        }}
      ></div>
    </div>
  );
};

export default PaymentPage;
