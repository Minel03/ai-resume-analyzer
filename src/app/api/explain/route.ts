import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { suggestion, type, mode, userText } = await req.json();

    if (!suggestion) {
      return NextResponse.json({ error: "No suggestion provided" }, { status: 400 });
    }

    let prompt = "";
    
    if (mode === 'rewrite') {
      prompt = `
        You are a top-tier executive resume writer. 
        The user wants to improve this specific bullet point from their resume: "${userText || 'I am a hard worker'}"
        The goal is to implement this suggestion: "${suggestion}"
        
        Provide 3 different versions of this bullet point:
        1. "Action-Oriented": Focus on strong action verbs.
        2. "Data-Driven": Incorporate metrics, percentages, or numbers.
        3. "Concise": Make it lean and impactful.
        
        Format the output clearly.
      `;
    } else if (mode === 'cover_letter') {
      prompt = `
        You are a professional hiring consultant. 
        Write a 1-page tailored Cover Letter for a candidate based on:
        
        Resume: "${userText}"
        Job Description: "${suggestion}"
        
        The letter should:
        1. Be professional, persuasive, and enthusiastic.
        2. Specifically mention skills from the resume that match the Job Description.
        3. Follow a standard business letter format (without specific header info like addresses).
        4. Focus on how the candidate can solve the company's problems mentioned in the JD.
      `;
    } else {
      prompt = `
        You are an expert career coach. A user received this resume feedback: "${suggestion}"
        This feedback is of type: ${type}.
        
        Please provide a detailed, encouraging explanation (2-3 paragraphs) of:
        1. Why this is important for their career or ATS optimization.
        2. Concrete examples of how to implement this change.
        3. The potential impact on their interview callback rate.

        Keep the tone professional yet accessible. Return the response as a plain text string.
      `;
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert career coach and HR consultant."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0
    });

    const explanation = response.choices[0].message.content;
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Explanation API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}
