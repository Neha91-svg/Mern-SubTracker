import express from "express";
import qstashClient from "../config/qstashClient.js";

const router = express.Router();

// Trigger subscription reminder workflow
router.post("/subscription-reminder", async (req, res) => {
  const { subscription } = req.body;

  if (!subscription) {
    return res.status(400).json({ success: false, message: "Subscription missing" });
  }

  try {
    await qstashClient.publish({
      url: `${process.env.BASE_URL}/api/workflows/subscription-reminder-callback`,
      body: { subscription },
      schedule: new Date(Date.now() + 10 * 1000) // 10 seconds later

    });

    res.json({ success: true, message: "Reminder workflow scheduled via QStash" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to schedule workflow" });
  }
});

export default router;
