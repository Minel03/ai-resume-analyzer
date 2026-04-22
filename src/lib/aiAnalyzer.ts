import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeResume(resumeText: string, jobDescription?: string, linkedinUrl?: string) {
  try {
    const prompt = `
      You are an expert ATS (Applicant Tracking System) and Career Coach.
      Analyze the following resume text.
      ${jobDescription ? `Compare it against this Job Description: "${jobDescription}"` : ''}
      ${linkedinUrl ? `Check if this LinkedIn profile is mentioned in the resume: "${linkedinUrl}"` : ''}

      Return a JSON object with the following structure:
      {
        "score": number,
        "matchRate": number,
        "sectionScores": {
          "impact": number,
          "brevity": number,
          "style": number,
          "softSkills": number
        },
        "skills": ["list of technical skills found"],
        "missing": [
          { "name": "skill name", "roadmap": "brief 1-sentence learning advice or resource name" }
        ],
        "jdKeywords": ["missing keywords from JD"],
        "suggestions": ["3-5 improvements"],
        "atsSuggestions": ["3-5 ATS tips"],
        "contactInfoAudit": {
          "email": boolean, "phone": boolean, "linkedin": boolean, "portfolio": boolean
        },
        "interviewPrep": [
          { "question": "custom question based on resume vs JD", "answer": "suggested star-method answer" }
        ],
        "originalText": "the resume text provided"
      }

      CRITICAL for missing skills:
      - For every missing skill, provide a "roadmap" property with a specific recommendation (e.g., "Take the official Redis University course" or "Explore MDN docs for Unix basics").

      CRITICAL for interviewPrep:
      - Generate 3-5 highly relevant questions that a recruiter might ask this specific candidate for this specific role.

      Resume Text:
      "${resumeText}"
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a professional resume analyzer that outputs strictly valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze resume with AI");
  }
}
