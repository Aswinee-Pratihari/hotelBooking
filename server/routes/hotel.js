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
router.get("/search", async (req, res) => {
  try {
    const pageSize = 2;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : 1);
    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    if (!hotels) {
      return res.status(404).json("Hotels not found");
    }
    const total = await Hotel.countDocuments();
    const response = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
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
