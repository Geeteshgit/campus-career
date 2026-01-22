import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const extractSkillsFromResume = async (buffer) => {
  try {
    const contents = [
      {
        text: `
You are a professional AI Resume Skill Extraction System. Extract only the skills from the attached resume.

Requirements:
- Include both HARD skills (technical tools, programming languages, frameworks, domains, technologies).
- Include SOFT skills (communication, teamwork, leadership, problem solving, etc.).
- Do NOT repeat similar skills (example: "communication skills" and "communication" should become just "Communication").
- Normalize all skills into clean, capitalized text (e.g., "java script" → "JavaScript").
- Remove any duplicates, redundant entries, or overly similar skills.
- No descriptions, no categories, no explanations.
- Return ONLY a JSON array of skill strings.

STRICT OUTPUT FORMAT (JSON only):
["JavaScript", "React", "Node.js", "Teamwork"]
`,
      },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: buffer.toString("base64"),
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    let raw = response.text;

    if (!raw) throw new Error("Empty AI response");

    // Clean code fences if any
    raw = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let skills= [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        skills = parsed.map((s) => String(s).trim());
      } else {
        throw new Error("Not a JSON array");
      }
    } catch (err) {
      console.error("RAW GEMINI OUTPUT:", raw);
      throw new Error("Invalid JSON");
    }

    return skills;
  } catch (err) {
    console.error("Error extracting skills:", err);
    return [];
  }
};
