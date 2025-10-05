import { useMyHotelById } from "@/services/hotels/hotels-api-client";
import { useParams } from "react-router";
import { LoadingSpinner } from "@/shared/common";
import { Star } from "lucide-react";
import GuestInfoForm from "../components/GuestInfoForm";

const DetailsHotel = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data, isLoading, isSuccess } = useMyHotelById(hotelId as string);

  if (isLoading) return <LoadingSpinner />;

  if (!data) return <div>No data found</div>;
  return (
    <>
      {isSuccess && (
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span>
              {Array.from({ length: data?.hotel.starRating }, (_, i) => (
                <Star key={i} className="inline-block text-yellow-500" />
              ))}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-black">{data?.hotel?.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.hotel?.imageUrls.map((url: string, index: number) => (
              <div className="h-[300px]" key={index}>
                <img
                  src={url}
                  alt="hotel details image"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.hotel.facilities.map((facility: string, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-2 border border-slate-500 rounded-sm p-3 bg-slate-100"
              >
                <span className="font-semibold">{facility}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="">{data?.hotel?.description}</div>

            <div className="h-fit">
              <GuestInfoForm
                pricePerNight={data?.hotel.pricePerNight}
                hotelId={data?.hotel._id}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsHotel;
