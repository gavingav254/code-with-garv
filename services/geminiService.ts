
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAITutorResponse = async (prompt: string, context: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: `You are Garv, a friendly and expert programming tutor. Your goal is to help students learn step-by-step. 
                     Keep explanations concise, encouraging, and clear. 
                     Current Context: ${context}
                     Student Query: ${prompt}` }
          ]
        }
      ],
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text || "I'm sorry, I couldn't process that. Can you try rephrasing?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Technical glitch! I'm resting my circuits. Try again in a moment.";
  }
};

export const generateStepByStepGuide = async (topic: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: topic,
        config: {
          systemInstruction: "Generate a 5-step roadmap to learn the provided topic. Each step should include a title, a one-sentence explanation, and a tiny coding challenge.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                step: { type: Type.NUMBER },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                challenge: { type: Type.STRING }
              },
              required: ["step", "title", "description", "challenge"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Roadmap Generation Error:", error);
      return [];
    }
};
