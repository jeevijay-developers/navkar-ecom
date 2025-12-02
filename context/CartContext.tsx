"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    variantLabel?: string
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("navkar-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("navkar-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, variantLabel?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product._id === product._id &&
          item.selectedVariant === variantLabel
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      }

      return [
        ...prevCart,
        { product, quantity, selectedVariant: variantLabel },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item.product._id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
