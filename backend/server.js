import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { sendEmail } from "./utils/sendEmail.js";

import subscriptionRoutes from './routes/subscriptionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import arcjetMiddleware from "./middleware/arcjetMiddleware.js";

import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorMiddleware.js';
import workflowRoutes from "./routes/workflowRoutes.js";
import cors from "cors";



connectDB();
app.use(cors({
    origin: [
        "https://mern-sub-tracker.vercel.app",
        "https://mern-sub-tracker-221ap6qbr-neha91-svgs-projects.vercel.app",
        "https://mern-sub-tracker-git-main-neha91-svgs-projects.vercel.app"
    ],
    credentials: true,
}));


app.set("trust proxy", 1);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/workflows', workflowRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

// 404 handler
app.use((req, res, next) => {
    res.status(404);
    next(new Error("Route not found"));
});

app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});