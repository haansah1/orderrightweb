import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function TestPage() {
  const { setTestCartItem, cart, subtotal } = useCart();
  const navigate = useNavigate();
  const [redirectCountdown, setRedirectCountdown] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.title = 'Test Page | OrderRight';

    // 1. Set cart to exactly one dummy product costing GHS 1
    const dummyProduct = {
      id: 'dummy-test-item-ghs1',
      name: 'Dummy Test Product',
      price: 1.00,
      currency: 'GH₵',
      size: 'Standard',
      color: 'Default',
      weight: 'Standard',
      category: 'Test Products',
      itemType: 'dummy',
      isTest: true,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60'
    };

    setTestCartItem(dummyProduct);
    setIsReady(true);

    // 2. Automatically and directly navigate to the checkout page
    const timer = setTimeout(() => {
      navigate('/checkout', { replace: true });
    }, 600);

    return () => clearTimeout(timer);
  }, [navigate, setTestCartItem]);

  return (
    <main className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-lg bg-surface-container-lowest border border-surface-container-highest rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Test Page Active</span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary">
            Taking You to Checkout
          </h1>
          <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-sm mx-auto">
            Configured 1 dummy product at <strong className="text-primary font-bold">GH₵ 1.00</strong>. Redirecting you directly to the checkout page...
          </p>
        </div>

        {/* Dummy Product Preview Card */}
        <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-container-highest flex items-center gap-4 text-left">
          <img 
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60" 
            alt="Dummy Test Product" 
            className="w-16 h-16 rounded-xl object-cover border border-surface-container-highest bg-white flex-shrink-0"
          />
          <div className="flex-grow min-w-0">
            <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-900 border border-amber-500/20 mb-1">
              Test Product
            </div>
            <h3 className="font-headline font-bold text-sm sm:text-base text-primary truncate">
              Dummy Test Product
            </h3>
            <p className="font-body text-xs text-on-surface-variant">
              Qty: 1 | Standard
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="font-headline font-black text-lg sm:text-xl text-emerald-700">
              GH₵ 1.00
            </span>
          </div>
        </div>

        {/* Loading Spinner & Progress */}
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-on-surface-variant pt-2">
          <span className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-600 border-t-transparent"></span>
          <span>Redirecting to checkout in a moment...</span>
        </div>

        {/* Manual Direct Button */}
        <div className="pt-2">
          <button
            onClick={() => navigate('/checkout', { replace: true })}
            className="w-full py-3.5 px-6 bg-primary hover:bg-surface-tint text-on-primary font-label text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout Now</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  );
}
