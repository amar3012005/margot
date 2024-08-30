// src/screens/OrderSummaryScreen.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import QRCode from 'qrcode';

const OrderSummaryScreen = () => {
    const location = useLocation();
    const { cartItems, totalPrice, phoneNumber, address } = location.state || {};

    const generateQRCode = async (paymentUrl) => {
        try {
            const qrCodeDataUrl = await QRCode.toDataURL(paymentUrl);
            return qrCodeDataUrl;
        } catch (error) {
            console.error('Error generating QR code:', error);
            return null;
        }
    };

    const paymentUrl = `https://paymentgateway.example.com?amount=${totalPrice}`; // Replace with your payment URL

    const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState(null);

    React.useEffect(() => {
        const fetchQRCode = async () => {
            const qrCode = await generateQRCode(paymentUrl);
            setQrCodeDataUrl(qrCode);
        };
        fetchQRCode();
    }, [paymentUrl]);

    if (!cartItems) {
        return <p>No order details found.</p>;
    }

    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Order Details</h2>
            {cartItems.map(item => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                </div>
            ))}
            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
            <h3>Delivery Address</h3>
            <p>{address}</p>
            <h3>Phone Number</h3>
            <p>{phoneNumber}</p>
            {qrCodeDataUrl && (
                <div>
                    <h3>Payment QR Code</h3>
                    <img src={qrCodeDataUrl} alt="Payment QR Code" />
                </div>
            )}
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default OrderSummaryScreen;
