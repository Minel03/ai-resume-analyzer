import { PDFParse } from 'pdf-parse';
import path from 'path';
import { pathToFileURL } from 'url';

export async function parseResume(fileBuffer: Buffer) {
  try {
    // Point to the local worker file in node_modules
    try {
      const workerPath = path.resolve('node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs');
      // Convert the Windows path (C:\...) to a valid file URL (file:///C:/...) for the ESM loader
      PDFParse.setWorker(pathToFileURL(workerPath).href);
    } catch (e) {
      // Ignore
    }

    const parser = new PDFParse({ data: fileBuffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF resume');
  }
}
