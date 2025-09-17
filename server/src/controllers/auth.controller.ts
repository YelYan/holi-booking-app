import { IUser } from "#models/user.model.js";
import authService from "#services/auth.service.js";
import { Request, Response } from "express";
import asyncErrorWrapper from "express-async-handler";

export const login = asyncErrorWrapper(async (req : Request, res : Response) => {
    const userData = req.body as IUser;
    const result = await authService.login(userData);
    const cookieOptions = {
        httpOnly: true, // Cookie accessible only by the web server
        secure: process.env.NODE_ENV === 'development', // Set to true in production
        maxAge: 86400000, // 1 day
        // sameSite: true // Helps protect against CSRF attacks
    }

    res.cookie("token", result.token , cookieOptions);
    res.status(200).json({success : true, userId: result.userId , message : "Logged in successfully" });
});

export const register = asyncErrorWrapper(async (req :Request, res : Response) => {
    const userData = req.body as IUser;
    const newUser = await authService.register(userData);
    res.status(201).json({ success : true, user : newUser , message : "Register successfully"});
})

export const logout = asyncErrorWrapper((req, res) => {
    res.cookie("token", "", { maxAge: 0 , expires: new Date(0)});
    res.status(200).json({ success : true, message: "Logged out successfully" });
});

export const forgotPassword = asyncErrorWrapper(async (req : Request, res : Response) => {
    const {email} = req.body as {email : string};
    await authService.forgotPassword(email);
    res.status(200).json({
        success: true,
        message: "If your email exists in our system, you'll receive a reset link shortly",
    });
})

export const resetPassword = asyncErrorWrapper(async (req : Request, res : Response) => {
    const {password , resetToken} = req.body as {password : string , resetToken : string};
    const result = await authService.resetPassword(password , resetToken);
    res.status(200).json({
        success: true,
        message: result.message,
    });
})

export const verifyToken = asyncErrorWrapper((req : Request , res : Response) => {
    const {userId , email , role} = req.auth.payload as Record<"email" | "role"  | "userId" , string>
    res.json({ userId , email , role })  
})