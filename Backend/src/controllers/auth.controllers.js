import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.js";
import { UnRegisteredUser } from "../models/unRegisteredUser.js";
import { generateJWTToken_email, generateJWTToken_username } from "../utils/generateJWTToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Use environment variable for callback URL
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            done(null, profile); // Just pass the profile to the next middleware
        }
    )
);

// 🔐 Step 1: Start OAuth flow
export const googleAuthHandler = passport.authenticate("google", {
    scope: ["profile", "email"],
});

// 🔐 Step 2: Handle callback from Google
export const googleAuthCallback = passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
});

// ✅ Step 3: Process the user data and redirect accordingly
export const handleGoogleLoginCallback = asyncHandler(async (req, res) => {
    const { email, name, picture } = req.user._json;

    // ✅ Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const jwtToken = generateJWTToken_username(existingUser);
        const expiryDate = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

        res.cookie("accessToken", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: expiryDate,
        });

        return res.redirect(`${process.env.FRONTEND_URL}/discover`);
    }

    // ✅ If new, create unregistered user
    let unregisteredUser = await UnRegisteredUser.findOne({ email });
    if (!unregisteredUser) {
        unregisteredUser = await UnRegisteredUser.create({ name, email, picture });
    }

    const jwtToken = generateJWTToken_email(unregisteredUser);
    const expiryDate = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    res.cookie("accessTokenRegistration", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: expiryDate,
    });

    return res.redirect(`${process.env.FRONTEND_URL}/register`);
});

// ✅ Logout
export const handleLogout = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("accessTokenRegistration");
    return res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
};
