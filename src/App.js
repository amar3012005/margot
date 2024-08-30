import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import { CartProvider } from './context/CartContext'; // Ensure this path is correct
import RestaurantsPage from './screens/RestaurantsPage';
import AlphaMenu from './components/AlphaMenu'; // Import AlphaMenu
import BetaMenu from './components/BetaMenu'; // Create this component
import GammaMenu from './components/GammaMenu'; // Create this component
import DeltaMenu from './components/DeltaMenu'; // Create this component
import CartScreen from './screens/CartScreen';
import PaymentPage from './screens/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import ConfirmationPage from './components/ConfirmationPage';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/alpha-menu" element={<AlphaMenu />} />
          <Route path="/beta-menu" element={<BetaMenu />} />
          <Route path="/gamma-menu" element={<GammaMenu />} />
          <Route path="/delta-menu" element={<DeltaMenu />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
