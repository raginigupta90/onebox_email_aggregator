/**
 * Store email conversation in the vector database.
 */
export declare function storeEmail(emailText: string, responseTemplate: string): Promise<void>;
/**
 * Generate AI reply using OpenAI + RAG
 */
export declare function generateReply(emailText: string): Promise<string>;
