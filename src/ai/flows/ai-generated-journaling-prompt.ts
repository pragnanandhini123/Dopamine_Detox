'use server';
/**
 * @fileOverview AI-Generated Journaling Prompt Flow.
 *
 * This flow generates creative journaling prompts for users in the red zone to encourage self-reflection.
 *
 * @file AIGeneratedJournalingPromptFlow - A function that generates journaling prompts.
 * @file AIGeneratedJournalingPromptInput - The input type for the AIGeneratedJournalingPromptFlow function.
 * @file AIGeneratedJournalingPromptOutput - The return type for the AIGeneratedJournalingPromptFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIGeneratedJournalingPromptInputSchema = z.object({
  usageLevel: z
    .string()
    .describe("The user's current usage level (Green, Yellow, or Red Zone)."),
});
export type AIGeneratedJournalingPromptInput = z.infer<
  typeof AIGeneratedJournalingPromptInputSchema
>;

const AIGeneratedJournalingPromptOutputSchema = z.object({
  prompt: z
    .string()
    .describe('A creative journaling prompt to encourage self-reflection.'),
});
export type AIGeneratedJournalingPromptOutput = z.infer<
  typeof AIGeneratedJournalingPromptOutputSchema
>;

export async function generateJournalingPrompt(
  input: AIGeneratedJournalingPromptInput
): Promise<AIGeneratedJournalingPromptOutput> {
  return aiGeneratedJournalingPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiGeneratedJournalingPrompt',
  input: {schema: AIGeneratedJournalingPromptInputSchema},
  output: {schema: AIGeneratedJournalingPromptOutputSchema},
  prompt: `You are a creative writing assistant designed to provide engaging and thought-provoking journaling prompts.

  Based on the user's usage level ({{usageLevel}}), generate a journaling prompt that encourages self-reflection and mindful awareness of their digital habits.

  The prompt should be open-ended and designed to help the user explore their feelings and motivations.
  Here is an example of a prompt: What activities make you lose track of time? Are these activities contributing to or detracting from your Dopamine Detox goals?
  Remember that the ultimate goal of the Dopamine Detox app is to help build healthier dopamine balance and not to shame people for their behaviour.
  `,
});

const aiGeneratedJournalingPromptFlow = ai.defineFlow(
  {
    name: 'aiGeneratedJournalingPromptFlow',
    inputSchema: AIGeneratedJournalingPromptInputSchema,
    outputSchema: AIGeneratedJournalingPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
