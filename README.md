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
npx tsx scripts/test-chat.ts
```

This script sends a sample message and streams the reply to standard output.

## Evaluations

Evals provide a quick way to verify expected behaviour and encourage a
test‑driven workflow. Each evaluation script lives under `scripts/evals` and
uses the TypeScript Agents SDK to run the agent directly.

- Keep evals focused on a single behaviour.
- Assert against `result.finalOutput` from `run()` or employ the `llmj` helper
  to let another model judge the response.
- Enable tracing with `AGENTS_TRACE=1` to debug failures.

Run all available evals with the helper script:

```bash
npm run evals
```

You can also run a single eval for quicker feedback:

```bash
npx tsx scripts/evals/respond-hi.ts
```

When tracing is enabled the script prints a trace ID that can be inspected in
the Agents tracing UI for deeper debugging.

All pull requests automatically run `npm run evals` using the provided GitHub
Actions workflow.
