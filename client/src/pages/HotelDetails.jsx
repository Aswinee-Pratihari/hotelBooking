import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelContext } from "../context/hotelContext";
import Star from "../components/Star";
import StarRating from "../components/StarRating";

const HotelDetails = () => {
  const { id } = useParams();
  const { getSingleHotel, singleHotel } = useContext(HotelContext);
  //const [singleHotel, setSingleHotel] = useState();
  useEffect(() => {
    (async () => {
      getSingleHotel(id);
    })();
  }, [id]);

  console.log(singleHotel);
  const {
    hotelName,
    imageUrls,
    city,
    country,
    pricePerNight,
    starRating,
    facilities,
    type,
    adultGuest,
    childGuest,
    description,
    userId,
  } = singleHotel;
  return (
    <main className="mt-3">
      <div className="flex items-center justify-betweeen">
        <h2 className="text-2xl font-bold">{singleHotel.hotelName}</h2>
      </div>

      <div className="images mt-3 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {/* <img src={imageUrls[0]} alt="" className="col-span-2 row-span-2" /> */}
        {imageUrls?.map((image) => {
          return (
            <img
              src={image}
              alt=""
              className="rounded-md shadow-md h-[250px] w-full object-fill"
              key={image}
            />
          );
        })}
      </div>

      <div className="block md:flex justify-between ">
        <div className="flex-[2]">
          <h3 className="text-2xl font-semibold"> {`${city}, ${country}`}</h3>

          <StarRating selectedStars={starRating} />

          <p className="border border-gray-300 w-full my-4" />

          <p className="bg-transparent text-md font-medium leading-7 ">
            {description.slice(0, 350)}...
          </p>

          <p className="border border-gray-300 w-full my-4" />

          <div className="facilities">
            <h3 className="text-xl font-bold mb-4">What this place Offers</h3>

            <div className="grid grid-cols-2">
              {facilities?.map((facility, index) => {
                return (
                  <h5 key={index} className="text-lg font-normal text-gray-700">
                    {facility}
                  </h5>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 ">{/* guestForm */}</div>
      </div>
    </main>
  );
};

export default HotelDetails;
