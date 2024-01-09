import React from "react";

const LatestHotelCard = ({ hotel }) => {
  return (
    <>
      <div className="relative">
        <div className="h-[300px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute bottom-0  p-4 bg-black bg-opacity-50 w-full rounded-b-md">
          <span className="text-white font-bold tracking-tight text-3xl">
            {hotel.hotelName}
          </span>
        </div>
      </div>

      <div className="bottom mt-2 flex items-center justify-between">
        <span className="text-base font-semibold  ">
          {hotel?.city}, {hotel?.country}
        </span>

        <span className="text-base font-semibold  ">
          ${hotel?.pricePerNight}
        </span>
      </div>
    </>
  );
};

export default LatestHotelCard;
