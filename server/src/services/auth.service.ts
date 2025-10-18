import config from "#config/config.js";
import AuthenticationError from "#errors/AuthenticationError.js";
import User from "#models/user.model.js";
import { IUser } from "#models/user.model.js";
import { forgotPasswordMessgae , sendEmail} from "#utils/utils.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import jwt from "jsonwebtoken";

class AuthService {
    public async forgotPassword(email: string) {
    if (!email) {
        throw new AuthenticationError({
        code: "ERR_AUTH",
        message: "Please enter your email",
        statusCode: 400,
        });
    }

    const existingUser = await User.findOne({ email });

    // Always return a generic response (don't leak if email exists)
    if (!existingUser) {
        return { sent: true }; // Pretend email was sent
    }

    // Generate reset token & save hashed token
    const resetToken = existingUser.getResetPassword();
    await existingUser.save({validateBeforeSave : false})

    // Reset URL
    const resetUrl = `${config.FRONTEND_URL}/reset-password/${existingUser._id as string}/${resetToken}`;
    const message = forgotPasswordMessgae(resetUrl, existingUser.name);

    // Send email
    await sendEmail({
        to: existingUser.email,
        subject: "Password Reset Request",
        text: message,
    });

    return { sent: true };
    }

    public async getCurrentUser(userId : string) {
        const user = await User.findById(userId).select("-password -resetPasswordToken -resetPasswordExpire -__v");
        if (!user) {
            throw new AuthenticationError({
                code: "ERR_AUTH",
                message: "User not found",
                statusCode: 404,
            });
        }
        console.log(user, "USER")
        return user;
    }

    public async login (userData : IUser) {
        //1. business logic: check user already exist or not
        const existingUser = await User.findOne({ email: userData.email }).select("+password");
        console.log(existingUser, "exist")

        if (!existingUser) {
            const error = new AuthenticationError({
                code: "ERR_AUTH",
                message: "User does not exist",
                statusCode: 404
            });
            throw error
        }

        // 2. Data manipulation: compare passwords
        const isPasswordMatch = await bcrypt.compare(userData.password, existingUser.password);

        if(!isPasswordMatch) {
            const error = new AuthenticationError({
                code: "ERR_AUTH",
                message: "Invalid credentials or Wrong Password",
                statusCode: 401
            });
            throw error
        }

        // 3. Other actions: Generate JWT token
        const payload = {userId : existingUser._id , email : existingUser.email , role : existingUser.role};
        const token = jwt.sign(payload, config.appSecret as unknown as string, {expiresIn: '1d'});

        return { token , userId: existingUser._id , role : existingUser.role};
    }

    public async register (userData : IUser) {
        //1. business logic: check user already exist or not
        const existingUser = await User.findOne({ email: userData.email })

        if (existingUser) {
            const error = new AuthenticationError({
                code: "ERR_AUTH",
                message: "User already exists",
                statusCode: 409
            });
            throw error
        }

        // 2. Data manipulation: create user
        const newUser = await User.create(userData);

        // 3. Other actions: Maybe send a welcome email via another service
        // await emailService.sendWelcomeEmail(newUser.email);
        return newUser
    }

    public async resetPassword( newPassword : string , resetToken : string) {
        if(!newPassword || !resetToken) {
           throw new AuthenticationError({
                code : "ERR_AUTH",
                message : "Invalid Request",
                statusCode: 400,
            })
        }

        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

 
        const user = await User.findOne({
                resetPasswordToken: resetPasswordToken,
                resetPasswordExpire: { $gt: new Date() }, // check if not expired
        })

        if (!user) {
            throw new AuthenticationError({
            code: "ERR_AUTH",
            message: "Invalid or expired token",
            statusCode: 400,
        });
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire  = undefined;
        await user.save();

        return { message: "Password reset successful" };
    }
}

export default new AuthService();