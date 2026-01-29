import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import VendorProfile from './pages/VendorProfile';
import ClientProfile from './pages/ClientProfile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

import Support from './pages/Support';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import VendorDashboard from './pages/VendorDashboard';
import PaymentCallback from './pages/PaymentCallback';
import ProductDetails from './pages/ProductDetails';

import VendorLanding from './pages/VendorLanding';

import Navbar from './components/common/Navbar';
import VendorNavbar from './components/common/VendorNavbar';
import Footer from './components/common/Footer';
import RequirementsToSell from './components/vendor/requirements/RequirementsToSell';
import WhySellOnVendor from './components/vendor/why-sell/WhySellOnVendor';
import ListProductsInfo from './components/vendor/list-products/ListProductsInfo';
import StorageAndDelivery from './components/vendor/storage-delivery/StorageAndDelivery';
import VendorHelp from './components/vendor/help/VendorHelp';
import SellerSuccessStories from './components/vendor/stories/SellerSuccessStories';
import BecomePrimeSeller from './components/vendor/grow/BecomePrimeSeller';
import GrowthTools from './components/vendor/grow/GrowthTools';
import SellingPrograms from './components/vendor/grow/SellingPrograms';
import ServiceProviders from './components/vendor/service-providers/ServiceProviders';
import ShoppingFestivals from './components/vendor/festivals/ShoppingFestivals';
import VendorFees from './components/vendor/fees/VendorFees';
import ProfitabilityCalculator from './components/vendor/fees/ProfitabilityCalculator';
import FulfillmentComparison from './components/vendor/fulfillment/FulfillmentComparison';
import PaymentCycles from './components/vendor/payouts/PaymentCycles';

import { CartProvider } from './context/CartContext';

const Navigation = () => {
  // We use useLocation to trigger a re-render when the route changes
  // ensuring we check the latest auth state.
  const location = useLocation();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isVendor = user?.role === 'vendor';

  return isVendor ? <VendorNavbar /> : <Navbar />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Navigation />
        <div style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/become-a-vendor" element={<VendorLanding />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/vendor/:id" element={<VendorProfile />} />
            <Route path="/client/:id" element={<ClientProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/requirements" element={<RequirementsToSell />} />
            <Route path="/vendor/why-sell" element={<WhySellOnVendor />} />
            <Route path="/vendor/listing-guide" element={<ListProductsInfo />} />
            <Route path="/vendor/shipping" element={<StorageAndDelivery />} />
            <Route path="/vendor/help" element={<VendorHelp />} />
            <Route path="/vendor/stories" element={<SellerSuccessStories />} />
            <Route path="/vendor/prime" element={<BecomePrimeSeller />} />
            <Route path="/vendor/growth-tools" element={<GrowthTools />} />
            <Route path="/vendor/programs" element={<SellingPrograms />} />
            <Route path="/vendor/service-providers" element={<ServiceProviders />} />
            <Route path="/vendor/festivals" element={<ShoppingFestivals />} />
            <Route path="/vendor/fees" element={<VendorFees />} />
            <Route path="/vendor/profitability-calculator" element={<ProfitabilityCalculator />} />
            <Route path="/vendor/fulfillment-comparison" element={<FulfillmentComparison />} />
            <Route path="/vendor/payouts" element={<PaymentCycles />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
