import Hotel,{ IHotel } from "#models/hotel.model.js";
import myHotelService from "#services/my-hotel.service.js";
import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler"

export const getMyHotels = asyncErrorWrapper(async (req: Request, res: Response) => {
    const userId = req.auth.payload.userId;
    const hotels = await myHotelService.getMyHotels(userId);
    res.status(200).json({
        success : true,
        message : "Your hotels",
        hotels
    });
})
export const getMyHotelById= asyncErrorWrapper(async (req: Request, res: Response) => {
    const hotelId = req.params.hotelId;
    const hotel = await myHotelService.getMyHotelById(hotelId);
    res.status(200).json({
        success : true,
        message : "Get Hotel By Id",
        hotel
    });
})
export const updateMyHotels = asyncErrorWrapper(async (req: Request, res: Response) => {
        const imageFiles = req.files as Express.Multer.File[];
        const updateHotel = req.body as IHotel;
        const hotelId = req.params.hotelId;
        const userId =  req.auth.payload.userId;
        const updatedHotel = await myHotelService.updateMyHotel(imageFiles,updateHotel, userId, hotelId );
        res.status(201).json({
            success: true,
            message: "Hotel updated successfully",
            updatedHotel,
        });
})
export const deleteMyHotels = asyncErrorWrapper(async (req: Request, res: Response) => {
    const hotelId = req.params.hotelId;
    const userId = req.auth.payload.userId;
    const hotel = await myHotelService.deleteMyHotel(hotelId , userId);
    res.status(200).json({
        success : true,
        message : "Deleted hotel successfully",
        hotel
    });
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
export const getLastestHotels = asyncErrorWrapper(async (req: Request, res: Response) => {
    const hotels = await Hotel.find().sort("-lastUpdated");
    console.log(hotels)
    res.status(200).json({
        success : true,
        data : hotels
    })
})

