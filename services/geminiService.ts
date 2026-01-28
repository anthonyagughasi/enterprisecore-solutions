
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizeResource = async (title: string, category: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a professional, enterprise-grade executive summary (2 sentences) for a ${category} resource titled: "${title}". Use sophisticated corporate terminology.`,
  });
  return response.text || "Summary unavailable.";
};

export const suggestRole = async (bio: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this candidate background: "${bio}", suggest the best department (Engineering, Sales, Marketing, Operations, or Legal) and why. Respond in a formal corporate tone.`,
  });
  return response.text || "Unable to determine best fit.";
};
