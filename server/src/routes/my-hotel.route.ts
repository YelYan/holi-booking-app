import {  createMyHotel, getMyHotelById, getMyHotels, updateMyHotels} from "#controllers/my-hotel.controller.js";
import { productSchemaValidate } from "#data/request.schemas.js";
import authenticateUser from "#middleware/authenticate-user.js";
import validateRequest from "#middleware/validate.request.js";
import express from "express";


const router = express.Router()

router.get("/get-my-hotels", authenticateUser, getMyHotels);
router.get("/:id",authenticateUser, validateRequest(productSchemaValidate), getMyHotelById);
router.post("/create-my-hotel",authenticateUser, validateRequest(productSchemaValidate), createMyHotel);
router.put("/update-my-hotel/:hotelId",authenticateUser, validateRequest(productSchemaValidate), updateMyHotels);

export default router