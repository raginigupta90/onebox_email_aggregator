"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeEmail = storeEmail;
exports.generateReply = generateReply;
const openai_1 = require("openai");
const pinecone_1 = require("@pinecone-database/pinecone");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Ensure required environment variables are available
const OPENAI_API_KEY = (_a = process.env.OPENAI_API_KEY) !== null && _a !== void 0 ? _a : "";
const PINECONE_API_KEY = (_b = process.env.PINECONE_API_KEY) !== null && _b !== void 0 ? _b : "";
const PINECONE_INDEX = (_c = process.env.PINECONE_INDEX) !== null && _c !== void 0 ? _c : "";
if (!OPENAI_API_KEY || !PINECONE_API_KEY || !PINECONE_INDEX) {
    throw new Error("❌ Missing required API keys in environment variables.");
}
// Initialize OpenAI
const openai = new openai_1.OpenAI({ apiKey: OPENAI_API_KEY });
// Initialize Pinecone Vector DB
const pinecone = new pinecone_1.Pinecone({ apiKey: PINECONE_API_KEY });
const pineconeIndex = pinecone.index(PINECONE_INDEX);
/**
 * Store email conversation in the vector database.
 */
function storeEmail(emailText, responseTemplate) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pineconeIndex.upsert([
            { id: `email_${Date.now()}`, values: embedText(emailText), metadata: { responseTemplate } }
        ]);
    });
}
/**
 * Generate AI reply using OpenAI + RAG
 */
function generateReply(emailText) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        // Convert email text to a numerical vector for Pinecone search
        const vector = embedText(emailText);
        // Retrieve similar past responses from Pinecone
        const retrievedData = yield pineconeIndex.query({ vector, topK: 1 });
        let context = "You are an AI email assistant.";
        if (retrievedData.matches.length > 0 && retrievedData.matches[0].metadata) {
            context += `\nSimilar past email: "${retrievedData.matches[0].metadata.responseTemplate}"`;
        }
        // Generate reply with OpenAI
        const response = yield openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: context },
                { role: "user", content: emailText }
            ]
        });
        return (_c = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) !== null && _c !== void 0 ? _c : "Sorry, I couldn't generate a reply.";
    });
}
/**
 * Dummy function to convert text to a numerical vector (Replace with an actual embedding model).
 */
function embedText(text) {
    return text.split("").map(char => char.charCodeAt(0) / 255); // Normalize ASCII values
}
