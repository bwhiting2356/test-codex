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

    // Extract the last user message
    const lastUserMessage = messages
      .filter((m: { role: string; content: string }) => m.role === 'user')
      .pop();

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: 'No user message found' },
        { status: 400 }
      );
    }

    console.log('Running agent with message:', lastUserMessage.content);

    // Run with streaming
    const result = await run(agent, lastUserMessage.content, { stream: true });
    const textStream = result.toTextStream();
    const iterator = textStream[Symbol.asyncIterator]();

    let firstChunk: string;
    try {
      const { value, done } = await iterator.next();
      if (done || value === undefined) {
        console.log('Stream is empty, trying non-streaming fallback...');
        // Fallback to non-streaming if streaming fails
        const fallbackResult = await run(agent, lastUserMessage.content);
        const fallbackOutput = fallbackResult.finalOutput;
        
        if (!fallbackOutput) {
          return NextResponse.json(
            { error: 'Empty response from agent' },
            { status: 500 }
          );
        }
        
        return createDataStreamResponse({
          async execute(writer) {
            writer.write(formatDataStreamPart('text', fallbackOutput));
          },
          onError() {
            return 'An unexpected error occurred.';
          }
        });
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
          console.log('Starting stream with first chunk:', firstChunk);
          writer.write(formatDataStreamPart('text', firstChunk));
          
          for await (const chunk of { [Symbol.asyncIterator]: () => iterator }) {
            console.log('Streaming chunk:', chunk);
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
