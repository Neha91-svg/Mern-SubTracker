import { serve } from "@upstash/workflow/express";
import { log } from "@upstash/workflow"; // ✅ workflow-safe logging
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminderTemplate } from "../utils/emailTemplate.js";

export const subscriptionReminderWorkflow = serve(async (context) => {
  await log("🔥 WORKFLOW HIT (INSIDE SERVE)");
  await log("📩 Payload: " + JSON.stringify(context.requestPayload));

  const { subscription } = context.requestPayload;

  if (!subscription || !subscription.userEmail) {
    await log("❌ Invalid payload in workflow");
    return { success: false };
  }

  try {
    await log("📧 Sending email to " + subscription.userEmail);

    await sendEmail({
      to: subscription.userEmail,
      subject: `Reminder: ${subscription.name}`,
      html: subscriptionReminderTemplate({
        name: subscription.name,
        renewalDate: subscription.renewalDate,
      }),
    });

    await log("✅ Email sent successfully");
    return { success: true };
  } catch (err) {
    await log("❌ Email failed inside workflow: " + err.message);
    throw err;
  }
});
