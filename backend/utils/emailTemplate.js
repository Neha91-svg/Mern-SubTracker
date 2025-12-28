// HTML email template for subscription reminder
export const subscriptionReminderTemplate = ({ name, renewalDate }) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Renewal Reminder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        h2 {
            color: #2c3e50;
            text-align: center;
        }
        p {
            margin-bottom: 15px;
        }
        hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            color: gray;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Subscription Renewal Reminder</h2>
        <p>Hi there,</p>
        <p>This is a friendly reminder that your subscription for <strong>${name}</strong> will renew on <strong>${new Date(renewalDate).toDateString()}</strong>.</p>
        <p>Please make sure your payment method is up to date to avoid any interruptions.</p>
        <p>Thank you for using our service!</p>
        <hr />
        <p class="footer">
            If you do not want to receive these reminders, please manage your subscription settings.
        </p>
    </div>
</body>
</html>
    `;
};
