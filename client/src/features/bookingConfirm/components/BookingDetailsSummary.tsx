import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HotelType } from "@/types/hotel.type";
import moment from "moment";

type Props = {
  checkIn: string | null;
  checkOut: string | null;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  // Format dates for display
  const formattedCheckIn = checkIn
    ? moment(checkIn, "YYYY-MM-DD").format("MMM DD, YYYY")
    : "Not selected";

  const formattedCheckOut = checkOut
    ? moment(checkOut, "YYYY-MM-DD").format("MMM DD, YYYY")
    : "Not selected";
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Booking Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-b py-4">
          Location:
          <div className="font-bold">
            {hotel.name}, {hotel.city}, {hotel.country}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 py-4">
          <div>
            Check-in
            <div className="font-bold"> {formattedCheckIn}</div>
          </div>
          <div>
            Check-out
            <div className="font-bold"> {formattedCheckOut}</div>
          </div>
        </div>

        <div className="border-t border-b py-4">
          Total length of stay:
          <div className="font-bold">{numberOfNights} nights</div>
        </div>

        <div>
          Guests{" "}
          <div className="font-bold">
            {adultCount} adults & {childCount} children
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingDetailsSummary;
