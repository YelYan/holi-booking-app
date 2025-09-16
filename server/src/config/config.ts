import { loadEnv } from '#utils/loadEnv.js';
loadEnv();

const config = {
    debug : process.env.APP_DEBUG === "true",
    env : process.env.NODE_ENV ?? "development",
    mongoUri : process.env.MONGO_URI ?? "",
    port : parseInt(process.env.PORT ?? "9000"),
    level : process.env.LOG_LEVEL ?? "info",
    appSecret: process.env.APP_SECRET ?? "",
    FRONTEND_URL : process.env.FRONTEND_URL ?? "http://localhost:5173",
    
    SMTP_SERVER : process.env.SMTP_SERVER ?? "",
    SMTP_PORT : process.env.SMTP_PORT ?? 587,
    SMTP_USER : process.env.SMTP_USER ?? "",
    SMTP_KEY : process.env.SMTP_KEY ?? "",

    CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME ?? "",
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY ?? "",
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET ?? "",
}

export default  config ;