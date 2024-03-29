import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Hero = () => {
  const { user } = useContext(AuthContext);
  return (
    <main className="py-10 pb-20 bg-blue-800 text-white">
      <div className="container mx-auto">
        <h2 className="text-6xl font-bold tracking-wide mb-3">
          {user ? `Where to next, ${user?.firstName}?` : `Find your next stay`}
        </h2>
        <p className="text-2xl font-sans">
          Find exclusive Genius rewards in every corner of the world!
        </p>
      </div>
    </main>
  );
};

export default Hero;
