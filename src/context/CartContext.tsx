"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CartContextType, CartItem, Phone } from "@/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    phone: Phone,
    color: string,
    storage: string,
    price: number
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === phone.id &&
          item.selectedColor === color &&
          item.selectedStorage === storage &&
          item.storageOptions.find((phone) => phone.price === price)
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...phone,
          quantity: 1,
          selectedColor: color,
          selectedStorage: storage,
          currentPrice: price,
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.currentPrice * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
