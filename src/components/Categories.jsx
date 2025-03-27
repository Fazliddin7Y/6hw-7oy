import React from "react";

const Categories = ({ onCategoryChange }) => {
  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 capitalize"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
