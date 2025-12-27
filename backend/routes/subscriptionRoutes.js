import express from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
  getUpcomingRenewals,
} from "../controllers/subscriptionController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

// existing routes
router.post("/", protect, createSubscription);
router.get("/", protect, getAllSubscriptions);
router.get("/:id", protect, getSubscriptionById);
router.put("/:id", protect, updateSubscription);
router.delete("/:id", protect, deleteSubscription);

// 🔴 Cancel subscription
router.put("/:id/cancel", protect, cancelSubscription);

// ⏰ Get upcoming renewals
router.get("/upcoming/renewals", protect, getUpcomingRenewals);

export default router;
