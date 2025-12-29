import cron from "node-cron";
import Subscription from "../models/Subscription.js";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminderTemplate } from "../templates/subscriptionReminderTemplate.js";

// Runs every day at 10:00 AM server time
cron.schedule("0 10 * * *", async () => {
  console.log("🔔 Cron running...");

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const subs = await Subscription.find({
    renewalDate: { $gte: startOfToday, $lte: endOfToday },
    status: "active",
  }).populate("user");

  console.log("📦 Subscriptions found:", subs.length);

  for (const sub of subs) {
    if (!sub.user || !sub.user.email) continue;

    console.log("📧 Sending email to:", sub.user.email);

    try {
      await sendEmail({
        to: sub.user.email,
        subject: `Reminder: ${sub.name} Subscription`,
        html: subscriptionReminderTemplate({
          name: sub.name,
          renewalDate: sub.renewalDate,
        }),
      });

      console.log("✅ Email sent to:", sub.user.email);

      // Prevent duplicate reminders
      sub.status = "cancelled";
      await sub.save();
    } catch (err) {
      console.error("❌ Failed to send email to", sub.user.email, err);
    }
  }
});
