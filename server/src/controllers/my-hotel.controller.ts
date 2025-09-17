import { IHotel } from "#models/hotel.model.js";
import myHotelService from "#services/my-hotel.service.js";
import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler"

export const getMyHotels = asyncErrorWrapper(async (req: Request, res: Response) => {
    const products = await myHotelService.getMyHotels();
    res.status(200).json(products);
})
export const getMyHotelById= asyncErrorWrapper(async (req: Request, res: Response) => {
    const products = await myHotelService.getMyHotelById();
    res.status(200).json(products);
})
export const updateMyHotels = asyncErrorWrapper(async (req: Request, res: Response) => {
    const products = await myHotelService.updateMyHotel();
    res.status(200).json(products);
})

export const createMyHotelWithImages = asyncErrorWrapper(async (req : Request, res:Response) => {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel = req.body as IHotel;
        const userId =  req.auth.payload.userId;

        const hotel = await myHotelService.createHotelWithImages(imageFiles, newHotel , userId)
        res.status(201).json({
        success: true,
        message: "Hotel created successfully",
        hotel,
    });
})
