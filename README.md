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
If your environment sets a proxy (for example `http_proxy` or `npm_config_http_proxy`),
`npm` may warn about an unknown `http-proxy` config. Run the evals with a lower
log level to hide these warnings:

```bash
npm --loglevel error run evals
```

You can also run a single eval for quicker feedback:

```bash
npx tsx scripts/evals/respond-hi.ts
```

When tracing is enabled the script prints a trace ID that can be inspected in
the Agents tracing UI for deeper debugging.

All pull requests automatically run `npm run evals` using the provided GitHub
Actions workflow.
