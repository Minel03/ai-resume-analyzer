import { NextRequest, NextResponse } from 'next/server';
import { parseResume } from '../../../lib/pdfParser';
import { analyzeResume } from '../../../lib/aiAnalyzer';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const jobDescription = formData.get('jobDescription') as string | null;
    const linkedinUrl = formData.get('linkedinUrl') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF
    console.log('--- Starting PDF Parsing ---');
    const resumeText = await parseResume(buffer);
    console.log('--- PDF Parsing Successful ---', { textLength: resumeText.length });
    
    if (!resumeText || resumeText.trim().length === 0) {
      throw new Error('Could not extract any text from the PDF. Please ensure it is not an image-only PDF.');
    }

    // Analyze with AI (now passing JD and LinkedIn)
    console.log('--- Starting AI Analysis ---');
    const analysis = await analyzeResume(resumeText, jobDescription || undefined, linkedinUrl || undefined);
    console.log('--- AI Analysis Successful ---');

    return NextResponse.json({
      ...analysis,
      originalJD: jobDescription || ''
    });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error during analysis' },
      { status: 500 },
    );
  }
}
