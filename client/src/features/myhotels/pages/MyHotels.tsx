import { useMyHotels } from "@/services/hotels/hotels-api-client";
import { LoadingSpinner } from "@/shared/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { HotelFormDataT } from "@/types/hotel.type";
import { DeleteBtn } from "../components/DeleteBtn";
import {
  Building2,
  ChartBarStacked,
  CircleDollarSign,
  MapPin,
  Star,
  Users,
} from "lucide-react";

const MyHotels = () => {
  const { data, isLoading, isError } = useMyHotels();

  if (isLoading) return <LoadingSpinner />;

  if (isError || !data) return <p>No Hotel found</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-blue-700">My Hotels</h1>
        <Link to={"/add-hotel"}>
          <Button className="bg-blue-700 text-white cursor-pointer border border-blue-700 hover:bg-transparent hover:text-blue-700">
            Add Hotel
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {data?.hotels.map((hotel: HotelFormDataT, index: number) => (
          <Card className="flex" key={index}>
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle>{hotel.name}</CardTitle>
                <CardDescription>{hotel.description}</CardDescription>
              </div>
              <div>
                <DeleteBtn hotelId={hotel._id} />
              </div>
            </CardHeader>
            <CardContent className="flex justify-between items-end">
              <div className="flex items-start gap-4">
                <div className="space-y-2">
                  <p className="flex gap-2 items-center">
                    <Building2 size={"15px"} />
                    {hotel.city}
                  </p>
                  <p className="flex gap-2 items-center">
                    <MapPin size={"15px"} /> {hotel.country}
                  </p>
                  <p className="flex gap-2 items-center">
                    <ChartBarStacked size={"15px"} /> {hotel.type}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex gap-2 items-center">
                    <CircleDollarSign size={"15px"} /> {hotel.pricePerNight}
                  </p>
                  <p className="flex gap-2 items-center">
                    <Users size={"15px"} /> {hotel.adultCount} adults &{" "}
                    {hotel.childCount}
                  </p>
                  <p className="flex gap-2 items-center">
                    <Star /> {hotel.starRating} star Rating
                  </p>
                </div>
              </div>

              <Link to={`/edit-hotel/${hotel._id}`}>
                <Button className="cursor-pointer border border-blue-700 bg-blue-700 text-white hover:bg-transparent hover:text-blue-700">
                  View details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
