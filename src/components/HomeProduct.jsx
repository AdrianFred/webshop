import React, { useState, useEffect } from "react";
import useApi from "../hooks/FetchApi";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export default function HomeProduct() {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error } = useApi({ url: "https://api.noroff.dev/api/v1/online-shop" });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const filterProducts = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const filteredProducts = data.filter((product) => {
      return product.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredProducts(filteredProducts);
    setSuggestions(filteredProducts.map((product) => product.title));
  }, [searchValue, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <form className="flex items-center justify-center">
        <div className="relative">
          <input
            type="text"
            className="border-2 border-gray-400 rounded-full py-2 px-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Search products"
            onChange={(e) => filterProducts(e)}
            value={searchValue}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
          >
            <AiOutlineSearch size={25} />
          </button>
          {searchValue.length > 0 && (
            <div className="absolute z-50 bg-white rounded-lg shadow-lg mt-2 w-full">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="px-2 py-1 cursor-pointer hover:bg-gray-200" onClick={() => setSearchValue(suggestion)}>
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
      <h1 className="text-3xl font-bold mb-4">View All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-48 object-cover object-center" src={product.imageUrl} alt={product.title} />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-700 mb-2">${product.price}</p>

                <Link
                  to={{
                    pathname: `/product/${product.id}`,
                    state: {
                      product: product,
                    },
                  }}
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                    View product
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xl font-bold text-center">No products found</div>
        )}
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import useApi from "../hooks/FetchApi";
// import { Link } from "react-router-dom";
// import { AiOutlineSearch } from "react-icons/ai";

// export default function HomeProduct() {
//   const [searchValue, setSearchValue] = useState("");
//   const { data, isLoading, error } = useApi({ url: "https://api.noroff.dev/api/v1/online-shop" });
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);

//   const filterProducts = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     setSearchValue(searchValue);
//     const filteredProducts = data.filter((product) => {
//       return product.title.toLowerCase().includes(searchValue);
//     });
//     setFilteredProducts(filteredProducts);
//   };

//   useEffect(() => {
//     const suggestions = data.filter((product) => product.title.toLowerCase().includes(searchValue)).map((product) => product.title);
//     setSuggestions(suggestions);
//   }, [searchValue, data]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error.message}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-4">
//       <form className="flex items-center justify-center">
//         <div className="relative">
//           <input
//             type="text"
//             className="border-2 border-gray-400 rounded-full py-2 px-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="Search products"
//             value={searchValue}
//             onChange={(e) => filterProducts(e)}
//           />
//           <button
//             type="submit"
//             className="absolute inset-y-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
//             disabled
//           >
//             <AiOutlineSearch size={25} />
//           </button>
//           {searchValue.length > 0 && (
//             <div className="absolute z-50 bg-white rounded-lg shadow-lg mt-2 w-full">
//               {suggestions.map((suggestion, index) => (
//                 <div key={index} className="px-2 py-1 cursor-pointer hover:bg-gray-200" onClick={() => setSearchValue(suggestion)}>
//                   {suggestion}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </form>
//       <h1 className="text-3xl font-bold mb-4">View All Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img className="w-full h-48 object-cover object-center" src={product.imageUrl} alt={product.title} />
//               <div className="p-4">
//                 <h2 className="text-xl font-bold mb-2">{product.title}</h2>
//                 <p className="text-gray-700 mb-2">${product.price}</p>

//                 <Link
//                   to={{
//                     pathname: `/product/${product.id}`,
//                     state: {
//                       product: product,
//                     },
//                   }}
//                 >
//                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
//                     View product
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-xl font-bold text-center">No products found</div>
//         )}
//       </div>
//     </div>
//   );
// }
