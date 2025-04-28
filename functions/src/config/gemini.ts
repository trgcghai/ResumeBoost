import { GoogleGenAI } from "@google/genai";

export const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || "AIzaSyBqtTWTSGuoop3SnmjYbX8naqdEsKXx9B4";

export const geminiClient = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export default geminiClient;
