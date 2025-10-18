
import { getMyBooking } from "#controllers/my-bookings.controller.js";
import authenticate from "#middleware/authenticate-user.js";
import express from "express";

const router = express.Router();

// api/get-my-bookings
router.get("/", authenticate, getMyBooking);


export default router