import { Agent, tool } from '@openai/agents';
import { z } from 'zod';

// Tool for the orders agent
const getOrdersTool = tool({
  name: 'get_orders',
  description: 'Retrieve recent orders',
  // No parameters for now
  parameters: z.object({}),
  async execute() {
    return [{ id: '1', item: 'Widget', price: 9.99 }];
  }
});

// Orders agent providing order information
export const ordersAgent = new Agent({
  name: 'orders',
  instructions: 'You manage user orders.',
  handoffDescription: 'Handles order related queries',
  tools: [getOrdersTool],
  toolUseBehavior: 'stop_on_first_tool',
  model: 'gpt-4o'
});

// Billing agent placeholder
export const billingAgent = new Agent({
  name: 'billing',
  instructions: 'You answer billing questions.',
  handoffDescription: 'Handles billing and invoices',
  model: 'gpt-4o'
});

// Main assistant agent with access to other agents
export const agent = Agent.create({
  name: 'assistant',
  instructions: 'You are a helpful AI assistant.',
  handoffs: [ordersAgent, billingAgent],
  model: 'gpt-4o'
});
