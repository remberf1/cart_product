'use client'
import {createContext, useContext, useState, ReactNode} from 'react';

// Base product type
export interface Product {
  name: string;
  price: number;
  category?: string;
  image?: {
    thumbnail?: string;
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

// Cart item extends Product with quantity info
export interface CartItem extends Product {
  quantity: number;
  subtotal: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Product) => void; // Changed to accept Product
  removeFromCart: (name: string) => void;
  decreaseQuantity: (name: string) => void;
  totalPrice?: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({children}: {children: ReactNode}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Product) => { // Changed parameter type
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name);

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                subtotal: (cartItem.quantity + 1) * cartItem.price
              }
            : cartItem
        );
      }

      // Create new cart item from product
      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
          subtotal: item.price,
          thumbnail: item.image?.thumbnail
        }
      ];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prevItems) => prevItems.filter((i) => i.name !== name));
  };

  const decreaseQuantity = (name: string) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.price
              }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, totalPrice, decreaseQuantity, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};