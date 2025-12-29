import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import "./cron/subscriptionReminder.cron.js";
import reminderRoutes from './routes/reminderRoutes.js';
import workflowRoutes from './routes/workflowRoutes.js';

import errorHandler from './middleware/errorMiddleware.js';

/* 🔥🔥 DEBUG: ENV CHECK (VERY IMPORTANT) */
console.log("====== ENV CHECK ======");
console.log("QSTASH_TOKEN:", !!process.env.QSTASH_TOKEN);
console.log("QSTASH_CURRENT_SIGNING_KEY:", !!process.env.QSTASH_CURRENT_SIGNING_KEY);
console.log("QSTASH_NEXT_SIGNING_KEY:", !!process.env.QSTASH_NEXT_SIGNING_KEY);
console.log("BASE_URL:", process.env.BASE_URL);
console.log("=======================");

const app = express();
connectDB();

app.use(cors({
    origin: [
        "https://mern-sub-tracker.vercel.app",
        "http://localhost:5173",
        "https://mern-sub-tracker-git-main-neha91-svgs-projects.vercel.app"
    ],
    credentials: true,
}));

app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* 🔥 DEBUG: REQUEST LOGGER (TEMP) */
app.use((req, _res, next) => {
    if (req.originalUrl.includes("/api/workflows")) {
        console.log("➡️ Incoming WORKFLOW request:", req.method, req.originalUrl);
        console.log("➡️ Headers:", req.headers);
    }
    next();
});

// routes
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/auth', authRoutes);

// 🔹 reminder trigger API
app.use("/api", reminderRoutes);

// 🔹 workflow (QStash callback)
app.use("/api/workflows", workflowRoutes);

app.get("/health", (req, res) => {
    res.send("API is running");
});

// 404
app.use((req, res, next) => {
    res.status(404);
    next(new Error("Route not found"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
