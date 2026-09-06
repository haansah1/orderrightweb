import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('orderright_wishlist');
      return saved ? JSON.parse(saved) : [
        {
          id: "prod-3",
          name: "Oversized Wool Blazer",
          price: 1200.00,
          currency: "GH₵",
          vibe: "Classy",
          category: "Outerwear",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGeefZl4OrYO4LSo_fZwWVsIdOt-zowBkseAfZF1gCJxUlXTBxipAbhEyA5fPuj_QizxIc7LOyGdHca5LstA3Dn0Pr599LPtBaN9olgTK83xJ2jZIMoKu_5fo0eoe5pkq9FwM91PJnIHEK7fbdg_XRYhBPC2iUXUXrJasIvu-xlRUEsn5eXv1aJomfpfISOCiZcvVpwcme5-sYsOdpL8rgotznMHoFof1tyHLmP-Z-hbrXxqp8KVAP"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('orderright_wishlist', JSON.stringify(wishlist));
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
