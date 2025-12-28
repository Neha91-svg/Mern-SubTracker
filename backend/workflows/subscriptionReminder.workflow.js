import express from "express";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// QStash will call this endpoint
router.post("/subscription-reminder-callback", async (req, res) => {
  try {
    const { subscription } = req.body;

    if (!subscription || !subscription.userEmail) {
      return res.status(400).json({ success: false, message: "Subscription data missing" });
    }

    // Send email
    await sendEmail({
      to: subscription.userEmail,
      subject: `Reminder: ${subscription.name} Subscription`,
      text: `Your ${subscription.name} subscription renews on ${subscription.renewalDate}.`
    });

    console.log("Email sent to:", subscription.userEmail);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
