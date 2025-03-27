import { OpenAI } from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

// Ensure required environment variables are available
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const PINECONE_API_KEY = process.env.PINECONE_API_KEY ?? "";
const PINECONE_INDEX = process.env.PINECONE_INDEX ?? "";

if (!OPENAI_API_KEY || !PINECONE_API_KEY || !PINECONE_INDEX) {
    throw new Error("❌ Missing required API keys in environment variables.");
}

// Initialize OpenAI
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Initialize Pinecone Vector DB
const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const pineconeIndex = pinecone.index(PINECONE_INDEX);

/**
 * Store email conversation in the vector database.
 */
export async function storeEmail(emailText: string, responseTemplate: string) {
    const vector = await embedText(emailText);
    await pineconeIndex.upsert([
        { id: `email_${Date.now()}`, values: vector, metadata: { responseTemplate } }
    ]);
}

/**
 * Generate AI reply using OpenAI + RAG
 */
export async function generateReply(emailText: string): Promise<string> {
    // Convert email text to a numerical vector for Pinecone search
    const vector = await embedText(emailText);
    
    // Retrieve similar past responses from Pinecone
    const retrievedData = await pineconeIndex.query({ vector, topK: 1 });

    let context = "You are an AI email assistant.";
    if (retrievedData.matches?.length > 0 && retrievedData.matches[0].metadata?.responseTemplate) {
        context += `\nSimilar past email: "${retrievedData.matches[0].metadata.responseTemplate}"`;
    }

    // Generate reply with OpenAI
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: context },
            { role: "user", content: emailText }
        ]
    });

    return response.choices[0]?.message?.content ?? "Sorry, I couldn't generate a reply.";
}

/**
 * Convert text to a numerical vector using OpenAI embeddings.
 */
async function embedText(text: string): Promise<number[]> {
    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
    });
    return embeddingResponse.data[0].embedding;
}
