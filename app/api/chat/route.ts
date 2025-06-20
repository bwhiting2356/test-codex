import { Agent, run } from '@openai/agents';
import { createDataStreamResponse, formatDataStreamPart } from 'ai';

export const runtime = 'edge';

const agent = new Agent({
  name: 'assistant',
  instructions: 'You are a helpful AI assistant.',
  model: 'gpt-4o'
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const history = messages.map((m: { role: string; content: string }) => {
    if (m.role === 'system') {
      return { role: 'system', content: m.content } as const;
    }
    if (m.role === 'assistant') {
      return {
        role: 'assistant',
        status: 'completed',
        content: [{ type: 'output_text', text: m.content }]
      } as const;
    }
    return {
      role: 'user',
      content: [{ type: 'input_text', text: m.content }]
    } as const;
  });

  const result = await run(agent, history, { stream: true });
  return createDataStreamResponse({
    async execute(writer) {
      for await (const chunk of result.toTextStream()) {
        writer.write(formatDataStreamPart('text', chunk));
      }
    }
  });
}
