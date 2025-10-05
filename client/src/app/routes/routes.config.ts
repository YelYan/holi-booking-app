import authRoutes from "./auth/authRoutes";
import allPrivateRoutes from "./private/allPrivateRoutes";
import adminRoutes from "./admin/adminRoutes";
import searchRoutes from "./search/searchRoutes";
import detailsRoutes from "./details/DetailsRoutes";
import myBookingRoutes from "./booking/BookingRoutes";

export const publicRoutes = [...authRoutes, ...searchRoutes, ...detailsRoutes];
export const privateRoutes = [...allPrivateRoutes, ...myBookingRoutes];
export const allAdminRoutes = [...adminRoutes];