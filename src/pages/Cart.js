import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto px-4 py-8 max-w-screen-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="flex flex-col md:flex-row justify-center md:justify-between">
        <div className="w-full md:w-2/3">
          <ul className="space-y-8">
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <hr className="my-4 border-t-2 border-gray-300" />
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
        <div className="w-full md:w-1/3 mt-8 md:mt-0 md:ml-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="mb-4">Total Price: ${totalPrice.toFixed(2)}</p>
            <Link to="/checkout-success">
              <div className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 w-full focus:outline-none focus:ring focus:ring-blue-500">
                <div> {cartItems.length === 0 ? "Cart is Empty" : "Proceed to Payment"}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
