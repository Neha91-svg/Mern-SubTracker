import express from "express";
import { subscriptionReminderWorkflow } from "../workflows/subscriptionReminder.workflow.js";

const router = express.Router();

// Upstash Workflow endpoint
router.post(
  "/subscription-reminder",
  subscriptionReminderWorkflow
);

export default router;
