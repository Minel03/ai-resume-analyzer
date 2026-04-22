import { PDFParse } from 'pdf-parse';

export async function parseResume(fileBuffer: Buffer) {
  try {
    // Use a CDN for the worker to avoid Vercel path issues
    try {
      PDFParse.setWorker('https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs');
    } catch (e) {
      console.warn('Failed to set CDN worker, using default');
    }

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
