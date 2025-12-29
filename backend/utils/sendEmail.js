import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import nodemailer from "nodemailer";

// ✅ Check if credentials are loaded
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("❌ SMTP credentials missing at runtime");
}

// ✅ Create transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// ✅ Export sendEmail function
export const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Subscription Tracker" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
