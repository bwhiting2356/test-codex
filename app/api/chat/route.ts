import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';
import { createAgent } from 'agents';

export const runtime = 'edge';

const agent = createAgent({
  system: 'You are a helpful AI assistant.'
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai('gpt-4.1'),
    messages,
    agent
  });
  return new StreamingTextResponse(result.toAIStream());
}
