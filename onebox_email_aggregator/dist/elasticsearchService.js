"use strict";
// import { Client } from '@elastic/elasticsearch';
// import dotenv from 'dotenv';
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const client = new Client({ node: process.env.ELASTICSEARCH_HOST });
// export const storeEmail = async (emailData: any) => {
//     await client.index({
//         index: 'emails',
//         body: emailData
//     });
// };
const elasticSearch_1 = require("./elasticSearch");
const testEmail = {
    sender: "test@example.com",
    recipient: "user@example.com",
    subject: "Test Email",
    body: "This is a test email.",
    timestamp: new Date().toISOString()
};
// Call the function to store email
(0, elasticSearch_1.storeEmail)(testEmail)
    .then(() => console.log("🎉 Email stored successfully!"))
    .catch((error) => console.error("❌ Error storing email:", error));
