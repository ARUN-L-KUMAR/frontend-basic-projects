import React, { createContext, useContext, useEffect, useState } from 'react';

const CartWishlistContext = createContext();

export const useCartWishlist = () => useContext(CartWishlistContext);

const getInitial = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export const CartWishlistProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getInitial('cart', []));
  const [wishlist, setWishlist] = useState(() => getInitial('wishlist', []));

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  // Cart logic
  const addToCart = (product, selectedColor, selectedSize) => {
    setCart(prev => {
      const idx = prev.findIndex(
        item => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { ...product, quantity: 1, selectedColor, selectedSize }];
    });
  };
  const removeFromCart = (productId, selectedColor, selectedSize) => {
    setCart(prev => prev.filter(
      item => !(item.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
    ));
  };
  const updateCartQuantity = (productId, selectedColor, selectedSize, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize) {
        const qty = item.quantity + change;
        return qty > 0 ? { ...item, quantity: qty } : null;
      }
      return item;
    }).filter(Boolean));
  };
  const clearCart = () => setCart([]);

  // Wishlist logic
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      return exists ? prev.filter(item => item.id !== product.id) : [...prev, product];
    });
  };
  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  // Counts
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartWishlistContext.Provider value={{
      cart, wishlist, addToCart, removeFromCart, updateCartQuantity, clearCart,
      toggleWishlist, isInWishlist, cartCount, wishlistCount
    }}>
      {children}
    </CartWishlistContext.Provider>
  );
}; 