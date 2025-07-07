import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, products } from '../data/mockData';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCartFromStorage();
    } else {
      setCartItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (user && cartItems.length > 0) {
      saveCartToStorage();
    }
  }, [cartItems, user]);

  const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      // Add product data to cart items
      const cartWithProducts = parsedCart.map((item: CartItem) => ({
        ...item,
        product: products.find(p => p.id === item.product_id)
      }));
      setCartItems(cartWithProducts);
    }
  };

  const saveCartToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));

    const product = products.find(p => p.id === productId);
    if (!product) {
      setLoading(false);
      return;
    }

    const existingItem = cartItems.find(item => item.product_id === productId);

    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        product_id: productId,
        quantity,
        product
      };
      setCartItems(prev => [...prev, newItem]);
    }
    
    setLoading(false);
  };

  const removeFromCart = async (itemId: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setLoading(false);
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
    
    setLoading(false);
  };

  const clearCart = async () => {
    if (!user) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems([]);
    localStorage.removeItem('cart');
    setLoading(false);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};