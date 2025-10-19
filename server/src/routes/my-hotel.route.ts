import {  createMyHotelWithImages,deleteMyHotels,getLastestHotels, getMyHotelById, getMyHotels,updateMyHotels} from "#controllers/my-hotel.controller.js";
import { hotelFormSchemaValidate } from "#data/request.schemas.js";
import authenticateUser from "#middleware/authenticate-user.js";
import validateRequest from "#middleware/validate.request.js";
import { upload } from "#utils/utils.js";
import express from "express";

const router = express.Router();

router.post("/create-my-hotel",authenticateUser,upload.array("imageFiles", 6), validateRequest(hotelFormSchemaValidate), createMyHotelWithImages);
router.get("/get-last-updated" , getLastestHotels)
router.get("/get-my-hotels",authenticateUser, getMyHotels);
router.get("/:hotelId",  validateRequest(hotelFormSchemaValidate), getMyHotelById);
router.put("/update-my-hotel/:hotelId", authenticateUser,upload.array("imageFiles", 6),validateRequest(hotelFormSchemaValidate), updateMyHotels);
router.delete("/:hotelId",authenticateUser, deleteMyHotels)


export default router