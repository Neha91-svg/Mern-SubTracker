import { Resend } from "resend";

export const sendEmail = async ({ to, subject, html }) => {
  // ✅ Initialize Resend inside the function
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const response = await resend.emails.send({
      from: "Subscription Tracker <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully, ID:", response?.data?.id || "No ID returned");
    return response;
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};
