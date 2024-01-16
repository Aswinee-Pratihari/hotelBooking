import React, { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HotelContext = createContext();
export const HotelProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [allhotelData, setAllHotelData] = useState(null);
  const [singleHotel, setSingleHotel] = useState(null);
  const [myHotels, setMyHotels] = useState(null);
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
  };

  const getAllMyHotels = async (id) => {
    const res = await axios.get(`${BASE_URL}/my-hotels/${id}`, {
      headers: headers,
    });
    const hotels = await res.data;
    console.log(hotels);
    setMyHotels(hotels);
    return hotels;
  };

  const searchHotel = async (searchParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams?.destination || "");
    queryParams.append("checkIn", searchParams?.checkIn || "");
    queryParams.append("checkOut", searchParams?.checkOut || "");
    queryParams.append("adultCount", searchParams?.adultCount || "");
    queryParams.append("childCount", searchParams?.childCount || "");
    queryParams.append("page", searchParams?.page || "");

    try {
      const res = await axios.get(`${BASE_URL}/hotels/search?${queryParams}`);
      const hotels = await res?.data;
      return hotels;
      console.log(hotels);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <HotelContext.Provider
      value={{
        loading,
        addNewHotel,
        allhotelData,
        getSingleHotel,
        singleHotel,
        getAllMyHotels,
        myHotels,
        searchHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
