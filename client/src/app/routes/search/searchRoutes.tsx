import type { RoutesT } from "../../../types/route.type";
import { LazySearch } from "../lazy";

const searchRoutes: RoutesT = [
  {
    key: "search",
    path: "/search",
    element: <LazySearch />,
  },
];

export default searchRoutes;
