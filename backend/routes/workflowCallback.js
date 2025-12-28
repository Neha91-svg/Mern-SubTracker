import express from "express";
import { sendEmail } from "../utils/sendEmail.js";   // your email function
import { workflow } from "@upstash/qstash";          // main package

const router = express.Router();

// QStash will call this endpoint
router.post("/subscription-reminder-callback", async (req, res) => {
  try {
    // Wrap workflow manually
    await workflow(async () => {
      const subscription = req.body.subscription;

      if (!subscription || !subscription.userEmail) {
        throw new Error("Subscription data missing");
      }

      // Send email
      await sendEmail({
        to: subscription.userEmail,
        subject: `Reminder: ${subscription.name} Subscription`,
        text: `Your ${subscription.name} subscription renews on ${subscription.renewalDate}.`
      });

      console.log("Email sent to:", subscription.userEmail);
    })();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error in workflow:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
