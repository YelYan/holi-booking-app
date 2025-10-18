import { paymentIntent } from "#controllers/hotels.controller.js";
import express from "express";

const router = express.Router();

router.post("/:hotelId/bookings/payment-intent", paymentIntent)

export default router