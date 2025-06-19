import { Readable } from 'node:stream';

async function main() {
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] })
  });

  if (!response.ok || !response.body) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const reader = (response.body as unknown as Readable)[Symbol.asyncIterator]();
  for await (const chunk of reader) {
    process.stdout.write(chunk);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
