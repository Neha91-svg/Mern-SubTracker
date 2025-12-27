import dotenv from "dotenv";
dotenv.config(); // Make sure env variables are loaded

import nodemailer from "nodemailer";

// Check if credentials are loaded
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  throw new Error("❌ SMTP credentials missing at runtime");
}

// Create transporter
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
