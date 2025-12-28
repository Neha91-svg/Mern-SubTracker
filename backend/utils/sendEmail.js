export const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Subscription Tracker" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
