# AI App Scaffold

This project provides a minimal Next.js setup using the OpenAI Agents SDK together with shadcn components. Chat requests sent to `/api/chat` are handled using the Agents SDK.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm run dev
   ```

The main UI can be found on the index page and uses shadcn UI components for a simple chat interface.

## Testing the chat endpoint

After starting the dev server you can verify the `/api/chat` endpoint using the
`scripts/test-chat.ts` script:

```bash
npx ts-node scripts/test-chat.ts
```

This script sends a sample message and streams the reply to standard output.
