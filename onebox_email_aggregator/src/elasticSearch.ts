import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

// Create Elasticsearch Client
const client = new Client({ node: process.env.ELASTICSEARCH_HOST });

// Function to Store Email in Elasticsearch
export const storeEmail = async (emailData: any) => {
    console.log("📨 Storing email in Elasticsearch:", emailData);

    try {
        const response = await client.index({
            index: 'emails',
            body: emailData
        });

        console.log("✅ Elasticsearch Response:", response);
    } catch (error) {
        console.error("❌ Error storing email:", error);
    }
};
