import {
  LazyMyHotels,
  LazyMyBookings,
  LazyAddHotels,
  LazyEditHotels,
} from "../lazy";
import type { RoutesT } from "../../../types/route.type";
export const allPrivateRoutes: RoutesT = [
  {
    key: "my-hotels",
    path: "/my-hotels",
    element: <LazyMyHotels />,
  },
  {
    key: "my-bookings",
    path: "/my-bookings",
    element: <LazyMyBookings />,
  },
  {
    key: "add-hotel",
    path: "/add-hotel",
    element: <LazyAddHotels />,
  },
  {
    key: "edit-hotel",
    path: "/edit-hotel/:hotelId",
    element: <LazyEditHotels />,
  },
];

export default allPrivateRoutes;
