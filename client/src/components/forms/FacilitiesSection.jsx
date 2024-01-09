import React from "react";
import { hotelFacilities } from "../../config/hotelType.config";

const FacilitiesSection = ({ formData, handleCheckboxChange }) => {
  return (
    <div className="my-4">
      <label className="block text-md font-medium text-lg text-gray-600">
        Facilities
      </label>
      <div className="grid grid-cols-5 gap-3 ">
        {/* Add required attribute to at least one checkbox */}
        {hotelFacilities?.map((facility) => {
          return (
            <label
              className="text-sm flex gap-1 items-center text-gray-700"
              key={facility}
            >
              <input
                type="checkbox"
                value={facility}
                checked={formData.facilities.includes(facility)}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-lg font-bold">{facility}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FacilitiesSection;
