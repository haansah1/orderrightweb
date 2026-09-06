import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SashCartPreview from '../components/SashCartPreview';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ORDER10') {
      setDiscount(subtotal * 0.10);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "ORDER10" for 10% off!');
    }
  };

  const grandTotal = Math.max(0, subtotal - discount);

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-2xl min-h-screen">
      <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg mb-xl text-primary">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-2xl text-center bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-xl max-w-xl mx-auto my-xl">
          <span className="material-symbols-outlined text-[72px] text-outline-variant mb-md">shopping_bag</span>
          <h2 className="font-headline font-bold text-headline-md text-primary mb-xs">Your Cart is Empty</h2>
          <p className="font-body text-body-md text-on-surface-variant mb-lg">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/shop"
            className="bg-primary text-on-primary font-label text-label-md py-4 px-8 rounded-lg uppercase tracking-wider hover:bg-surface-tint transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl relative">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-lg">
            {cart.map((item, idx) => (
              <div 
                key={`${item.id}-${item.size}-${item.color}-${idx}`}
                className="flex flex-col gap-4 p-4 sm:p-6 bg-surface-container-lowest border border-surface-container-highest rounded-2xl relative group transition-shadow duration-300 hover:shadow-md w-full overflow-hidden"
              >
                {/* Header Row: Title, Sash Badge, and Remove Button */}
                <div className="flex justify-between items-start gap-2 w-full">
                  <div className="flex-grow min-w-0">
                    {item.itemType === 'graduation_sash' ? (
                      <Link to="/sash-studio/designer" className="font-headline font-bold text-body-lg sm:text-headline-md text-primary hover:text-sash-gold transition-colors break-words block">
                        {item.name}
                      </Link>
                    ) : (
                      <Link to={`/product/${item.id}`} className="font-headline font-bold text-body-lg sm:text-headline-md text-primary hover:text-secondary transition-colors break-words block">
                        {item.name}
                      </Link>
                    )}
                    {item.itemType === 'graduation_sash' && (
                      <span className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full mt-1">
                        🎓 Custom Sash Order
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-on-surface-variant hover:text-error transition-colors p-1 flex-shrink-0"
                    title="Remove Item"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                {/* Sash Item versus Standard Product Body */}
                {item.itemType === 'graduation_sash' ? (
                  <div className="w-full flex flex-col sm:flex-row gap-4 items-stretch">
                    {item.image && (
                      <div className="w-full sm:w-48 h-48 sm:h-52 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 p-1 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="w-full flex-grow flex flex-col justify-center">
                      <SashCartPreview item={item} className="w-full h-full min-h-[140px]" />
                    </div>
                  </div>
                ) : (
                  /* Standard Product Layout */
                  <div className="flex flex-col sm:flex-row gap-md sm:gap-lg w-full">
                    <div className="w-full sm:w-44 h-48 sm:h-auto flex-shrink-0 rounded-xl overflow-hidden bg-surface-container-low">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow justify-between py-xs">
                      <p className="font-body text-body-md text-on-surface-variant mb-md break-words">
                        Size: <span className="font-semibold text-primary">{item.size}</span>
                        {item.weight && <> | Weight: <span className="font-semibold text-primary">{item.weight}</span></>}
                        {item.color !== 'Default' && ` | Color: ${item.color}`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Footer: Quantity Selector & Price */}
                <div className="flex flex-row justify-between items-center pt-3 border-t border-surface-container-highest w-full mt-1">
                  <div className="flex items-center border border-outline-variant rounded-lg bg-surface">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                      className="px-3 py-1 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-l-lg"
                    >
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <span className="font-label text-label-md px-3 font-bold text-primary">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                      className="px-3 py-1 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-r-lg"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>

                  <span className="font-headline font-bold text-headline-md text-primary">
                    {item.currency || 'GH₵'} {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 mt-lg lg:mt-0">
            <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-5 sm:p-xl lg:sticky top-28 space-y-lg shadow-sm">
              <h2 className="font-headline font-bold text-headline-md text-primary pb-sm border-b border-surface-container-highest">
                Order Summary
              </h2>

              <div className="space-y-sm font-body text-body-md text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-primary font-semibold">GH₵ {subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Discount (ORDER10)</span>
                    <span className="font-semibold">- GH₵ {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-emerald-700 font-bold text-right text-xs sm:text-sm">
                    Free Uni Delivery / Pay on Pickup
                  </span>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-xs pt-sm border-t border-surface-container-highest">
                <label className="font-label text-label-sm uppercase tracking-wider text-on-surface-variant">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (ORDER10)"
                    className="flex-grow min-w-0 bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary uppercase"
                  />
                  <button 
                    type="submit"
                    className="bg-surface-container border border-outline-variant font-label text-label-sm uppercase px-4 py-2 rounded-lg hover:bg-surface-container-high transition-colors flex-shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-error text-label-sm mt-1">{promoError}</p>}
                {discount > 0 && <p className="text-secondary text-label-sm mt-1 font-semibold">10% Discount applied!</p>}
              </form>

              <div className="pt-md border-t border-surface-container-highest flex justify-between items-center">
                <span className="font-headline font-bold text-headline-md text-primary">Total</span>
                <span className="font-headline font-bold text-headline-md text-primary">
                  GH₵ {grandTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-primary text-on-primary rounded-lg font-label text-label-md uppercase tracking-wider hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Proceed to Checkout
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>

              <div className="text-center pt-xs">
                <Link to="/shop" className="font-label text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-primary underline">
                  Continue Shopping
                </Link>
              </div>

            </div>
          </div>

        </div>
      )}
    </main>
  );
}
