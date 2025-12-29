import express from "express";
import { subscriptionReminderWorkflow } from "../workflows/subscriptionReminder.workflow.js";

const router = express.Router();

// 🔥 QStash will hit THIS route
router.post(
  "/subscription-reminder",
  subscriptionReminderWorkflow
);

export default router;
