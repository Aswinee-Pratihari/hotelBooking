import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hotelName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultGuest: { type: Number, required: true },
  childGuest: { type: Number, required: true },
  facilities: [{ type: String }],
  pricePerNight: { type: Number, required: true, default: 100 },
  starRating: { type: Number, required: true, min: 1, max: 5, default: 1 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true, default: Date.now() },
  // bookings: [bookingSchema],
});

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;
