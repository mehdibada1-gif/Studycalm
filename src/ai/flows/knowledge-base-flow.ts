'use server';
/**
 * @fileOverview This file defines a Genkit flow for answering user questions based on a knowledge base.
 *
 * - `answerQuestion` - A function that takes a user's question and returns an answer.
 * - `QuestionInput` - The input type for the `answerQuestion` function.
 * - `AnswerOutput` - The return type for the `answerQuestion` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuestionInputSchema = z.object({
  query: z.string().describe('The user\'s question about mental health, well-being, or study habits.'),
});
export type QuestionInput = z.infer<typeof QuestionInputSchema>;

const AnswerOutputSchema = z.object({
  answer: z.string().describe('A helpful and supportive answer to the user\'s question.'),
});
export type AnswerOutput = z.infer<typeof AnswerOutputSchema>;

export async function answerQuestion(
  input: QuestionInput
): Promise<AnswerOutput> {
  return knowledgeBaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'knowledgeBasePrompt',
  input: { schema: QuestionInputSchema },
  output: { schema: AnswerOutputSchema },
  prompt: `You are a compassionate and knowledgeable mental health and academic advisor for students. Your goal is to provide supportive, safe, and informative answers.

  Base your answer on established well-being and study principles. If a question is outside your scope or touches on serious mental health crises (e.g., self-harm, suicide), you MUST prioritize user safety. In such cases, gently state your limitations and provide a clear, immediate recommendation to contact a crisis hotline or mental health professional, and provide a resource for them to contact.
  
  User's Question:
  {{{query}}}`,
});

const knowledgeBaseFlow = ai.defineFlow(
  {
    name: 'knowledgeBaseFlow',
    inputSchema: QuestionInputSchema,
    outputSchema: AnswerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
