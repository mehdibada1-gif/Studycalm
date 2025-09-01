'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating intelligent tips based on a student's mood journal entries.
 *
 * - `generateIntelligentTips` -  A function that takes a student's journal entries as input and returns tailored recommendations for managing their mental well-being while studying.
 * - `IntelligentTipsInput` - The input type for the `generateIntelligentTips` function.
 * - `IntelligentTipsOutput` - The return type for the `generateIntelligentTips` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentTipsInputSchema = z.object({
  journalEntries: z
    .string()
    .describe(
      'A string containing the student\'s mood journal entries.  Include as much detail as possible.'
    ),
});
export type IntelligentTipsInput = z.infer<typeof IntelligentTipsInputSchema>;

const IntelligentTipsOutputSchema = z.object({
  tips: z
    .string()
    .describe(
      'Tailored recommendations for managing the student\'s mental well-being while studying, based on their journal entries.'
    ),
});
export type IntelligentTipsOutput = z.infer<typeof IntelligentTipsOutputSchema>;

export async function generateIntelligentTips(
  input: IntelligentTipsInput
): Promise<IntelligentTipsOutput> {
  return intelligentTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentTipsPrompt',
  input: {schema: IntelligentTipsInputSchema},
  output: {schema: IntelligentTipsOutputSchema},
  prompt: `You are a mental health expert specializing in student well-being. Based on the student's journal entries, provide tailored recommendations for managing their mental health and study habits.  Be specific and actionable.

Journal Entries:
{{{journalEntries}}}`,
});

const intelligentTipsFlow = ai.defineFlow(
  {
    name: 'intelligentTipsFlow',
    inputSchema: IntelligentTipsInputSchema,
    outputSchema: IntelligentTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
