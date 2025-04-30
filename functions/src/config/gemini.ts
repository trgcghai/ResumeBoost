import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const geminiClient = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export default geminiClient;
