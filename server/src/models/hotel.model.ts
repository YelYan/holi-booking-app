import {Document, model, Schema} from "mongoose";

import { IBooking } from "./booking.model.js"; 
import Booking from "./booking.model.js";

export interface IHotel extends Document {
    adultCount: number;
    bookings: IBooking[];
    childCount: number;
    city: string;
    country: string;
    createdAt?: Date;
    description: string;
    facilities: string[];
    imageUrls: string[];
    lastUpdated: Date;
    name: string;
    pricePerNight: number;
    starRating: number; // between 1–5 
    type: string;
    updatedAt?: Date;
    userId: string; 
}

const hotelSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [Booking],
},   { timestamps: true })

const Hotel = model("Hotel", hotelSchema);

export default Hotel