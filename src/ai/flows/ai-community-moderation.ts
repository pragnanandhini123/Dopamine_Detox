// This file ensures a positive community environment by filtering out negative comments using AI.

'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ModerationInputSchema = z.object({
  text: z.string().describe('The text to be checked for negativity.'),
});
export type ModerationInput = z.infer<typeof ModerationInputSchema>;

const ModerationOutputSchema = z.object({
  isNegative: z.boolean().describe('True if the text is negative, false otherwise.'),
  reason: z.string().optional().describe('The reason why the text is considered negative.'),
});
export type ModerationOutput = z.infer<typeof ModerationOutputSchema>;

export async function moderateText(input: ModerationInput): Promise<ModerationOutput> {
  return aiCommunityModerationFlow(input);
}

const moderationPrompt = ai.definePrompt({
  name: 'moderationPrompt',
  input: { schema: ModerationInputSchema },
  output: { schema: ModerationOutputSchema },
  prompt: `You are an AI moderation tool that will determine whether the following text is negative. 

Text: {{{text}}}

Respond with a boolean value representing whether or not the text is negative. If it is negative, also provide a reason.
If it contains harmful, unethical, racist, sexist, toxic, dangerous, or illegal content, then it should be flagged as negative.

Output in JSON format:
{
  "isNegative": boolean,
  "reason": string
}`,
});

const aiCommunityModerationFlow = ai.defineFlow(
  {
    name: 'aiCommunityModerationFlow',
    inputSchema: ModerationInputSchema,
    outputSchema: ModerationOutputSchema,
  },
  async input => {
    const { output } = await moderationPrompt(input);
    return output!;
  }
);
