import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${localStorage?.getItem("token")}`,
  // Add other headers as needed
};

export const AddNewHotel = async (formData) => {
  const response = await axios.post(`${BASE_URL}/my-hotels`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage?.getItem("token")}`,
    },
  });

  const data = await response.data;
  console.log(data);
};
