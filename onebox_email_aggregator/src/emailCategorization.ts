import OpenAI from 'openai';
import dotenv from 'dotenv';
import { sendSlackNotification } from './notificationService';

dotenv.config();

console.log('API Key:', process.env.OPENAI_API_KEY);
sendSlackNotification('New email categorized: Important');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const categorizeEmail = async (emailText: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: `Categorize this email: ${emailText}` }],
    max_tokens: 50,
  });

  return response.choices[0].message?.content?.trim() || 'No response';
};
