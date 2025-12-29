export const sendEmail = async ({ to, subject, html }) => {
  // ✅ Initialize inside the function
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: "Subscription Tracker <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully", data?.data?.id || data);
    return data;
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};
