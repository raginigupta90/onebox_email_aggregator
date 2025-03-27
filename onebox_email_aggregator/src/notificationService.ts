


import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

console.log("📢 Notification Service Started...");

export const sendSlackNotification = async (message: string) => {
    console.log(" Sending Slack Notification:", message);
    await axios.post(process.env.SLACK_WEBHOOK_URL!, { text: message });
};

export const triggerWebhook = async (emailId: string) => {
    console.log("🔗 Triggering Webhook for:", emailId);
    await axios.post('https://webhook.site/your-webhook-url', { emailId });
};
