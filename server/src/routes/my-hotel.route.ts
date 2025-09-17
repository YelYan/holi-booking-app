import {  createMyHotelWithImages, getMyHotelById, getMyHotels, updateMyHotels} from "#controllers/my-hotel.controller.js";
import { hotelFormSchemaValidate } from "#data/request.schemas.js";
import validateRequest from "#middleware/validate.request.js";
import { upload } from "#utils/utils.js";
import express from "express";

const router = express.Router();

router.post("/create-my-hotel", validateRequest(hotelFormSchemaValidate),upload.array("imageFiles", 6), createMyHotelWithImages);
router.get("/get-my-hotels", getMyHotels);
router.get("/:hotelId",  validateRequest(hotelFormSchemaValidate), getMyHotelById);
router.put("/update-my-hotel/:hotelId", validateRequest(hotelFormSchemaValidate), upload.array("imageFiles", 6), updateMyHotels);

export default router