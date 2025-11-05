import { QuizType, DiscScores, HerrmannScores } from '../types';

/**
 * Generates a formatted string of scores.
 * @param scores The scores object.
 * @returns A string representing the scores.
 */
const formatScores = (scores: DiscScores | HerrmannScores): string => {
  return Object.entries(scores)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');
};

/**
 * Compiles assessment data into a Markdown string and triggers a browser download.
 * @param username The user's name.
 * @param quizType The type of quiz taken.
 * @param scores The user's scores.
 * @param analysis The AI-generated analysis text.
 */
export const downloadAsMarkdown = (
  username: string,
  quizType: QuizType,
  scores: DiscScores | HerrmannScores,
  analysis: string
): void => {
  const title = `Noesis Hiring Assessment Results for ${username}`;
  const quizName = quizType === 'disc' ? 'DISC Assessment' : 'Herrmann Model';

  const markdownContent = `
# ${title}

**Assessment Type:** ${quizName}
**Date:** ${new Date().toLocaleDateString()}

---

## Scores

${formatScores(scores)}

---

## Personalized Analysis

${analysis}
  `;

  const blob = new Blob([markdownContent.trim()], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  const safeUsername = username.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  link.download = `noesis_hiring_${quizType}_${safeUsername}.md`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};