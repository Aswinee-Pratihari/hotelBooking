import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/HotelModel.js";
import { TokenVerification } from "../middleware/TokenVerification.js";
import getDataUri from "../utils/dataUri.js";
import mongoose from "mongoose";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post(
  "/",
  TokenVerification,
  upload.array("imageUrls", 5),
  async (req, res) => {
    try {
      const newHotel = req.body;

      const Imagefiles = req.files;

      const imageUrls = await uploadImages(Imagefiles);

      newHotel.userId = req.user._id;
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();

      const hotel = await Hotel.create(newHotel);

      return res.status(201).json("new hotel created");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.get("/:id", TokenVerification, async (req, res) => {
  try {
    const id = req.params.id.toString();

    const hotels = await Hotel.find({ userId: id });
    return res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.put("/:id", TokenVerification, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "no id specified." });
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    const newHotel = req.body;

    const existingHotel = await Hotel.findOne({ _id: id });

    if (req.user._id.toString() !== existingHotel.userId.toString())
      return res
        .status(401)
        .json({ error: "you can't edit other people contacts!" });

    newHotel.lastUpdated = new Date();

    const updatedHotel = await Hotel.findByIdAndUpdate(id, newHotel, {
      new: true,
    });
    // const hotel = await Hotel.create(newHotel);
    return res.status(201).json(updatedHotel);
    //  return res.status(201).json("Hotel Edited");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (image) => {
    const result = getDataUri(image);
    const res = await cloudinary.uploader.upload(result.content);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
export default router;
