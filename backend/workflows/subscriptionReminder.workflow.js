import { serve } from "@upstash/workflow/express";
import { sendEmail } from "../utils/sendEmail.js";
import { subscriptionReminderTemplate } from "../utils/emailTemplate.js";

export const subscriptionReminderWorkflow = serve(async (context) => {
  const { subscription } = context.requestPayload;

  if (!subscription || !subscription.userEmail) {
    return {
      success: false,
      message: "Invalid subscription data",
    };
  }

  try {
    // Send email
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

    return {
      success: true,
      message: `Reminder triggered for ${subscription.name}`,
    };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return {
      success: false,
      message: "Failed to send email",
      error: error.message,
    };
  }
});
