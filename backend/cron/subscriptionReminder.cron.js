import cron from "node-cron";
import Subscription from "../models/subscriptionModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminderTemplate } from "../templates/subscriptionReminderTemplate.js";

cron.schedule("*/5 * * * *", async () => {
    console.log("🔔 Cron running...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const subs = await Subscription.find({
        renewalDate: { $lte: today },
        status: "active",
    }).populate("user");

    for (const sub of subs) {
        await sendEmail({
            to: sub.user.email,
            subject: "Subscription Renewal Reminder",
            html: subscriptionReminderTemplate({
                name: sub.name,
                renewalDate: sub.renewalDate,
            }),
        });

        console.log("📧 Email sent to:", sub.user.email);
    }
});
