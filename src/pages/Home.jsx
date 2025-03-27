import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));

    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Default all products
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // 📌 Kategoriyani bosganda mahsulotlarni filtrlash
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  // ❤️ Like bosganda yurakchani sonini oshirish
  const handleLike = (product) => {
    if (!likedProducts.includes(product.id)) {
      setLikedProducts([...likedProducts, product.id]);
    }
  };

  // 🛒 Savatchaga qo‘shish
  const handleAddToCart = (product) => {
    if (!cartItems.includes(product.id)) {
      setCartItems([...cartItems, product.id]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header likeCount={likedProducts.length} cartCount={cartItems.length} />

      <main className="flex-grow container mx-auto py-10">
        {/* 📌 Kategoriyalar */}
        <Categories onCategoryChange={handleCategoryChange} />

        {/* 📌 Mahsulotlar */}
        <h1 className="text-3xl font-bold text-center my-6 text-green-600">
          Featured Products
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={handleLike}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
