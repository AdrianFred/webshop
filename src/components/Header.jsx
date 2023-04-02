import React, { useState } from "react";
import headerImage from "../image/headerImage.jpg";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  return (
    <header className="relative">
      <div className=" ">
        <img className="w-full h-full max-h-[600px] object-cover" src={headerImage} alt="Header background" />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Epari</h1>
          <p className="text-xl text-white mb-8">We specialize in selling high-quality products that you'll love</p>
        </div>
      </div>
    </header>
  );
}
