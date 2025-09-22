import Hotel , {HotelSearchResponse}from "#models/hotel.model.js";
// import searchHotelsService from "#services/search-hotels.service.js";
import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler";

export const searchHotels = asyncErrorWrapper(async (req :Request, res : Response) => {
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page as string) || 1

    const skip = (pageNumber- 1) * pageSize;

    const hotels = await Hotel.find().skip(skip).limit(pageSize)

    const total = await Hotel.countDocuments();

    // calculate total pages
    const totalPages = Math.ceil(total / pageSize);

    const response : HotelSearchResponse = {
        data : hotels,
        pagination : {
            total,
            page : pageNumber,
            pages : totalPages,
            hasNextPage : pageNumber < totalPages,
            hasPreviousPage : pageNumber > 1
        }
    }

    res.status(200).json(response)
})



