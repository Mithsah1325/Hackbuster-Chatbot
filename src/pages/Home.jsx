import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/hack.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-4xl font-bold text-green-400 mb-4">Welcome to HackBuster 🔥</h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Test your cybersecurity skills! Chat with our AI-driven assistant to learn 
          about security threats and play an interactive game to see how well you can 
          defend against hackers.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <Link to="/chatbot">
            <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500 transition text-lg">
              🤖 Start Chatbot
            </button>
          </Link>
          <Link to="/playgame">
            <button className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-500 transition text-lg">
              🎮 Play Game
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
