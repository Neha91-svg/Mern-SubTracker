// cron/subscriptionReminder.cron.js

import cron from "node-cron";
import Subscription from "../models/Subscription.js";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminderTemplate } from "../templates/subscriptionReminderTemplate.js";

cron.schedule("*/5 * * * *", async () => {
  console.log("🔔 Cron running...");

  const now = new Date();
  console.log("⏰ Current time:", now);

  const subs = await Subscription.find({
    renewalDate: { $lte: now },
    status: "active",
  }).populate("user");

  console.log("📦 Subscriptions found:", subs.length);

  for (const sub of subs) {
    if (!sub.user?.email) {
      console.log("❌ User email missing for subscription:", sub._id);
      continue;
    }

    try {
      console.log("📧 Sending email to:", sub.user.email);

      await sendEmail({
        to: sub.user.email,
        subject: `Reminder: ${sub.name} Subscription`,
        html: subscriptionReminderTemplate({
          name: sub.name,
          renewalDate: sub.renewalDate,
        }),
      });

      console.log("✅ Email sent to:", sub.user.email);

      // 🔒 Stop duplicate reminders
      sub.status = "cancelled";
      await sub.save();
    } catch (err) {
      console.error("❌ Failed to send email:", err.message);
    }
  }
});
