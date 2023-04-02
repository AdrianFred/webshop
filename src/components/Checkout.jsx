import React, { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Checkout() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleRemoveFromCart = (id) => {
    removeFromCart({ id, quantity: -1 });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <div className="flex items-center">
                  <img className="w-16 h-16 object-cover object-center" src={item.imageUrl} alt={item.name} />
                  <div className="ml-4">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p>Price: ${item.price}</p>
                    <label htmlFor={`quantity-${item.id}`}>Quantity: </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 border border-gray-300 rounded px-2 py-1"
                    />
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mt-4 w-full">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
