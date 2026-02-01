import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const recommendJobs = async (jobs, student) => {
  try {
    const jobSummaries = jobs.map((job, index) => ({
      jobIndex: index,
      role: job.role,
      company: job.company,
      location: job.location,
      type: job.type,
      requirements: job.requirements,
      eligibility: job.eligibility,
    }));

    const prompt = `
You are an AI job matching engine.

TASK:
Assign a matchScore (0–100) for EACH job.

SCORING:
- Skills & requirements: 0–40
- Role relevance: 0–30
- Eligibility fit: 0–20
- Location / job type: 0–10

RULES:
- Score EVERY job
- Scores MUST vary
- Output ONLY valid JSON

OUTPUT FORMAT:
{
  "scores": [
    { "jobIndex": 0, "matchScore": 78 },
    { "jobIndex": 1, "matchScore": 45 }
  ]
}

Student:
${JSON.stringify(student)}

Jobs:
${JSON.stringify(jobSummaries)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const raw = response.text;
    if (!raw) throw new Error("Gemini returned empty response");

    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed.scores)) {
      throw new Error("Invalid AI response");
    }

    const scoredJobs = jobs.map((job, index) => {
      const scoreObj = parsed.scores.find(
        (s) => s.jobIndex === index
      );

      return {
        ...job,
        matchScore: scoreObj ? scoreObj.matchScore : 0,
      };
    });

    scoredJobs.sort((a, b) => b.matchScore - a.matchScore);

    return scoredJobs;
  } catch (err) {
    console.error("Error recommending jobs:", err);

    return jobs.map((job) => ({
      ...job,
      matchScore: 0,
    }));
  }
};
