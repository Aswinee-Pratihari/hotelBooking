import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/HotelModel.js";
import { TokenVerification } from "../middleware/TokenVerification.js";
import getDataUri from "../utils/dataUri.js";
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
