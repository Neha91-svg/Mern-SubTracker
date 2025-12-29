import { serve } from "@upstash/workflow/express";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminderTemplate } from "../utils/emailTemplate.js";

export const subscriptionReminderWorkflow = serve(async (context) => {
 
  console.log("🔥 WORKFLOW HIT");
  console.log("📩 Payload: " + JSON.stringify(context.requestPayload));

  const { subscription } = context.requestPayload;

  if (!subscription || !subscription.userEmail) {
    console.log("❌ Invalid payload in workflow");
    return { success: false };
  }

  try {
    console.log("📧 Sending email to " + subscription.userEmail);

    await sendEmail({
      to: subscription.userEmail,
      subject: `Reminder: ${subscription.name}`,
      html: subscriptionReminderTemplate({
        name: subscription.name,
        renewalDate: subscription.renewalDate,
      }),
    });

    console.log("✅ Email sent successfully");
    return { success: true };
  } catch (err) {
    console.log("❌ Email failed inside workflow: " + err.message);
    return { success: false, error: err.message };
  }
});
