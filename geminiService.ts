
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI;
try {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
} catch (error) {
    console.error("Failed to initialize GoogleGenAI. Is the API_KEY set?", error);
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
}

export const initializeChat = (): Chat => {
  if (!ai) {
    throw new Error("GoogleGenAI is not initialized.");
  }
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
    },
  });
};
