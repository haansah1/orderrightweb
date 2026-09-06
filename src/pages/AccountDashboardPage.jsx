import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function AccountDashboardPage() {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayUser = user || {
    name: 'Kofi Mensah',
    email: 'kofi.mensah@example.com',
    phone: '+233 24 123 4567',
    address: '14 Independence Avenue, Ridge, Accra',
    ordersCount: 3
  };

  return (
    <main className="pt-28 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
        <div>
          <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-primary">Account Dashboard</h1>
          <p className="font-body text-body-md text-on-surface-variant">Welcome back, {displayUser.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2.5 bg-surface-container border border-outline-variant text-primary font-label text-label-md uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Sign Out
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl">
        <div className="bg-surface-container-lowest border border-surface-container-highest p-xl rounded-2xl flex items-center gap-lg shadow-xs">
          <div className="w-14 h-14 bg-primary text-on-primary rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">shopping_bag</span>
          </div>
          <div>
            <span className="font-headline font-bold text-headline-lg text-primary">{displayUser.ordersCount || 3}</span>
            <p className="font-body text-body-md text-on-surface-variant">Total Orders Placed</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-highest p-xl rounded-2xl flex items-center gap-lg shadow-xs">
          <div className="w-14 h-14 bg-secondary text-white rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">favorite</span>
          </div>
          <div>
            <span className="font-headline font-bold text-headline-lg text-primary">{wishlist.length}</span>
            <p className="font-body text-body-md text-on-surface-variant">Wishlist Saved Items</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-highest p-xl rounded-2xl flex items-center gap-lg shadow-xs">
          <div className="w-14 h-14 bg-surface-container-high text-primary rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">local_shipping</span>
          </div>
          <div>
            <span className="font-headline font-bold text-headline-lg text-primary">1 Active</span>
            <p className="font-body text-body-md text-on-surface-variant">Package in Transit</p>
          </div>
        </div>
      </div>

      {/* Profile Details & Account Actions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Personal Details */}
        <div className="md:col-span-6 bg-surface-container-lowest border border-surface-container-highest p-xl rounded-2xl space-y-md shadow-xs">
          <h3 className="font-headline font-bold text-headline-md text-primary pb-sm border-b border-surface-container-highest flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">person</span>
            Profile Information
          </h3>
          
          <div className="space-y-sm font-body text-body-md">
            <div>
              <span className="text-on-surface-variant block text-label-sm uppercase font-label">Full Name</span>
              <span className="text-primary font-semibold text-body-lg">{displayUser.name}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block text-label-sm uppercase font-label">Email Address</span>
              <span className="text-primary font-semibold text-body-lg">{displayUser.email}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block text-label-sm uppercase font-label">Phone Number</span>
              <span className="text-primary font-semibold text-body-lg">{displayUser.phone}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block text-label-sm uppercase font-label">Default Shipping Address</span>
              <span className="text-primary font-semibold text-body-lg">{displayUser.address}</span>
            </div>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="md:col-span-6 bg-surface-container-lowest border border-surface-container-highest p-xl rounded-2xl space-y-md shadow-xs">
          <h3 className="font-headline font-bold text-headline-md text-primary pb-sm border-b border-surface-container-highest flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">grid_view</span>
            Quick Management
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <Link
              to="/orders"
              className="p-md bg-surface-container-low hover:bg-surface-container-high rounded-xl border border-surface-container transition-colors flex items-center gap-md"
            >
              <span className="material-symbols-outlined text-[24px] text-primary">inventory_2</span>
              <div>
                <span className="font-headline font-semibold text-body-md text-primary block">My Orders</span>
                <span className="font-body text-label-sm text-on-surface-variant">View order history</span>
              </div>
            </Link>

            <Link
              to="/order-tracking"
              className="p-md bg-surface-container-low hover:bg-surface-container-high rounded-xl border border-surface-container transition-colors flex items-center gap-md"
            >
              <span className="material-symbols-outlined text-[24px] text-primary">local_shipping</span>
              <div>
                <span className="font-headline font-semibold text-body-md text-primary block">Track Delivery</span>
                <span className="font-body text-label-sm text-on-surface-variant">Live package tracker</span>
              </div>
            </Link>

            <Link
              to="/wishlist"
              className="p-md bg-surface-container-low hover:bg-surface-container-high rounded-xl border border-surface-container transition-colors flex items-center gap-md"
            >
              <span className="material-symbols-outlined text-[24px] text-secondary">favorite</span>
              <div>
                <span className="font-headline font-semibold text-body-md text-primary block">My Wishlist</span>
                <span className="font-body text-label-sm text-on-surface-variant">Saved items</span>
              </div>
            </Link>

            <Link
              to="/shop"
              className="p-md bg-surface-container-low hover:bg-surface-container-high rounded-xl border border-surface-container transition-colors flex items-center gap-md"
            >
              <span className="material-symbols-outlined text-[24px] text-primary">storefront</span>
              <div>
                <span className="font-headline font-semibold text-body-md text-primary block">Browse Shop</span>
                <span className="font-body text-label-sm text-on-surface-variant">Explore collections</span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
