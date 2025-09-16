import apiRouter from "#api/index.js";
import config from "#config/config.js";
import connectDb from "#config/connectDb.js";
import errorHandler from "#middleware/errHandler.js";
import morganMiddleware from "#middleware/morgan-middleware.js";
import { loadEnv } from "#utils/loadEnv.js";
import {v2 as cloudinary} from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { Request, Response  } from "express";
const app = express();

//load env
loadEnv();

// Connect to database
await connectDb();

//  cloudinary config
cloudinary.config({
  cloud_name : config.CLOUDINARY_CLOUD_NAME,
  api_key : config.CLOUDINARY_API_KEY,
  api_secret : config.CLOUDINARY_API_SECRET
})

// Middleware
app.disable("x-powered-by");
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: config.FRONTEND_URL,
}));
app.use(cookieParser());

app.get("/" , (req : Request,res : Response) => {
  return res.status(200).json({
    environment : config.env,
    ok : true,
  })
})

 // Mount the entire API router under the '/api' path
app.use("/api/v1" , apiRouter)

// error middlewares must be defined last to catch api routes errors
app.use(errorHandler)

// Server runs
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port.toString()}`);
});
