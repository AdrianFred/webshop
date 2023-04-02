import React from "react";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialCartItems = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  };

  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const updateQuantity = (product, newQuantity) => {
    setCartItems(cartItems.map((item) => (item.id === product ? { ...item, quantity: newQuantity } : item)).filter((item) => item.quantity > 0));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>{children}</CartContext.Provider>;
};
