import { run } from '@openai/agents';
import { agent } from '../../app/api/chat/agent';

async function main() {
  const result = await run(agent, 'show my orders');
  const output = result.finalOutput;
  if (!output) {
    console.error('No output from agent');
    process.exit(1);
  }
  console.log('✅ Orders agent responded:', output);
}

main().catch(err => {
  console.error('Eval error:', err);
  process.exit(1);
});
