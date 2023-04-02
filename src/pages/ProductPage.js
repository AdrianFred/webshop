// import React from "react";
// import { useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useState, useEffect, useContext } from "react";
// import { CartContext } from "../components/CartContext";
// import { AiFillStar } from "react-icons/ai";

// export default function ProductPage() {
//   const { id } = useParams();
//   const location = useLocation();
//   const [product, setProduct] = useState(location.state?.product || null);
//   const [isLoading, setIsLoading] = useState(!product);
//   const [error, setError] = useState(null);
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     // If the product data is already available, do not fetch it again
//     if (product) return;

//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`https://api.noroff.dev/api/v1/online-shop/${id}`);

//         if (!response.ok) {
//           throw new Error("Failed to fetch product data");
//         }

//         const productData = await response.json();
//         setProduct(productData);
//         setIsLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id, product]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }
//   console.log(product);
//   const averageRating = product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length;

//   return (
//     <div className="flex items-center justify-center min-h-[92vh] bg-gray-100">
//       <div className="bg-white p-6 rounded max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
//         <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
//         <p className="text-gray-600 mb-4">{product.description}</p>
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <span className="text-lg font-semibold mr-2">${product.price}</span>
//             <div className="flex items-center">
//               <span className="text-gray-600 mr-2">{averageRating.toFixed(1)}</span>
//               <AiFillStar className="text-yellow-500" size={20} />
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               addToCart(product);
//             }}
//             className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
//           >
//             Add to Cart
//           </button>
//         </div>
//         <div className="mt-8">
//           <h3 className="text-lg font-bold mb-4">Product Reviews</h3>
//           {product.reviews.map((review) => (
//             <div key={review.id} className="mb-4">
//               <div className="flex items-center mb-2">
//                 <span className="text-gray-600 font-bold mr-2">{review.username}</span>
//                 <div className="flex items-center">
//                   <span className="text-gray-600 mr-2">{review.rating}</span>
//                   <AiFillStar className="text-yellow-500" size={20} />
//                 </div>
//               </div>
//               <p className="text-gray-600">{review.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../components/CartContext";
import { AiFillStar } from "react-icons/ai";

export default function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [isLoading, setIsLoading] = useState(!product);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // If the product data is already available, do not fetch it again
    if (product) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/online-shop/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const productData = await response.json();
        setProduct(productData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, product]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const discount = ((product.price - product.discountedPrice) / product.price) * 100;
  const averageRating = product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length;

  return (
    <div className="flex items-center justify-center min-h-[92vh] bg-gray-100">
      <div className="bg-white p-6 rounded max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>

        <img src={product.imageUrl} alt={product.title} className="w-full h-64 object-cover mb-4 rounded" />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg font-semibold mr-2">${product.discountedPrice}</span>

            {product.discountedPrice !== product.price ? <span className="text-gray-600 line-through">${product.price}</span> : <span></span>}
            {product.discountedPrice !== product.price ? <span className="text-red-600 font-bold ml-2">-{discount.toFixed(0)}%</span> : <span></span>}

            <div className="flex items-center ml-4">
              {product.reviews.length > 0 ? averageRating.toFixed(1) : <span className="text-gray-600 mr-2">0</span>}
              <AiFillStar className="text-yellow-500" size={20} />
            </div>
          </div>
          <button onClick={() => addToCart(product)} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
            Add to Cart
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Product Reviews</h3>
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review.id} className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-gray-600 font-bold mr-2">{review.username}</span>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">{review.rating}</span>
                    <AiFillStar className="text-yellow-500" size={20} />
                  </div>
                </div>
                <p className="text-gray-600">{review.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews available for this product.</p>
          )}
        </div>
      </div>
    </div>
  );
}
