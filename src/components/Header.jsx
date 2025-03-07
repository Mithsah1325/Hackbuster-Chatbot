import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-gray-900 text-white p-4 shadow-lg">
      {/* Left Side - Logo & Name */}
      <div className="flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/40" // Replace with your logo URL
          alt="HackBuster Logo"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-2xl font-bold tracking-wide text-green-400">HackBuster</h1>
      </div>

      {/* Right Side - Menu Options with Links */}
      <div className="flex space-x-4">
        <Link to="/chatbot">
          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition">
            🤖 Chatbot
          </button>
        </Link>
        <Link to="/playgame">
          <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition">
            🎮 Play Game
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
