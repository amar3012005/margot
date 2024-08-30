// frontend/src/components/Payment.jsx

import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const Payment = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [billAmount, setBillAmount] = useState(0);
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    const handlePayment = async () => {
        // Set your QR code URL
        const qrCodeDataUrl = 'http://example.com/qrcode'; // Replace with actual QR code generation logic
        setQrCodeUrl(qrCodeDataUrl);

        // Send payment info to backend
        try {
            const response = await axios.post('/api/payment', {
                phoneNumber: phoneNumber,
                billAmount: billAmount,
                qrCodeUrl: qrCodeDataUrl,
            });
            console.log('Message sent:', response.data);
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="6301805656"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
                type="number"
                placeholder="100"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
            />
            <QRCode value={qrCodeUrl} />
            <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
    );
};

export default Payment;
