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

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id.toString();
    const hotel = await Hotel.findById(id);

    // if (!hotel) {
    //   return res.status(404).json("Hotel not found");
    // }
    return res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
export default router;
