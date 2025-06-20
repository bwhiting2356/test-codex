import { run } from '@openai/agents';
import { agent } from '../../app/api/chat/agent';
import { llmj } from '../utils/llmj';

async function main() {
  const result = await run(agent, 'hi');
  const output = result.finalOutput;

  if (typeof output !== 'string') {
    console.error('No text output from agent');
    process.exit(1);
  }

  if (await llmj('greeting', output)) {
    console.log('✅ Agent greeted:', output);
  } else {
    console.error('❌ Response failed greeting check:', output);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Eval error:', err);
  process.exit(1);
});
