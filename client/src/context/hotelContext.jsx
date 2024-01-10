import React, { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HotelContext = createContext();
export const HotelProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [allhotelData, setAllHotelData] = useState(null);
  const [singleHotel, setSingleHotel] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    getAllHotel();
  }, []);
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage?.getItem("token")}`,
    // Add other headers as needed
  };

  const addNewHotel = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/my-hotels`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
        },
      });

      const data = await response.data;
      toast.success("Hotel created Successfully");
    } catch (error) {
      console.log(error);
      toast.failure("Error in creating Hotel");
    } finally {
      setLoading(false);
    }
  };

  const getAllHotel = async () => {
    const res = await axios.get(`${BASE_URL}/hotels`);
    const allHotels = await res.data;
    setAllHotelData(allHotels);
  };

  const getSingleHotel = async (id) => {
    const res = await axios.get(`${BASE_URL}/hotels/${id}`);
    const hotel = await res.data;
    setSingleHotel(hotel);
    return hotel;
    // console.log(hotel);
    // setAllHotelData(allHotels);
  };
  return (
    <HotelContext.Provider
      value={{
        loading,
        addNewHotel,
        allhotelData,
        getSingleHotel,
        singleHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
