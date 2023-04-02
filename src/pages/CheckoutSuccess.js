import React from "react";
import Success from "../components/Success";
import { CartContext } from "../components/CartContext";
import { useContext } from "react";

export default function CheckoutSuccess() {
  const { cartItems } = useContext(CartContext);

  // Total price
  const totalPrice = cartItems.reduce((total, item) => (item.discountedPrice || item.price) * item.quantity + total, 0).toFixed(2);

  return (
    <div className="flex items-center justify-center min-h-[92vh]">
      <Success message={`Your payment of $${totalPrice} was successful!`} />
    </div>
  );
}
