import express from "express";
import { workflow } from "@upstash/qstash/express"; // QStash helper
import { sendEmail } from "../utils/sendEmail.js";   // your email function

const router = express.Router();

// QStash will call this endpoint
router.post(
  "/subscription-reminder-callback",
  workflow(async (req) => {
    try {
      const subscription = req.body.subscription;

      if (!subscription || !subscription.userEmail) {
        return { success: false, message: "Subscription data missing" };
      }

      // Send email
      await sendEmail({
        to: subscription.userEmail,
        subject: `Reminder: ${subscription.name} Subscription`,
        text: `Your ${subscription.name} subscription renews on ${subscription.renewalDate}.`
      });

      console.log("Email sent to:", subscription.userEmail);

      return { success: true };
    } catch (err) {
      console.error("Error sending email:", err);
      return { success: false, message: err.message };
    }
  })
);

export default router;
