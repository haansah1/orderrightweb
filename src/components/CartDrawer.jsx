import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SashCartPreview from './SashCartPreview';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-surface-container-highest shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-margin-desktop border-b border-surface-container-highest flex justify-between items-center bg-surface-container-lowest">
            <div className="flex items-center space-x-2">
              <h2 className="font-headline font-bold text-headline-md text-primary">Your Cart</h2>
              <span className="bg-secondary-container text-on-secondary-container text-xs px-2 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="text-on-surface-variant hover:text-primary p-2 transition-colors rounded-full hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-margin-desktop space-y-md">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-on-surface-variant space-y-md py-xl">
                <span className="material-symbols-outlined text-[64px] text-outline-variant">shopping_bag</span>
                <p className="font-body text-body-lg">Your cart is currently empty.</p>
                <button
                  onClick={() => { onClose(); navigate('/shop'); }}
                  className="bg-primary text-on-primary font-label text-label-md py-3 px-6 rounded-lg uppercase tracking-wider hover:bg-surface-tint transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div 
                  key={`${item.id}-${item.size}-${item.color}-${idx}`}
                  className="flex gap-md p-md bg-surface-container-lowest border border-surface-container-highest rounded-2xl relative group shadow-xs"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-24 object-cover rounded-xl bg-surface-container-low flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-headline font-semibold text-body-md text-primary line-clamp-1">{item.name}</h4>
                          {item.itemType === 'graduation_sash' && (
                            <span className="inline-block bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md mt-0.5">
                              Custom Embroidery
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                      <p className="font-body text-label-sm text-on-surface-variant mt-0.5">
                        {item.itemType === 'graduation_sash' ? (
                          <span>{item.customizationData?.name ? `Name: ${item.customizationData.name}` : `Size: ${item.size}`}</span>
                        ) : (
                          <span>Size: {item.size} {item.color !== 'Default' && `| ${item.color}`}</span>
                        )}
                      </p>

                      {item.itemType === 'graduation_sash' && (
                        <div className="mt-2">
                          <SashCartPreview item={item} />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-end mt-sm">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-outline-variant rounded-lg bg-surface">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                          className="px-2 py-0.5 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-l-lg"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="font-label text-label-sm px-3 text-primary">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                          className="px-2 py-0.5 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-r-lg"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>

                      <span className="font-headline font-bold text-body-md text-primary">
                        {item.currency || 'GH₵'} {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-margin-desktop border-t border-surface-container-highest bg-surface-container-lowest space-y-md">
              <div className="flex justify-between items-center text-body-lg font-headline font-semibold">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-primary font-bold text-headline-md">GH₵ {subtotal.toFixed(2)}</span>
              </div>
              <p className="font-body text-label-sm text-on-surface-variant">Shipping and taxes calculated at checkout.</p>
              
              <div className="flex flex-col gap-sm pt-sm">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-4 bg-primary text-on-primary rounded-lg font-label text-label-md uppercase tracking-wider hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Proceed to Checkout
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => { onClose(); navigate('/cart'); }}
                  className="w-full py-3 bg-surface-container border border-outline-variant text-primary rounded-lg font-label text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors"
                >
                  View Full Cart
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
