import { serve } from "@upstash/workflow/express";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminderTemplate } from "../utils/emailTemplate.js";

export const subscriptionReminderWorkflow = serve(async (context) => {
    const { subscription } = context.requestPayload;

    // 🔹 Reminder time: For production, schedule before renewalDate (e.g., 3 days earlier)
    // Here for testing, we use +10 seconds
    const reminderDate = new Date();
    reminderDate.setSeconds(reminderDate.getSeconds() + 10);

    console.log("⏳ Sleeping until:", reminderDate);
    await context.sleepUntil(reminderDate);

    console.log("🔔 SUBSCRIPTION REMINDER TRIGGERED for", subscription.name);

    try {
        await sendEmail({
            to: subscription.userEmail,
            subject: `Reminder: ${subscription.name} subscription renewal`,
            text: `Hi! Your ${subscription.name} subscription will renew on ${new Date(
                subscription.renewalDate
            ).toLocaleDateString()}.`,
            html: subscriptionReminderTemplate({
                name: subscription.name,
                renewalDate: subscription.renewalDate,
            }),
        });
        console.log("📧 Email reminder sent to", subscription.userEmail);
    } catch (error) {
        console.error("❌ Failed to send email:", error);
    }

    return {
        success: true,
        message: `Reminder triggered for ${subscription.name}`,
    };
});
