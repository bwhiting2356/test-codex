import { Agent, run, type AgentInputItem } from '@openai/agents';
import { createDataStreamResponse, formatDataStreamPart } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const agent = new Agent({
  name: 'assistant',
  instructions: 'You are a helpful AI assistant.',
  model: 'gpt-4o'
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request payload' },
        { status: 400 }
      );
    }

    const history: AgentInputItem[] = messages.map((m: { role: string; content: string }) => {
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
    const textStream = result.toTextStream();
    const iterator = textStream[Symbol.asyncIterator]();

    let firstChunk: string;
    try {
      const { value, done } = await iterator.next();
      if (done || value === undefined) {
        return NextResponse.json(
          { error: 'Empty response from agent' },
          { status: 500 }
        );
      }
      firstChunk = value;
    } catch (err) {
      console.error('Chat error before streaming:', err);
      return NextResponse.json(
        { error: 'An unexpected error occurred.' },
        { status: 500 }
      );
    }

    return createDataStreamResponse({
      async execute(writer) {
        try {
          writer.write(formatDataStreamPart('text', firstChunk));
          for await (const chunk of { [Symbol.asyncIterator]: () => iterator }) {
            writer.write(formatDataStreamPart('text', chunk));
          }
        } catch (err) {
          writer.write(formatDataStreamPart('error', 'An unexpected error occurred.'));
          console.error('Streaming error:', err);
        }
      },
      onError() {
        return 'An unexpected error occurred.';
      }
    });
  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
