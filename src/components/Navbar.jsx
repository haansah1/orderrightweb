import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Sash Studio', path: '/sash-studio', isFeatured: true },
    { name: 'Wishlist', path: '/wishlist' },
  ];

  return (
    <>
      <header className="bg-surface/80 backdrop-blur-md text-primary fixed top-0 w-full z-40 border-b border-surface-container-highest shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center max-w-container-max mx-auto px-4 md:px-margin-desktop h-20">
          
          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-on-surface-variant hover:text-primary p-2 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center">
            <img src="/media/logo_black.png" alt="OrderRight" className="h-8 md:h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-lg items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path) && (link.path !== '/' || location.pathname === '/');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-body text-body-md uppercase tracking-wider transition-colors hover:text-primary relative flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-primary font-bold border-b-2 border-secondary pb-1' 
                      : 'text-on-surface-variant'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.isFeatured && (
                    <span className="bg-sash-gold-dark text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                      Custom
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Trailing Icons */}
          <div className="flex items-center space-x-sm md:space-x-md">
            {/* Search Icon */}
            <button 
              onClick={() => setShowSearchModal(true)}
              className="text-on-surface-variant hover:text-primary transition-colors p-2 hover:opacity-70"
              title="Search Products"
            >
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>

            {/* Wishlist Icon */}
            <Link 
              to="/wishlist" 
              className="text-on-surface-variant hover:text-primary transition-colors p-2 relative hover:opacity-70 hidden sm:inline-flex"
              title="Wishlist"
            >
              <span className="material-symbols-outlined text-[24px]">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
              )}
            </Link>

            {/* Shopping Bag Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-on-surface-variant hover:text-primary transition-colors p-2 relative hover:opacity-70"
              title="View Cart"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-secondary text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-b border-surface-container-highest px-margin-mobile py-md flex flex-col space-y-md animate-fadeIn">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body text-body-md uppercase tracking-wider py-2 text-on-surface hover:text-primary"
            >
              Home
            </Link>
            <Link 
              to="/sash-studio" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body text-body-md uppercase tracking-wider py-2 text-sash-gold-dark font-bold flex items-center justify-between"
            >
              <span>🎓 Graduation Sash Studio</span>
              <span className="bg-sash-gold-dark text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>
            </Link>
            <Link 
              to="/shop" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body text-body-md uppercase tracking-wider py-2 text-on-surface hover:text-primary"
            >
              Shop Catalogue
            </Link>
            <Link 
              to="/wishlist" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body text-body-md uppercase tracking-wider py-2 text-on-surface hover:text-primary flex justify-between items-center"
            >
              <span>Wishlist</span>
              {wishlist.length > 0 && <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full">{wishlist.length}</span>}
            </Link>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-surface w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-surface-container-highest relative">
            <button 
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline font-bold text-headline-md text-primary mb-4">Search OrderRight</h3>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search streetwear, blazers, tees, vibes..."
                autoFocus
                className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
              <button 
                type="submit"
                className="bg-primary text-on-primary font-label text-label-md px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors uppercase tracking-wider"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
