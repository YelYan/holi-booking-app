import {  createMyHotel, getMyHotelById, getMyHotels, updateMyHotels} from "#controllers/my-hotel.controller.js";
import { productSchemaValidate } from "#data/request.schemas.js";
import validateRequest from "#middleware/validate.request.js";
import express from "express";


const router = express.Router()

router.get("/get-my-hotels",getMyHotels);
router.get("/:id", validateRequest(productSchemaValidate), getMyHotelById);
router.post("/create-my-hotel", validateRequest(productSchemaValidate), createMyHotel);
router.put("/update-my-hotel/:hotelId", validateRequest(productSchemaValidate), updateMyHotels);

export default router