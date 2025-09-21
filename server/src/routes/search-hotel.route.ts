import { searchHotels } from "#controllers/search-hotels.controller.js";
import express from "express";

const router = express.Router();

router.get("/search-hotels", searchHotels);


export default router