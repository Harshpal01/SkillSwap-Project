import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

const app = express();

// Middleware: CORS
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://skill-swap-project-k8cs.vercel.app"
        ],
        credentials: true,
    })
);

// Middleware: Body parsing and cookies
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Static assets
app.use(express.static("public"));

// Initialize Passport (Google OAuth)
app.use(passport.initialize());

// Routes
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";
import requestRouter from "./routes/request.routes.js";
import reportRouter from "./routes/report.routes.js";
import ratingRouter from "./routes/rating.routes.js";

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/request", requestRouter);
app.use("/report", reportRouter);
app.use("/rating", ratingRouter);

// Health check or root test route
app.get("/", (req, res) => {
    res.send("SkillSwap Backend API is running 🚀");
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        message: "API route not found",
    });
});

export { app };
