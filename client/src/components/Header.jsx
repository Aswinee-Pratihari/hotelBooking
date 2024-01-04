import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Booking.com</Link>
        </h1>
        <div className="flex space-x-2">
          <Link
            to="/signIn"
            className="bg-white text-blue-600 px-3 py-2 rounded-md hover:bg-gray-300 font-semibold text-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
