import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getCloudinaryUrl, handleImageError } from '../utils/cloudinary';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product.id);
  const rawImage = product.cloudinaryPublicId || (product.images && product.images.length > 0 ? product.images[0] : (product.image || ''));
  const mainImage = getCloudinaryUrl(rawImage, { width: 500, height: 667, crop: 'fill' });

  return (
    <div className="group flex flex-col transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-surface-container-low mb-md border border-surface-container-highest">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => handleImageError(e, product.images?.[0])}
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
            wishlisted 
              ? 'bg-secondary text-white shadow-md' 
              : 'bg-surface/80 text-on-surface-variant hover:text-primary hover:bg-surface'
          }`}
          title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <span 
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Vibe / Status Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-primary text-on-primary font-label text-label-sm uppercase rounded-full tracking-wider shadow-sm">
              New Arrival
            </span>
          )}
          {product.vibe && (
            <span className="px-2.5 py-1 bg-surface/90 text-primary font-label text-label-sm uppercase rounded-full backdrop-blur-md tracking-wider">
              {product.vibe}
            </span>
          )}
        </div>

        {/* Quick Add Pill Button (Appears on Hover) */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-3 bg-primary text-on-primary rounded-full font-label text-label-md uppercase tracking-wider hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col gap-xs px-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="font-headline font-semibold text-headline-md md:text-body-lg text-primary hover:text-secondary transition-colors line-clamp-1">
            {product.name}
          </Link>
        </div>
        <p className="font-body text-body-md text-on-surface-variant font-medium">
          {product.currency || 'GH₵'} {product.price ? product.price.toFixed(2) : '0.00'}
        </p>
      </div>
    </div>
  );
}
