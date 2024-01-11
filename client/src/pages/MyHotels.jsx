import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { HotelContext } from "../context/hotelContext";

import { FaHotel, FaRupeeSign, FaStar } from "react-icons/fa";
const MyHotels = () => {
  const { id } = useParams();
  const { getAllMyHotels, myHotels } = useContext(HotelContext);

  console.log(id);
  useEffect(() => {
    (async () => {
      getAllMyHotels(id);
    })();
  }, [id]);

  console.log(myHotels);

  const facilities = ["spa", "room", "hello", "chalo"];
  return (
    <main className="mt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Hotels</h2>
        <Link
          to="/addHotel"
          className="text-white bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-900 font-semibold text-lg"
        >
          Add Hotel
        </Link>
      </div>

      {/* hotel card */}

      {myHotels?.map((hotel) => {
        const {
          hotelName,
          type,
          adultGuest,
          childGuest,
          pricePerNight,
          imageUrls,
          starRating,
        } = hotel;
        return (
          <div className="hotelCard border-2 shadow-md p-4 my-4 rounded-md ">
            <div className="top flex justify-between">
              <div className=" content flex flex-col justify-between flex-grow">
                <h2 className="text-2xl font-semibold">{hotelName}</h2>

                <div className="flex flex-wrap gap-4">
                  <span className="text-lg font-medium border-2 px-4 py-2 flex gap-2 items-center">
                    <FaHotel />
                    {type}
                  </span>
                  <span className="text-lg font-medium border-2 px-4 py-2 flex gap-2 items-center">
                    <FaRupeeSign />
                    {pricePerNight}
                  </span>
                  <span className="text-lg font-medium border-2 px-4 py-2 flex gap-2 items-center">
                    <FaStar />
                    {starRating}
                  </span>
                </div>

                <button className="text-white bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-900 font-semibold text-lg self-start">
                  Edit Hotel
                </button>
              </div>
              <img
                src={imageUrls[0]}
                alt=""
                className="w-[200px] h-[200px] object-cover rounded-md"
              />
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default MyHotels;
