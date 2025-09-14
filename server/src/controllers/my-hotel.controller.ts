import { IHotel } from "#models/hotel.model.js";
import myHotelService from "#services/my-hotel.service.js";
import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler"

export const createMyHotel = asyncErrorWrapper(async (req: Request, res: Response) => {
    const myHotelData = req.body as IHotel;
    const newMyHotelData = await myHotelService.createMyHotel(myHotelData);
    res.status(201).json(newMyHotelData);
})

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