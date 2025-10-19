import {confirmPayment, paymentIntent } from "#controllers/hotels.controller.js";
import express from "express";

const router = express.Router();

router.post("/:hotelId/bookings/payment-intent", paymentIntent)
router.post("/:hotelId/bookings/confirm-payment", confirmPayment)

export default router