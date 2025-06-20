import { run, type AgentInputItem } from '@openai/agents';
import { agent } from './agent';
import { createDataStreamResponse, formatDataStreamPart } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request payload' },
        { status: 400 }
      );
    }

    const lastUserMessage = messages
      .filter((m: { role: string; content: string }) => m.role === 'user')
      .pop();

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: 'No user message found' },
        { status: 400 }
      );
    }

    return await handleAgentResponse(lastUserMessage.content);

  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

async function handleAgentResponse(message: string) {
  try {
    // Try streaming first
    const result = await run(agent, message, { stream: true });
    const textStream = result.toTextStream();
    const iterator = textStream[Symbol.asyncIterator]();

    const { value: firstChunk, done } = await iterator.next();
    
    if (done || !firstChunk) {
      // Fallback to non-streaming
      return await handleNonStreamingResponse(message);
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
    console.error('Streaming failed, falling back:', err);
    return await handleNonStreamingResponse(message);
  }
}

async function handleNonStreamingResponse(message: string) {
  const result = await run(agent, message);
  const output = result.finalOutput;
  
  if (!output) {
    return NextResponse.json(
      { error: 'Empty response from agent' },
      { status: 500 }
    );
  }

  return createDataStreamResponse({
    async execute(writer) {
      writer.write(formatDataStreamPart('text', output));
    },
    onError() {
      return 'An unexpected error occurred.';
    }
  });
}
