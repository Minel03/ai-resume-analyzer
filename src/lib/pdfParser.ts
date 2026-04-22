import pdf from 'pdf-parse/lib/pdf-parse.js';

export async function parseResume(fileBuffer: Buffer) {
  try {
    // This is the standard API for pdf-parse (1.1.1)
    // It works perfectly on Vercel without needing Canvas or DOM polyfills
    const data = await (pdf as any)(fileBuffer);
    return data.text;
  } catch (error: any) {
    console.error('Error parsing PDF:', error);
    throw new Error(
      'Failed to parse PDF resume: ' + (error.message || 'Unknown error'),
    );
  }
}
