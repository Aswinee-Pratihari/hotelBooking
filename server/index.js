import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./utils/db.js";
import UserRoute from "./routes/users.js";
import MyHotelRoute from "./routes/my-hotels.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my-hotels", MyHotelRoute);
app.use("/api/user", UserRoute);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(8000, () => {
  connectDB();
});
