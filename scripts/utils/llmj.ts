import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

/**
 * Use a secondary LLM to judge whether `actual` meets the `expected` criterion.
 * Returns `true` if the judge indicates success.
 */
export async function llmj(expected: string, actual: string): Promise<boolean> {
  const { object } = await generateObject({
    model: openai('gpt-3.5-turbo'),
    schema: z.object({ pass: z.boolean() }),
    prompt:
      `Does the following response meet the expectation?\n` +
      `Expectation: ${expected}\n` +
      `Response: ${actual}\n` +
      `Respond with JSON {"pass": true | false}.`
  });
  return object.pass;
}
