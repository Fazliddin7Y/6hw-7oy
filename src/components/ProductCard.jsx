import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ product, onLike, onAddToCart }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg relative group">
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-4" />

      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-600 mt-1">{product.category}</p>

      <div className="mt-2 flex items-center space-x-2">
        <span className="text-lg font-bold text-green-600">${product.price}</span>
        {product.discount && (
          <span className="text-gray-500 line-through">${product.discount}</span>
        )}
      </div>

      {/* Hover bo‘lganda chiqadigan iconlar */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onLike(product)} className="bg-red-500 p-2 rounded-full text-white">
          <FaHeart />
        </button>
        <button onClick={() => onAddToCart(product)} className="bg-blue-500 p-2 rounded-full text-white">
          <FaShoppingCart />
        </button>
        <Link to={`/product/${product.id}`} className="bg-gray-800 p-2 rounded-full text-white">
          <FaEye />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;