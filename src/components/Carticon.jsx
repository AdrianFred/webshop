import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

export default function CartIcon({ itemCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = React.useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));

  useEffect(() => {
    setTotalPrice(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
  }, [cartItems]);

  const handleCartClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" onClick={handleCartClick}>
      <button>
        <AiOutlineShoppingCart size={35} />
      </button>
      {itemCount > 0 && <div className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white w-5 h-5 text-center">{itemCount}</div>}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-md shadow-lg z-10">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Your Cart</h2>
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between mb-4 ">
                    <div className="w-2/3">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="w-1/3 text-right">
                      <p className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between">
                  <div className="font-medium text-lg">Total:</div>
                  <div className="font-bold text-lg">${totalPrice.toFixed(2)}</div>
                </div>
                <div className="mt-4">
                  <Link to="/cart">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                      View Cart
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>Your cart is empty.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
