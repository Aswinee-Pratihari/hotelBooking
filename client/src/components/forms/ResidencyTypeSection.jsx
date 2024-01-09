import React from "react";
import { hotelTypes } from "../../config/hotelType.config";

const ResidencyTypeSection = ({ formData, handleChange }) => {
  return (
    <div className="mt-4">
      <h5 className="text-lg font-semibold text-gray-800 my-4">
        Residency Type
      </h5>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {hotelTypes?.map((type) => {
          return (
            <label
              className={`inline-flex items-center ml-2 px-3 py-2  text-white rounded-full ${
                formData.type === type ? "bg-gray-900" : "bg-gray-400"
              } hover:bg-gray-700 cursor-pointer`}
            >
              <input
                type="radio"
                value={type}
                name="type"
                checked={formData.type === type}
                onChange={handleChange}
                className="form-radio hidden"
                required
              />
              <span className="">{type}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ResidencyTypeSection;
