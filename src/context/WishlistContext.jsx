import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('orderright_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('orderright_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.warn('Could not save wishlist to localStorage:', err.message);
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency || 'GH₵',
          vibe: product.vibe,
          category: product.category,
          image: product.images ? product.images[0] : (product.image || '')
        }
      ];
    });
  };

  const isWishlisted = (id) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
