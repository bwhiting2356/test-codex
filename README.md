# AI App Scaffold

This project provides a minimal Next.js setup using the OpenAI Agents SDK together with shadcn components. Chat requests sent to `/api/chat` are handled using the Agents SDK.
The main assistant can delegate work to dedicated sub‑agents. An **orders** agent exposes a `get_orders` tool for returning recent orders, and a **billing** agent answers invoice questions.

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
Use the provided eval scripts to test the agent's responses directly, bypassing the endpoint.

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
This repository includes an `.npmrc` file that sets `loglevel=error`, so any
warnings from `npm` (including the common `http-proxy` warning) are hidden by
default when running scripts.

You can also run a single eval for quicker feedback:

```bash
npx tsx scripts/evals/respond-hi.ts
# or test the orders agent
npx tsx scripts/evals/get-orders.ts
```

When tracing is enabled the script prints a trace ID that can be inspected in
the Agents tracing UI for deeper debugging.

All pull requests automatically run `npm run evals` using the provided GitHub
Actions workflow.
