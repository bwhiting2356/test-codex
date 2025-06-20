# Codex Agent Guidelines

This repository is a minimal Next.js chat app that communicates with the OpenAI Agents SDK.

## Development Notes

- The app uses TypeScript with React components located under `app` and `components`.
- The chat endpoint is implemented in `app/api/chat/route.ts` and uses `@openai/agents` to handle requests.

## Best Practices for Codex

- **Keep commits focused.** Describe the change in the commit message and avoid mixing unrelated modifications.
- **Initial setup**: run `npm install` immediately after launching the environment so all packages are available before running any scripts.
- **Run programmatic checks** in the following order after installation:
  1. `npm run build` to ensure the Next.js project compiles.
  2. `npm run evals` to test the agent directly without hitting the endpoint.
- If these commands fail in the Codex environment due to missing dependencies or network restrictions, include the standard disclaimer about environment limitations in the PR description.
- Update documentation if you add or change any scripts or commands referenced in `README.md`.
- Use modern TypeScript and React patterns. Prefer functional components and hooks.
- Avoid adding new dependencies unless necessary.

