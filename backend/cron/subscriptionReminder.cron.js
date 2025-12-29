import cron from "node-cron";
import Subscription from "../models/Subscription.js";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminderTemplate } from "../templates/subscriptionReminderTemplate.js";

// ⏰ runs every 5 minutes (for testing)
cron.schedule("*/5 * * * *", async () => {
  console.log("🔔 Cron running...");

  try {
    const now = new Date();

    const subs = await Subscription.find({
      renewalDate: { $lte: now },
      status: "active",
      reminderSent: { $ne: true }, // 🔒 avoid duplicates
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

      // ✅ mark reminder sent
      sub.reminderSent = true;
      await sub.save();
    }
  } catch (err) {
    console.error("❌ Cron error:", err.message);
  }
});
