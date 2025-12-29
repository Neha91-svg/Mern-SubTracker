import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Subscription Tracker <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("✅ Resend Email sent:", data.id);
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};
