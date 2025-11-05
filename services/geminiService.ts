import { GoogleGenAI } from "@google/genai";
import { type DiscScores, type HerrmannScores } from "../types";

// @ts-ignore
const API_KEY = GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const callGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate analysis from Gemini API.");
  }
};

export const generateDiscAnalysis = async (
  scores: DiscScores
): Promise<string> => {
  const { Dominance, Influence, Steadiness, Conscientiousness } = scores;
  const prompt = `
    You are an expert in DISC personality assessments. Based on the following scores (Dominance: ${Dominance}, Influence: ${Influence}, Steadiness: ${Steadiness}, Conscientiousness: ${Conscientiousness}), please provide a detailed personality analysis.

    The analysis should include:
    1.  **Primary Profile:** A summary of the primary personality type (the one with the highest score). If two scores are very close, describe the blend.
    2.  **Key Strengths:** A bulleted list of key strengths associated with this profile.
    3.  **Potential Challenges:** A bulleted list of potential areas for growth or challenges.
    4.  **Interaction Style:** How this personality type tends to interact with others in a team or social setting.
    5.  **Summary:** A brief, encouraging closing statement.

    Format the entire response in Markdown. Use headings for each section.
    `;
  return callGemini(prompt);
};

export const generateHerrmannAnalysis = async (
  scores: HerrmannScores
): Promise<string> => {
  const { Analytical, Sequential, Interpersonal, Imaginative } = scores;
  const prompt = `
    You are an expert in the Herrmann Brain Dominance Instrument (HBDI). Based on the following scores (Analytical/Blue: ${Analytical}, Sequential/Green: ${Sequential}, Interpersonal/Red: ${Interpersonal}, Imaginative/Yellow: ${Imaginative}), please provide a detailed analysis of the user's thinking style.

    The analysis should include:
    1.  **Primary Thinking Style:** A summary of the primary quadrant (the one with the highest score). If scores are close, describe the blend of styles.
    2.  **Key Characteristics:** A bulleted list of key characteristics and preferences associated with this profile.
    3.  **Potential Blind Spots:** A bulleted list of potential challenges or areas where this thinking style might be less comfortable.
    4.  **Problem-Solving Approach:** How this thinking style typically approaches problems and decisions.
    5.  **Summary:** A brief, empowering closing statement about leveraging their unique cognitive strengths.

    Format the entire response in Markdown. Use headings for each section.
    `;
  return callGemini(prompt);
};
