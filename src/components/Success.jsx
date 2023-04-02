import React from "react";
import { Link } from "react-router-dom";

function Success({ message }) {
  return (
    <div className="">
      <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-xl font-medium">Success!</h2>
          </div>
          <Link to="/" className="text-green-600 hover:text-green-700 focus:outline-none focus:underline">
            Home
          </Link>
        </div>
        <p className="mb-2">{message}</p>
        <p className="text-sm text-gray-600">A confirmation email has been sent to your email address.</p>
      </div>
    </div>
  );
}

export default Success;
