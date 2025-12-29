import express from "express";
import { subscriptionReminderWorkflow } from "../workflows/subscriptionReminder.workflow.js";

const router = express.Router();

router.post("/subscription-reminder", (req, res, next) => {
  console.log("➡️ Workflow route HIT (before serve)");
  next();
}, subscriptionReminderWorkflow);

export default router;
