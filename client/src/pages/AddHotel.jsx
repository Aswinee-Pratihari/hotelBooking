import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { hotelFacilities, hotelTypes } from "../config/hotelType.config";
import AddHotelForm from "../components/forms/AddHotelForm";
import { AddNewHotel } from "../utils/hotel-api";
import { HotelContext } from "../context/hotelContext";

const AddHotel = () => {
  const { user } = useContext(AuthContext);
  const { addNewHotel, loading } = useContext(HotelContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: user?._id || "",
    hotelName: "",
    description: "",
    city: "",
    country: "",
    pricePerNight: 100,
    type: "Family",
    starRating: 1,
    facilities: [],
    childGuest: 0,
    adultGuest: 1,
    imageUrls: [""],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("hotelName", formData.hotelName);
    formDataToSend.append("adultGuest", formData.adultGuest);
    formDataToSend.append("childGuest", formData.childGuest);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("pricePerNight", formData.pricePerNight.toString());
    formDataToSend.append("starRating", formData.starRating.toString());
    formDataToSend.append("type", formData.type);

    formData.facilities.forEach((facility, index) => {
      formDataToSend.append(`facilities[${index}]`, facility);
    });

    Array.from(formData.imageUrls).forEach((imageUrls) => {
      formDataToSend.append(`imageUrls`, imageUrls);
    });

    await addNewHotel(formDataToSend);
    navigate("/");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imageUrls: e.target.files });
  };

  const handleCheckboxChange = (e) => {
    let newArray = [...formData.facilities, e.target.value];
    if (formData.facilities.includes(e.target.value)) {
      newArray = newArray.filter((facility) => facility !== e.target.value);
    }
    setFormData({ ...formData, facilities: newArray });
  };

  return (
    <main>
      <h2 className="text-4xl tracking-tight font-bold ">Add a Hotel</h2>
      <AddHotelForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        handleCheckboxChange={handleCheckboxChange}
      />
    </main>
  );
};

export default AddHotel;
