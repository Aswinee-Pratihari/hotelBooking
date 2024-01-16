// FormInput.js
import React from "react";

const DetailsSection = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="hotelName"
          className="block text-md font-medium text-gray-600"
        >
          Hotel Name
        </label>
        <input
          type="text"
          id="hotelName"
          name="hotelName"
          required
          value={formData.hotelName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-500 rounded-md"
        />
      </div>

      <div className="mb-4 flex justify-between sm:items-center sm:gap-10 sm:flex-row flex-col ">
        <div className="flex-1 ">
          <label
            htmlFor="city"
            className="block text-md font-medium text-gray-600"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-500 rounded-md"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="country"
            className="block text-md font-medium text-gray-600"
          >
            country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-500 rounded-md"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="description"
          className="block text-md font-medium text-gray-600"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          type="text"
          required
          cols="30"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-500 rounded-md"
        />
      </div>

      <div className="mb-4 flex justify-between sm:items-center sm:gap-10 sm:flex-row flex-col ">
        <div className="flex-1 ">
          <label
            htmlFor="pricePerNight"
            className="block text-md font-medium text-gray-600"
          >
            Price Per Night
          </label>
          <input
            type="number"
            id="pricePerNight"
            name="pricePerNight"
            required
            min={100}
            value={formData.pricePerNight}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-500 rounded-md"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="rating"
            className="block text-md font-medium text-gray-600"
          >
            rating
          </label>
          <select className="border rounded w-full p-2 text-gray-700 font-normal">
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option value={formData.starRating} onChange={handleChange}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 flex justify-between sm:items-center sm:gap-10 sm:flex-row flex-col ">
        <div className="flex-1 ">
          <label
            htmlFor="adultGuest"
            className="block text-md font-medium text-gray-600"
          >
            Adult Guest
          </label>
          <input
            type="number"
            id="adultGuest"
            name="adultGuest"
            required
            min={1}
            value={formData.adultGuest}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-500 rounded-md"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="childGuest"
            className="block text-md font-medium text-gray-600"
          >
            Child Guest
          </label>
          <input
            type="number"
            id="childGuest"
            name="childGuest"
            min={0}
            required
            value={formData.childGuest}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-500 rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default DetailsSection;
