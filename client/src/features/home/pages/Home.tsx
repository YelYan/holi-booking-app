import { useLastUpdatedHotel } from "@/services/hotels/hotels-api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";
import type { HotelType } from "@/types/hotel.type";

const Home = () => {
  const { data: hotels, isLoading } = useLastUpdatedHotel();

  console.log(hotels);

  if (!hotels?.data || hotels?.data?.length === 0) {
    return <p>No Hotels found!</p>;
  }

  if (isLoading) return "Loading...";

  const topRowHotels = hotels?.data?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.data?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel: HotelType) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel: HotelType) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
