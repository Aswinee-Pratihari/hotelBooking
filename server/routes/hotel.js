import express from "express";
import Hotel from "../models/HotelModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();

    return res.status(201).json(hotels);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default router;
