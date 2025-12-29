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

        if (data?.id) {
            console.log("✅ Email sent successfully, ID:", data.id);
        } else {
            console.log("✅ Email sent successfully (no ID returned)", data);
        }

        return data; // in case you want to use it elsewhere
    } catch (error) {
        console.error("❌ Resend email error:", error);
        throw error;
    }
};
