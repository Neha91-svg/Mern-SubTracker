import cron from "node-cron";
import Subscription from "../models/Subscription.js";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminderTemplate } from "../templates/subscriptionReminderTemplate.js";

cron.schedule("*/5 * * * *", async () => {
  console.log("🔔 Cron running...");

  const now = new Date(); // ❗ exact current time

  const subs = await Subscription.find({
    renewalDate: { $lte: now },
    status: "active",
  }).populate("user");

  for (const sub of subs) {
    await sendEmail({
      to: sub.user.email,
      subject: `Reminder: ${sub.name} Subscription`,
      html: subscriptionReminderTemplate({
        name: sub.name,
        renewalDate: sub.renewalDate,
      }),
    });

    console.log("📧 Email sent to:", sub.user.email);

    // 🔒 IMPORTANT: stop duplicate emails
    sub.status = "cancelled"; // OR add reminderSent:true
    await sub.save();
  }
});
