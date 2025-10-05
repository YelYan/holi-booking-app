import * as authController from "#controllers/auth.controller.js";
import { forgotPassSchemaValidate,  loginSchemaValidate , resetPasswordSchemaValidate, userSchemaValidate  } from "#data/request.schemas.js";
import authenticateUser from "#middleware/authenticate-user.js";
import validateRequest from "#middleware/validate.request.js";
import {Router} from "express";

const router = Router();

router.post("/login", validateRequest(loginSchemaValidate), authController.login);
router.post("/register", validateRequest(userSchemaValidate), authController.register);
router.post("/forgot-password", validateRequest(forgotPassSchemaValidate), authController.forgotPassword);
router.post("/reset-password", validateRequest(resetPasswordSchemaValidate), authController.resetPassword);
router.post("/logout", authController.logout);
router.get("/validate-token", authenticateUser , authController.verifyToken);
router.get("/me", authenticateUser , authController.fetchCurrentUser);

export default router;
