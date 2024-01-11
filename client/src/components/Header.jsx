import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Booking.com</Link>
        </h1>
        <div className="flex space-x-2">
          {user ? (
            <div className="flex gap-3 items-center">
              <h4 className="text-lg text-white ">Hello {user.firstName}</h4>

              <Link
                to={`/myHotels/${user?._id}`}
                className="text-white     hover:underline font-semibold text-lg"
              >
                My Hotels
              </Link>

              <button className="bg-white text-blue-600 px-3 py-2 rounded-md hover:bg-gray-300 font-semibold text-lg">
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/signIn"
              className="bg-white text-blue-600 px-3 py-2 rounded-md hover:bg-gray-300 font-semibold text-lg"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
