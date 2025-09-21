import authenticateUser from "#middleware/authenticate-user.js";
import authRoutes from '#routes/auth.route.js';
import myHotelRoutes from "#routes/my-hotel.route.js";
import hotelsRoutes from "#routes/search-hotel.route.js"
import express , {Request , Response} from 'express';
import path from "path";

const router = express.Router();

router.get("/test" , (req, res) => {
    res.send("hello world")
})

router.use("/auth", authRoutes);
router.use("/my-hotels", authenticateUser,  myHotelRoutes);
router.use("/hotels",  hotelsRoutes);

// router.get("*" , (req : Request, res : Response) => {
//     res.sendFile(path.join(__dirname, "../../client/dist/index.html"))
// })

export default router;