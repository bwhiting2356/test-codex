import { Agent } from '@openai/agents';

export const agent = new Agent({
  name: 'assistant',
  instructions: 'You are a helpful AI assistant.',
  model: 'gpt-4o'
});
