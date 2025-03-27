import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // URL-dan product ID ni olish
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row items-center">
        <img src={product.image} alt={product.title} className="w-80 h-80 object-contain mb-6 md:mb-0" />

        <div className="md:ml-10">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.category}</p>
          <p className="mt-4 text-lg">{product.description}</p>

          <div className="mt-4 flex items-center space-x-4">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            {product.discount && (
              <span className="text-gray-500 line-through">${product.discount}</span>
            )}
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
              ❤️ Like
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              🛒 Add to Cart
            </button>
          </div>

          <Link to="/" className="block mt-6 text-green-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
