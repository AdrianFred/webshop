import React from "react";
import Success from "../components/Success";
import { CartContext } from "../components/CartContext";
import { useContext } from "react";

export default function CheckoutSuccess() {
  const { cartItems } = useContext(CartContext);

  // Total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex items-center justify-center min-h-[92vh]">
      <Success message={`Your payment of $${totalPrice} was successful!`} />
    </div>
  );
}
