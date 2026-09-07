import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('orderright_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('orderright_cart', JSON.stringify(cart));
    } catch (err) {
      console.warn('Could not save cart to localStorage:', err.message);
    }
  }, [cart]);

  const addToCart = (product, selectedSize = 'M', selectedColor = 'Default', quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingIndex > -1) {
        // For custom sash items with a unique id (timestamp), always add a new entry
        if (product.itemType === 'graduation_sash') {
          // Fall through to add new entry
        } else {
          const updated = [...prev];
          updated[existingIndex].quantity += quantity;
          return updated;
        }
      }

      // For custom sash items, preserve all fields (image snapshot, itemType, customizationData, etc.)
      if (product.itemType === 'graduation_sash') {
        return [
          ...prev,
          {
            ...product,
            size: selectedSize || product.size || 'Standard',
            color: selectedColor || product.color || 'Default',
            quantity,
          }
        ];
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency || 'GH₵',
          size: selectedSize || (product.sizes ? product.sizes[0] : 'M'),
          color: selectedColor || (product.colors ? product.colors[0] : 'Default'),
          quantity,
          image: product.images ? product.images[0] : (product.image || '')
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size, color) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size && item.color === color)));
  };

  const updateQuantity = (id, size, color, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id && item.size === size && item.color === color) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
