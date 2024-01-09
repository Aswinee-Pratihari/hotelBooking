import React from "react";
import { hotelFacilities, hotelTypes } from "../../config/hotelType.config";
import DetailsSection from "./DetailsSection";
import ResidencyTypeSection from "./ResidencyTypeSection";
import FacilitiesSection from "./FacilitiesSection";
import ImageSection from "./ImageSection";

const AddHotelForm = ({
  handleCheckboxChange,
  handleImageChange,
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* //price and rating options */}
      <DetailsSection formData={formData} handleChange={handleChange} />

      <ResidencyTypeSection formData={formData} handleChange={handleChange} />

      <FacilitiesSection
        formData={formData}
        handleCheckboxChange={handleCheckboxChange}
      />
      <ImageSection handleImageChange={handleImageChange} />

      <div className="bottom flex justify-between items-center">
        <button
          type="submit"
          className="text-white bg-blue-800 px-3 py-2 rounded-md hover:bg-blue-600 font-semibold text-lg"
        >
          Add Your Hotel
        </button>
      </div>
    </form>
  );
};

export default AddHotelForm;
