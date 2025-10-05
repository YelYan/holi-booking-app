import {IBooking} from "#models/booking.model.js";
import Hotel from "#models/hotel.model.js";
import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler"

export const getMyBooking = asyncErrorWrapper(async (req : Request, res : Response) => {
    const userId = req.auth.payload.userId;

    const hotels = await Hotel.find({
        bookings: { $elemMatch: { userId: userId } }
    })

    const results = hotels.map(hotel => {
        const userBookings = hotel.bookings.filter(
            (booking: IBooking) => booking.userId === userId
        );
      return {
        ...hotel.toObject(),
        bookings: userBookings,
      };
    });

    res.status(200).json({
        success: true,
        data: results
    });
})