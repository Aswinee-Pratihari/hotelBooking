import React, { createContext, useState } from "react";
import axios from "axios";

export const HotelContext = createContext();
export const HotelProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [AllhotelData, setAllHotelData] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <HotelContext.Provider value={{ loading, addNewHotel }}>
      {children}
    </HotelContext.Provider>
  );
};
