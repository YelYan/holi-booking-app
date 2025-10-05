import Hotel , {HotelSearchResponse}from "#models/hotel.model.js";
// import searchHotelsService from "#services/search-hotels.service.js";
import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler";

export const searchHotels = asyncErrorWrapper(async (req :Request, res : Response) => {

    const query: Record<string, unknown> = constructSearchQuery(req.query);
    console.log(query);

    let sortOptions = {};
    switch (req.query.sortOption) {
    case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
    case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    case "starRating":
        sortOptions = { starRating: -1 };
        break;


    }
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page as string) || 1

    const skip = (pageNumber- 1) * pageSize;

    const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize)

    const total = await Hotel.countDocuments(query);

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

const constructSearchQuery = (queryParams: Record<string, unknown>): Record<string, unknown> => {
  const constructedQuery: Record<string, unknown> = {};

  
  if (queryParams.destination && typeof queryParams.destination === "string") {
    console.log(queryParams.destination , "destination");
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount as string),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount as string ),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars as string);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice as string),
    };
  }

  return constructedQuery;
};



