'use server';

/**
 * @fileOverview AI-powered reflection on user's phone usage patterns.
 *
 * - aiReflectionOnUsage - A function that generates personalized reflections on user's phone usage.
 * - AIReflectionOnUsageInput - The input type for the aiReflectionOnUsage function.
 * - AIReflectionOnUsageOutput - The return type for the aiReflectionOnUsage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIReflectionOnUsageInputSchema = z.object({
  screenTime: z
    .number()
    .describe('Total screen time in minutes for the day.'),
  appUsage: z.array(
    z.object({
      appName: z.string().describe('Name of the app.'),
      usageTime: z.number().describe('Usage time in minutes for the app.'),
      icon: z.string().describe("Name of the app's icon."),
    })
  ).describe('Array of app usage data.'),
  unlockCount: z.number().describe('Number of times the phone was unlocked.'),
  nightTimeUsagePeak: z
    .boolean()
    .describe(
      'True if there was a peak in usage during nighttime (10 PM - 6 AM), false otherwise.'
    ),
});
export type AIReflectionOnUsageInput = z.infer<typeof AIReflectionOnUsageInputSchema>;

const AIReflectionOnUsageOutputSchema = z.object({
  reflection: z
    .string()
    .describe(
      'A personalized reflection on the user’s phone usage, offering insights and suggesting resets in a friendly, non-judgmental tone.'
    ),
});
export type AIReflectionOnUsageOutput = z.infer<typeof AIReflectionOnUsageOutputSchema>;

export async function aiReflectionOnUsage(input: AIReflectionOnUsageInput): Promise<AIReflectionOnUsageOutput> {
  return aiReflectionOnUsageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiReflectionOnUsagePrompt',
  input: {
    schema: AIReflectionOnUsageInputSchema,
  },
  output: {
    schema: AIReflectionOnUsageOutputSchema,
  },
  prompt: `Based on the following phone usage data, provide a personalized reflection in a friendly, non-judgmental tone, offering insights and suggesting resets. Focus on identifying potential triggers for overuse.

Screen Time: {{screenTime}} minutes
App Usage:
{{#each appUsage}}
  - {{appName}}: {{usageTime}} minutes
{{/each}}
Unlock Count: {{unlockCount}}
Nighttime Usage Peak: {{nightTimeUsagePeak}}

Reflection:`,
});

const aiReflectionOnUsageFlow = ai.defineFlow(
  {
    name: 'aiReflectionOnUsageFlow',
    inputSchema: AIReflectionOnUsageInputSchema,
    outputSchema: AIReflectionOnUsageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
