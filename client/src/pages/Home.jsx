import React, { useContext } from "react";
import { HotelContext } from "../context/hotelContext";
import { Link } from "react-router-dom";
import LatestHotelCard from "../components/LatestHotelCard";

const Home = () => {
  const { allhotelData } = useContext(HotelContext);
  return (
    <main className="h-full container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allhotelData?.map((hotel) => {
        return (
          <Link
            to={`/hotelDetails/${hotel._id}`}
            className=" cursor-pointer overflow-hidden rounded-md"
          >
            <LatestHotelCard hotel={hotel} />
          </Link>
        );
      })}
    </main>
  );
};

export default Home;
