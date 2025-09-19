import {  createMyHotelWithImages, getMyHotelById, getMyHotels, updateMyHotels} from "#controllers/my-hotel.controller.js";
import { hotelFormSchemaValidate } from "#data/request.schemas.js";
import validateRequest from "#middleware/validate.request.js";
import { upload } from "#utils/utils.js";
import express from "express";

const router = express.Router();

router.post("/create-my-hotel",upload.array("imageFiles", 6), validateRequest(hotelFormSchemaValidate), createMyHotelWithImages);
router.get("/get-my-hotels", getMyHotels);
router.get("/:hotelId",  validateRequest(hotelFormSchemaValidate), getMyHotelById);
router.put("/update-my-hotel/:hotelId", upload.array("imageFiles", 6),validateRequest(hotelFormSchemaValidate), updateMyHotels);

export default router