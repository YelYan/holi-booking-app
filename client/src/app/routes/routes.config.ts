import authRoutes from "./auth/authRoutes";
import allPrivateRoutes from "./private/allPrivateRoutes";
import adminRoutes from "./admin/adminRoutes";
import searchRoutes from "./search/searchRoutes";
import detailsRoutes from "./details/DetailsRoutes";


export const publicRoutes = [...authRoutes, ...searchRoutes, ...detailsRoutes];
export const privateRoutes = [...allPrivateRoutes];
export const allAdminRoutes = [...adminRoutes];