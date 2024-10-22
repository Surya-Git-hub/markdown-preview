// src/services/markdown.service.ts
import marked from 'marked';

export const convertMarkdownToHtml = async(markdownText: string): Promise<string> => {
  return marked.parse(markdownText);
};
