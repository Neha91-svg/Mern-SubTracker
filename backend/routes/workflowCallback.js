import express from "express";
import { subscriptionReminderWorkflow } from "../workflows/subscriptionReminder.workflow.js";

const router = express.Router();

// QStash will call this endpoint
router.post("/subscription-reminder-callback", async (req, res) => {
  try {
    const result = await subscriptionReminderWorkflow(req);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
