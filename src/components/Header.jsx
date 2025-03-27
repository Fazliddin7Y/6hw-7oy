import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-green-600 font-bold text-2xl">
          GREENSHOP
        </Link>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-green-600">
            Blog
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <FaSearch className="text-gray-600 hover:text-green-600 cursor-pointer" />
          <FaShoppingCart className="text-gray-600 hover:text-green-600 cursor-pointer" />

          {/* Login / Profile */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
                <FaUser className="mr-2" />
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/signin" className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
              <FaUser className="mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
