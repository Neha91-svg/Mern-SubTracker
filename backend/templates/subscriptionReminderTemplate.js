// backend/templates/subscriptionReminderTemplate.js

export const subscriptionReminderTemplate = ({ name, renewalDate }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Subscription Reminder</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:20px;">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:20px; font-family:Arial, sans-serif;">
                
                <tr>
                  <td>
                    <h2 style="color:#2c3e50;">🔔 Subscription Renewal Reminder</h2>
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0; color:#333;">
                    Hi 👋,
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0; color:#333;">
                    This is a reminder that your subscription for 
                    <strong>${name}</strong> will renew on 
                    <strong>${new Date(renewalDate).toDateString()}</strong>.
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0; color:#333;">
                    Please ensure your payment method is up to date to avoid any service interruption.
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 0;">
                    <p style="margin:0;">Thanks for using <strong>Subscription Tracker</strong> ❤️</p>
                  </td>
                </tr>

                <tr>
                  <td style="border-top:1px solid #eee; padding-top:10px; font-size:12px; color:#777;">
                    If you no longer wish to receive these reminders, you can manage your subscriptions in your account.
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
