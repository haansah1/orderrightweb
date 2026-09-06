import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <main className="pt-28 pb-2xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full min-h-screen">
      <div className="flex justify-between items-end mb-xl border-b border-surface-container-highest pb-lg">
        <div>
          <h1 className="font-display font-bold text-display-lg-mobile md:text-display-lg text-primary mb-xs">
            My Wishlist
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Saved favorites ready for your closet.
          </p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-2xl text-center bg-surface-container-low rounded-2xl border border-surface-container-highest p-xl max-w-xl mx-auto my-xl">
          <span className="material-symbols-outlined text-[64px] text-outline-variant mb-md">favorite_border</span>
          <h3 className="font-headline font-bold text-headline-md text-primary mb-xs">Your Wishlist is Empty</h3>
          <p className="font-body text-body-md text-on-surface-variant mb-lg">
            Tap the heart icon on any product to save your favorite garments here.
          </p>
          <Link
            to="/shop"
            className="bg-primary text-on-primary font-label text-label-md px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-surface-tint"
          >
            Explore Catalogue
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {wishlist.map((item) => (
            <div key={item.id} className="group flex flex-col bg-surface-container-lowest border border-surface-container-highest rounded-2xl overflow-hidden p-md relative shadow-xs">
              
              {/* Product Image */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-surface-container-low mb-md">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-2 right-2 w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center shadow-md"
                  title="Remove from Wishlist"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <span className="px-2 py-0.5 bg-surface-container rounded-full font-label text-label-sm uppercase text-on-surface-variant">
                    {item.vibe || 'Fashion'}
                  </span>
                  <Link to={`/product/${item.id}`} className="font-headline font-semibold text-body-lg text-primary hover:text-secondary transition-colors block mt-xs line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="font-headline font-bold text-body-md text-primary mt-xs">
                    {item.currency || 'GH₵'} {item.price ? item.price.toFixed(2) : '0.00'}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full mt-md py-3 bg-primary text-on-primary rounded-lg font-label text-label-sm uppercase tracking-wider hover:bg-surface-tint transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  Move to Cart
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}
