import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.warn("GROQ_API_KEY is not defined in environment variables");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
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

      SCORING GUIDELINES:
      - "score": (0-100) A general assessment of resume quality regardless of any job description. Evaluate based on action verbs, clarity, impact, and standard ATS formatting rules.
      - "matchRate": (0-100) ONLY calculated if a Job Description is provided. It measures the keyword and skill overlap. If NO Job Description is provided, this MUST be 0.
      
      CRITICAL for missing skills:
      - If no JD is provided, "missing" should list general industry-standard skills that would enhance this specific resume.
      - If a JD is provided, "missing" must list skills required by the JD that are not found in the resume.

      CRITICAL for interviewPrep:
      - If no JD is provided, generate general behavioral interview questions.
      - If a JD is provided, generate questions specific to the role and the gaps in the resume.

      Resume Text:
      "${resumeText}"
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a professional resume analyzer. All numeric scores (score, matchRate, and sectionScores) MUST be integers between 0 and 100. Output strictly valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0
    });

    const content = response.choices[0].message.content || "{}";
    try {
      const result = JSON.parse(content);
      return result;
    } catch (e) {
      console.error("AI returned invalid JSON:", content);
      throw new Error("The AI returned a malformed response. This can happen with very long resumes. Please try again.");
    }
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze resume with AI");
  }
}
