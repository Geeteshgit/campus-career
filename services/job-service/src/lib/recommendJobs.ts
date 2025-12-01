import { GoogleGenAI } from "@google/genai";
import { IJob } from "../models/job.model.js";

const ai = new GoogleGenAI({});

export const recommendJobs = async (jobs: IJob[], student: any) => {
  try {
    const prompt = `
You are an AI job recommendation engine.

Your task:
- Analyze the student's profile
- Compare it with job details, requirements, and eligibility
- Recommend ONLY jobs that are truly relevant
- EXCLUDE jobs with weak or no match.

Scoring rules:
- 0 = Not relevant
- 100 = Perfect match
- You MUST return only jobs with score >= 60

STRICT OUTPUT FORMAT (ONLY JSON, no comments, no markdown):
{
  "recommendations": [
    { "jobIndex": 0, "score": 87 },
    { "jobIndex": 2, "score": 72 }
  ]
}

Student:
${JSON.stringify(student)}

Jobs:
${JSON.stringify(jobs)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // ⭐ Gemini returns a "text()" function
    let raw = response.text;

    if (!raw) throw new Error("Gemini returned no response");

    // ⭐ Remove markdown code fences like ```json ... ```
    raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

    // ⭐ Parse JSON safely
    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error("RAW AI OUTPUT:", raw);
      throw new Error("AI returned invalid JSON");
    }

    if (!data.recommendations || !Array.isArray(data.recommendations)) {
      throw new Error("AI returned invalid structure (missing recommendations)");
    }

    return data.recommendations;
  } catch (err) {
    console.error("Error recommending jobs:", err);
    return [];
  }
};
