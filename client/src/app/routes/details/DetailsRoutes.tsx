import type { RoutesT } from "../../../types/route.type";
import { LazyDetailsHotel } from "../lazy";

const detailsRoutes: RoutesT = [
  {
    key: "details",
    path: "/details/:hotelId",
    element: <LazyDetailsHotel />,
  },
];

export default detailsRoutes;
