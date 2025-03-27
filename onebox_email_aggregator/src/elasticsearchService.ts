import { storeEmail } from './elasticSearch';

const testEmail = {
    sender: "test@example.com",
    recipient: "user@example.com",
    subject: "Test Email",
    body: "This is a test email.",
    timestamp: new Date().toISOString()
};

// Call the function to store email
storeEmail(testEmail)
    .then(() => console.log("🎉 Email stored successfully!"))
    .catch((error) => console.error("❌ Error storing email:", error));

