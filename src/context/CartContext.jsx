import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCartSummary, isShirtItem } from '../utils/pricing';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('orderright_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed.map(item => {
        if (item.itemType !== 'graduation_sash' && item.itemType !== 'dummy' && item.itemType !== 'test' && !item.isTest) {
          const weightExtra = item.weight === '1000GMS' ? 10 : 0;
          return { ...item, price: 55 + weightExtra };
        }
        return item;
      });
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
        item => item.id === product.id && item.size === selectedSize && item.color === selectedColor && item.weight === product.weight
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

      const isSash = product.itemType === 'graduation_sash' || (product.price && product.price > 70);
      const unitPrice = isSash ? product.price : (55.00 + (product.weight === '1000GMS' ? 10 : 0));

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: unitPrice,
          currency: product.currency || 'GH₵',
          size: selectedSize || (product.sizes ? product.sizes[0] : 'M'),
          color: selectedColor || (product.colors ? product.colors[0] : 'Default'),
          weight: product.weight || '600GMS',
          category: product.category || 'Tops',
          itemType: product.itemType || 'shirt',
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

  const setTestCartItem = (customProduct = {}) => {
    const dummyProduct = {
      id: customProduct.id || 'test-dummy-product-1',
      name: customProduct.name || 'Dummy Test Product',
      price: 1.00,
      currency: 'GH₵',
      size: customProduct.size || 'Standard',
      color: customProduct.color || 'Default',
      weight: 'Standard',
      category: 'Test',
      itemType: 'dummy',
      isTest: true,
      quantity: 1,
      image: customProduct.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60'
    };
    setCart([dummyProduct]);
    try {
      localStorage.setItem('orderright_cart', JSON.stringify([dummyProduct]));
    } catch (err) {
      console.warn('Could not save test cart to localStorage:', err.message);
    }
    return dummyProduct;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate promo pricing breakdown
  const {
    totalShirtQty,
    promoShirtBase,
    shirtWeightSurcharge,
    promoShirtTotal,
    sashSubtotal,
    promoDiscount,
    subtotal,
    originalSubtotal
  } = calculateCartSummary(cart);

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      setTestCartItem,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      promoDiscount,
      totalShirtQty,
      promoShirtBase,
      shirtWeightSurcharge,
      promoShirtTotal,
      sashSubtotal,
      originalSubtotal,
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

