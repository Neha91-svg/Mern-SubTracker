import Subscription from "../models/Subscription.js";
import qstashClient from "../config/upstash.js";
import axios from "axios";

export const createSubscription = async (req, res, next) => {
  try {
    const { name, price, currency, frequency, category, paymentMethod, startDate } = req.body;

    if (!name || !price || !frequency || !startDate) {
      res.status(400);
      throw new Error("Required fields missing");
    }

    // 🔹 Calculate renewalDate
    const renewalDate = new Date(startDate);
    if (frequency === "monthly") renewalDate.setMonth(renewalDate.getMonth() + 1);
    else if (frequency === "yearly") renewalDate.setFullYear(renewalDate.getFullYear() + 1);

    // 💾 Save subscription
    const subscription = await Subscription.create({
      user: req.user._id,
      userEmail: req.user.email,
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      startDate,
      renewalDate,
      workflowEnabled: true,
    });

    // 🔔 Trigger QStash workflow
    await qstashClient.publishJSON({
      url: `${process.env.BASE_URL}/api/workflows/subscription-reminder`,
      body: { subscription },
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully and reminder scheduled",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id }).sort({ renewalDate: 1 });
    res.status(200).json({ success: true, count: subscriptions.length, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({ _id: req.params.id, user: req.user._id });
    if (!subscription) {
      res.status(404);
      throw new Error("Subscription not found");
    }
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({ _id: req.params.id, user: req.user._id });
    if (!subscription) {
      res.status(404);
      throw new Error("Subscription not found");
    }

    Object.assign(subscription, req.body);
    const updatedSubscription = await subscription.save();

    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({ _id: req.params.id, user: req.user._id });
    if (!subscription) {
      res.status(404);
      throw new Error("Subscription not found");
    }
    await subscription.deleteOne();
    res.status(200).json({ success: true, message: "Subscription deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({ _id: req.params.id, user: req.user._id });
    if (!subscription) {
      res.status(404);
      throw new Error("Subscription not found");
    }
    subscription.status = "cancelled";
    await subscription.save();
    res.status(200).json({ success: true, message: "Subscription cancelled successfully", data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const subscriptions = await Subscription.find({
      user: req.user._id,
      status: "active",
      renewalDate: { $gte: today, $lte: next7Days },
    }).sort({ renewalDate: 1 });

    res.status(200).json({ success: true, count: subscriptions.length, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
