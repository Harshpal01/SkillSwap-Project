import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.js";
import { UnRegisteredUser } from "../models/unRegisteredUser.js";
import { generateJWTToken_email, generateJWTToken_username } from "../utils/generateJWTToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);

// Step 1: Redirect to Google
export const googleAuthHandler = passport.authenticate("google", {
    scope: ["profile", "email"],
});

// Step 2: Google callback
export const googleAuthCallback = passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
});

// Step 3: Handle login result
export const handleGoogleLoginCallback = asyncHandler(async (req, res) => {
    const { name, email, picture } = req.user._json;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const jwtToken = generateJWTToken_username(existingUser);
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
        res.cookie("accessToken", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: expiryDate,
        });
        return res.redirect(`${process.env.FRONTEND_URL}/discover`);
    }

    let unregisteredUser = await UnRegisteredUser.findOne({ email });
    if (!unregisteredUser) {
        unregisteredUser = await UnRegisteredUser.create({ name, email, picture });
    }

    const jwtToken = generateJWTToken_email(unregisteredUser);
    const expiryDate = new Date(Date.now() + 30 * 60 * 1000);
    res.cookie("accessTokenRegistration", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: expiryDate,
    });
    return res.redirect(`${process.env.FRONTEND_URL}/register`);
});

// Logout
export const handleLogout = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("accessTokenRegistration");
    return res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
};
