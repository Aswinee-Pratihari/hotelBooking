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
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : 1);
    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    if (!hotels) {
      return res.status(404).json("Hotels not found");
    }
    const total = await Hotel.countDocuments(query);
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

    if (!hotel) {
      return res.status(404).json("Hotel not found");
    }
    return res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

const constructSearchQuery = (queryParams) => {
  let constructedQuery = {};

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }
  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultGuest) {
    constructedQuery.adultGuest = {
      $gte: parseInt(queryParams.adultGuest),
    };
  }

  if (queryParams.childGuest) {
    constructedQuery.childGuest = {
      $gte: parseInt(queryParams.childGuest),
    };
  }

  if (queryParams.type) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.type)
        ? queryParams.type.split(",")
        : queryParams.type.split(","),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities.split(",")
        : queryParams.facilities.split(","),
    };
  }
  return constructedQuery;
};
export default router;
