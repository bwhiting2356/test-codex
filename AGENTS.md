# Codex Agent Guidelines

This repository is a minimal Next.js chat app that communicates with the OpenAI Agents SDK.

## Development Notes

- The app uses TypeScript with React components located under `app` and `components`.
- The chat endpoint is implemented in `app/api/chat/route.ts` and uses `@openai/agents` to handle requests.
- A script at `scripts/test-chat.ts` streams a sample request to `/api/chat` for quick verification.
- Start the dev server with `npm run dev` before running the chat test.
- Evaluation scripts live under `scripts/evals` and can all be executed with `npm run evals`.
- Run `npm install` to ensure all dev dependencies like `tsx` are available.
- NPM warnings are silenced via `.npmrc` which sets `loglevel=error`.
- Browser-only APIs like `CustomEvent` are polyfilled in `lib/polyfills.ts`.

## Best Practices for Codex

- **Keep commits focused.** Describe the change in the commit message and avoid mixing unrelated modifications.
- **Run programmatic checks** before committing:
  - `npm run build` to ensure the Next.js project compiles.
  - `npx tsx scripts/test-chat.ts` to verify the chat endpoint.
  - `npm run evals` to execute TypeScript evals under `scripts/evals`.
- If these commands fail in the Codex environment due to missing dependencies or network restrictions, include the standard disclaimer about environment limitations in the PR description.
- Update documentation if you add or change any scripts or commands referenced in `README.md`.
- Use modern TypeScript and React patterns. Prefer functional components and hooks.
- Avoid adding new dependencies unless necessary.

