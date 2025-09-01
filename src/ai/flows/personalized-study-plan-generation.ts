'use server';
/**
 * @fileOverview Personalized study plan generation flow.
 *
 * - generateStudyPlan - A function that generates a personalized study plan.
 * - StudyPlanInput - The input type for the generateStudyPlan function.
 * - StudyPlanOutput - The return type for the generateStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyPlanInputSchema = z.object({
  academicWorkload: z
    .string()
    .describe('The student’s current academic workload.'),
  stressLevel: z
    .string()
    .describe('The student’s current stress level (e.g., low, medium, high).'),
  focusHabits: z
    .string()
    .describe(
      'The student’s focus habits and preferences (e.g., prefers quiet environments, benefits from short breaks).' // Corrected description
    ),
  studyGoals: z
    .string()
    .describe('The student’s study goals (e.g., improve grades, pass exams).'),
  availableTime: z
    .string()
    .describe('The amount of time the student has available for studying.'),
});

export type StudyPlanInput = z.infer<typeof StudyPlanInputSchema>;

const StudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('The generated personalized study plan.'),
});

export type StudyPlanOutput = z.infer<typeof StudyPlanOutputSchema>;

export async function generateStudyPlan(input: StudyPlanInput): Promise<StudyPlanOutput> {
  return generateStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedStudyPlanPrompt',
  input: {schema: StudyPlanInputSchema},
  output: {schema: StudyPlanOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized study plans for students.

  Based on the following information about the student, create a study plan:

  Academic Workload: {{{academicWorkload}}}
  Stress Level: {{{stressLevel}}}
  Focus Habits: {{{focusHabits}}}
  Study Goals: {{{studyGoals}}}
  Available Time: {{{availableTime}}}

  The study plan should be realistic, achievable, and tailored to the student's individual needs and circumstances.
`,
});

const generateStudyPlanFlow = ai.defineFlow(
  {
    name: 'generateStudyPlanFlow',
    inputSchema: StudyPlanInputSchema,
    outputSchema: StudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
