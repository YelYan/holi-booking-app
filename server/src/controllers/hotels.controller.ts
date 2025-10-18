import hotelsService from "#services/hotels.service.js";
import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler"

export const paymentIntent = asyncErrorWrapper(async (req: Request , res: Response) => {
    const {hotelId} = req.params as {hotelId : string};
    const {numberOfNights}  = req.body as {numberOfNights : number};
    const userId = req.auth.payload.userId;
    const result = await hotelsService.createpaymentIntent(hotelId, userId, numberOfNights);

    res.status(200).json({
        success : true,
        message : "Payment Intent Created",
        ...result
    });
})

export const confirmPayment = asyncErrorWrapper(async (req: Request , res: Response) => {
    const {paymentIntentId}  = req.body as {paymentIntentId : string};
    
    const result = await hotelsService.confirmPayment(paymentIntentId, req);

    res.status(200).json({
        success : true,
        message : "Payment Confirmed",
        ...result
    })
});