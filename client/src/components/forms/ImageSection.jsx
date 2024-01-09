import React from "react";

const ImageSection = ({ handleImageChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="imageUrls" className="block mb-2 font-bold">
        Images
      </label>
      <input
        type="file"
        id="imageUrls"
        name="imageUrls"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className=" border border-gray-300 p-2 rounded-md"
      />
    </div>
  );
};

export default ImageSection;
