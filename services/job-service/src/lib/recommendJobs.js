import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const recommendJobs = async (jobs, student) => {
  try {
    const prompt = `
You are an AI job matching engine.

TASK:
For EACH job, assign a matchScore between 0 and 100.

MATCHING CRITERIA:
- Role relevance to student's skills & specialization
- Job description relevance
- Requirements vs student skills
- Eligibility vs program, year, CGPA

RULES:
- Score EVERY job
- Scores MUST vary
- DO NOT explain
- RETURN ONLY VALID JSON ARRAY

OUTPUT FORMAT:
[
  { "jobId": "string", "matchScore": number }
]

Student Profile:
${JSON.stringify(student)}

Jobs:
${JSON.stringify(jobs)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const raw = response.text;
    if (!raw) throw new Error("Empty AI response");

    const cleaned = raw.replace(/```json|```/g, "").trim();
    const scores = JSON.parse(cleaned);

    if (!Array.isArray(scores)) {
      throw new Error("Invalid AI response format");
    }

    return scores;
  } catch (err) {
    console.error("Error recommending jobs:", err);
    return []
  }
};
