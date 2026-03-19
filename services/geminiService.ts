import { GoogleGenAI } from "@google/genai";
import { PromptCategory, OptimizationOptions } from '../types';
import { CATEGORIES } from '../constants';

const apiKey = process.env.API_KEY;

// Initialize the client.
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-types' });

export const generateOptimizedPrompt = async (
  category: PromptCategory,
  userInput: string,
  options: OptimizationOptions
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }

  const template = CATEGORIES[category];
  
  // Construct a meta-instruction based on user options
  let metaInstruction = template.systemInstruction;
  
  metaInstruction += `\n\nIMPORTANT CONFIGURATION:\n`;
  metaInstruction += `- TONE: ${options.tone} (Adopt this tone in the generated prompt content)\n`;
  metaInstruction += `- OUTPUT LANGUAGE: ${options.lang === 'ZH' ? 'Simplified Chinese (简体中文)' : 'English'}.\n`;
  metaInstruction += `If the user input is in Chinese and Output Language is Chinese, ensure all headers and descriptions are in natural, professional Chinese. If English, use professional English.`;

  const modelId = "gemini-3-flash-preview";

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userInput,
      config: {
        systemInstruction: metaInstruction,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated.");
    }
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
