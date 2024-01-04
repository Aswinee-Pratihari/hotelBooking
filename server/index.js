import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./utils/db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(8000, () => {
  connectDB();
});
