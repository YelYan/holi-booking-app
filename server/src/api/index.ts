import authenticateUser from "#middleware/authenticate-user.js";
import authRoutes from '#routes/auth.route.js';
import myHotelRoutes from "#routes/my-hotel.route.js";
import userRoutes from '#routes/user.route.js';
import express from 'express';

const router = express.Router();

router.get("/test" , (req, res) => {
    res.send("hello world")
})

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
// router.use("/my-hotels", authenticateUser,  myHotelRoutes);
export default router;