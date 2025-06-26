// src/routes/auth.routes.js

import { Router } from "express";
import passport from "passport";
import {
    handleGoogleLoginCallback,
    handleLogout,
} from "../controllers/auth.controllers.js";

const router = Router();

// Step 1: Start Google OAuth process
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account", // optional: to always choose account
    })
);

// Step 2: Google redirects back here after user signs in
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login", // or your frontend login page
        session: false, // depends on your setup
    }),
    handleGoogleLoginCallback
);

// Step 3: Logout
router.get("/logout", handleLogout);

export default router;
