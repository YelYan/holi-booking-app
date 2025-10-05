import type { RoutesT } from "@/types/route.type";
import { LazyMyBookings } from "../lazy";

const myBookingRoutes: RoutesT = [
  {
    key: "my-bookings",
    path: "/hotel/:hotelId/booking",
    element: <LazyMyBookings />,
  },
];

export default myBookingRoutes;
