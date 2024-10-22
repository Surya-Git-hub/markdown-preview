// src/controllers/markdown.controller.ts
import { Request, Response } from 'express';
import { convertMarkdownToHtml } from '../services/markdown.service';

// Interface for request body
interface MarkdownRequest {
  text: string;
}

export const convert = async (req: Request<{}, {}, MarkdownRequest>, res: Response) => {
  const markdownText = req.body.text;
  const htmlContent = await convertMarkdownToHtml(markdownText);
  res.json({ html: htmlContent });
};
