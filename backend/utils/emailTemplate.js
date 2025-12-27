// Simple HTML template for subscription reminder
export const subscriptionReminderTemplate = ({ name, renewalDate }) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #2c3e50;">Subscription Renewal Reminder</h2>
            <p>Hi there,</p>
            <p>This is a friendly reminder that your subscription for <strong>${name}</strong> will renew on <strong>${new Date(renewalDate).toDateString()}</strong>.</p>
            <p>Please make sure your payment method is up to date to avoid any interruptions.</p>
            <p>Thank you for using our service!</p>
            <hr style="border: none; border-top: 1px solid #ddd;" />
            <p style="font-size: 12px; color: gray;">
                If you do not want to receive these reminders, please manage your subscription settings.
            </p>
        </div>
    `;
};
