import authRoutes from "./auth/authRoutes";
import allPrivateRoutes from "./private/allPrivateRoutes";
import adminRoutes from "./admin/adminRoutes";
import searchRoutes from "./search/searchRoutes";

export const publicRoutes = [...authRoutes, ...searchRoutes];
export const privateRoutes = [...allPrivateRoutes];
export const allAdminRoutes = [...adminRoutes];