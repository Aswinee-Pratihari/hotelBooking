import React, { useContext } from "react";
import { hotelFacilities, hotelTypes } from "../../config/hotelType.config";
import DetailsSection from "./DetailsSection";
import ResidencyTypeSection from "./ResidencyTypeSection";
import FacilitiesSection from "./FacilitiesSection";
import ImageSection from "./ImageSection";
import { HotelContext } from "../../context/hotelContext";

const AddHotelForm = ({
  handleCheckboxChange,
  handleImageChange,
  formData,
  handleChange,
  handleSubmit,
}) => {
  const { loading } = useContext(HotelContext);

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          disabled={loading}
          className="disabled:bg-gray-300 text-white bg-blue-800 px-3 py-2 rounded-md hover:bg-blue-600 font-semibold text-lg"
        >
          {loading ? "Saving..." : "Add Your Hotel"}
        </button>
      </div>
    </form>
  );
};

export default AddHotelForm;
