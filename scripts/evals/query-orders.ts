import { run } from '@openai/agents';
import { agent } from '../../app/api/chat/agent';

async function main() {
  const result = await run(agent, 'do i have any orders?');
  const output = result.finalOutput;
  if (typeof output !== 'string' || output.trim() === '') {
    console.error('No text output from orders query');
    process.exit(1);
  }
  console.log('✅ Orders query responded:', output);
}

main().catch(err => {
  console.error('Eval error:', err);
  process.exit(1);
});
