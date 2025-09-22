import { Card, CardContent } from "@/components/ui/card";
import type { HotelFormDataT } from "@/types/hotel.type";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Star } from "lucide-react";

type SearchResultsCardPropsT = {
  hotel: HotelFormDataT;
};
const SearchResultsCard = ({ hotel }: SearchResultsCardPropsT) => {
  console.log(hotel);
  return (
    <Card key={hotel._id} className="rounded-sm">
      <CardContent className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-2">
        <div className="w-full h-[300px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center rounded"
            alt="hotel image"
          />
        </div>

        <div className="grid grid-rows-[1fr_2fr_1fr]">
          <div className="space-y-1">
            {/* hotel info */}
            <div className="w-full flex items-start justify-between">
              <div className="">
                <div className="flex items-center gap-3">
                  <span className="flex">
                    {Array.from({ length: hotel?.starRating }).map(() => (
                      <Star size={"20px"} className="fill-yellow-400" />
                    ))}
                  </span>
                  <span className="text-sm">{hotel.type}</span>
                </div>

                <Link to={`/details/${hotel._id}`}>
                  <h3 className="cursor-pointer text-xl hover:underline font-bold">
                    {hotel?.name}
                  </h3>
                </Link>
              </div>
              <span className="font-medium">
                {hotel?.pricePerNight} $ per night
              </span>
            </div>
          </div>
          {/* Desc */}
          <div className="">
            <p>{hotel.description}</p>
          </div>

          {/* hotel facilities & details btn */}
          <div className="w-full flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {hotel?.facilities.slice(0, 2).map((facility) => (
                  <span
                    key={facility}
                    className="rounded bg-slate-300 px-2 p-1 font-bold  text-xs whitespace-nowrap"
                  >
                    {facility}
                  </span>
                ))}
              </div>
              <span className="text-sm">
                {hotel.facilities.length > 3 &&
                  `+${hotel.facilities.length - 3} more`}
              </span>
            </div>
            <div className="">
              <Link to={`/detals/${hotel._id}`}>
                <Button className="bg-blue-700 text-white border border-blue-700 hover:bg-transparent hover:text-blue-700 cursor-pointer">
                  View More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResultsCard;
