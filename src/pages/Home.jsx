import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState(
    JSON.parse(localStorage.getItem("likedProducts")) || []
  );
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 📌 Foydalanuvchilarni olish
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    // 📌 Mahsulotlarni olish
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Mahsulotlarni yuklashda xatolik!");
        setLoading(false);
      });
  }, []);

  // 📌 Kategoriya bo‘yicha mahsulotlarni filtrlash
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
      const updatedLikes = [...likedProducts, product.id];
      setLikedProducts(updatedLikes);
      localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
    }
  };

  // 🛒 Savatchaga qo‘shish
  const handleAddToCart = (product) => {
    if (!cartItems.includes(product.id)) {
      const updatedCart = [...cartItems, product.id];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 📌 Header */}
      <Header likeCount={likedProducts.length} cartCount={cartItems.length} />

      <main className="flex-grow container mx-auto py-10">
        {/* 📌 Kategoriyalar */}
        <Categories onCategoryChange={handleCategoryChange} />

        {/* 📌 Error yoki Loading holati */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <p className="text-center text-gray-600">Yuklanmoqda...</p>
        ) : (
          <>
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
          </>
        )}
      </main>

      {/* 📌 Footer */}
      <Footer />
    </div>
  );
};

export default Home;
