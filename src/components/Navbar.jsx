import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Transition } from "@headlessui/react";
import CartIcon from "./Carticon";
import { CartContext } from "./CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = React.useContext(CartContext);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [cartCount, setCartCount] = useState(cartItems.reduce((total, item) => total + item.quantity, 0));

  useEffect(() => {
    setCartCount(cartItemsCount);
  }, [cartItemsCount]);

  // Listener for the cart icon so it updates across tabs
  useEffect(() => {
    const storageChange = (e) => {
      if (e.key === "cartItems") {
        const updatedItems = JSON.parse(e.newValue);
        setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0));
      }
    };

    window.addEventListener("storage", storageChange);

    return () => {
      window.removeEventListener("storage", storageChange);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white shadow-lg ">
      <div className=" mx-auto px-4 py-4 flex flex-wrap items-center justify-between max-w-[1500px]">
        <Link to="/" className="text-2xl font-bold">
          Epari
        </Link>
        <div className=" hidden lg:inline-block lg:w-auto">
          <div className="lg:flex items-center">
            <Link to="/">
              <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 transition-colors duration-200 hover:text-blue-400">Home</div>
            </Link>
            <Link to="cart">
              <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 transition-colors duration-200 hover:text-blue-400">
                Shopping Cart
              </div>
            </Link>
            <Link to="/contact">
              <div className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 transition-colors duration-200 hover:text-blue-400">Contact us</div>
            </Link>
          </div>
        </div>
        <div className="flex gap-7">
          <CartIcon itemCount={cartCount} />
          <button className="text-white inline-block lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <AiOutlineMenu size={35} className={`${isOpen ? "hidden" : "block"}`} />
            <AiOutlineClose size={35} className={`${isOpen ? "block" : "hidden"}`} />
          </button>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="lg:hidden" ref={ref}>
            <div className="px-2 pt-2 pb-3 sm:px-3">
              <a
                href="/"
                className="block
                px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900
                focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                Home
              </a>
              <a
                href="/"
                className="mt-1 block px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                Shopping Cart
              </a>
              <a
                href="/"
                className="mt-1 block px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
}
