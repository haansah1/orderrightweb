import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AccountDashboardPage from './pages/AccountDashboardPage';
import MyOrdersPage from './pages/MyOrdersPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SashStudioLandingPage from './pages/SashStudioLandingPage';
import SashDesignerPage from './pages/SashDesignerPage';
import SashGalleryPage from './pages/SashGalleryPage';
import SavedSashDesignsPage from './pages/SavedSashDesignsPage';

import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ShippingInfoPage from './pages/ShippingInfoPage';
import GenZPage from './pages/GenZPage';
import FAQsPage from './pages/FAQsPage';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-secondary-fixed selection:text-on-secondary-fixed">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                  <Route path="/order-tracking" element={<MyOrdersPage />} />
                  <Route path="/account" element={<AccountDashboardPage />} />
                  <Route path="/orders" element={<MyOrdersPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                  <Route path="/shipping" element={<ShippingInfoPage />} />
                  <Route path="/gen-z" element={<GenZPage />} />
                  <Route path="/genz" element={<GenZPage />} />
                  <Route path="/faqs" element={<FAQsPage />} />
                  <Route path="/faq" element={<FAQsPage />} />
                  
                  {/* Graduation Sash Studio Routes */}
                  <Route path="/sash-studio" element={<SashStudioLandingPage />} />
                  <Route path="/sash-studio/designer" element={<SashDesignerPage />} />
                  <Route path="/sash-studio/gallery" element={<SashGalleryPage />} />
                  <Route path="/sash-studio/saved" element={<SavedSashDesignsPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
