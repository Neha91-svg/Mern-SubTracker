import { transporter } from "../config/nodemailer.js";

export const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: `"Subscription Tracker" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            // html: optional HTML content
        });
        console.log("Email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending email: ", error);
        throw new Error(error.message);
    }
};
