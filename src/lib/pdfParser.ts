import { PDFParse } from 'pdf-parse';

export async function parseResume(fileBuffer: Buffer) {
  try {
    // Note: We avoid calling PDFParse.setWorker with hardcoded node_modules paths 
    // as it causes 500 errors on Vercel. The library will attempt to use a default.
    const parser = new PDFParse({ data: fileBuffer });
    const result = await parser.getText();
    
    // Always clean up to prevent memory leaks
    await parser.destroy();
    
    return result.text;
  } catch (error: any) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF resume: ' + (error.message || 'Unknown error'));
  }
}
