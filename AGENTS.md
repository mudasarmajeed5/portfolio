# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js App Router portfolio. Route entry points and shared page styling live in `app/` (`page.tsx`, `layout.tsx`, and `globals.css`). UI components and client-side behavior are grouped by feature in `features/`; lock-screen pieces live in `features/lockscreen/`, and reusable hooks live in `features/hooks/`. Static assets belong in `public/`. Keep new components near the feature that owns them and use the `@/*` TypeScript alias for imports from the repository root.

## Build, Test, and Development Commands

Use pnpm, as indicated by the committed lockfile:

- `pnpm install` installs dependencies.
- `pnpm dev` starts the local development server at `http://localhost:3000`.
- `pnpm lint` runs ESLint checks.
- `pnpm build` creates a production build; `pnpm start` serves that build locally.

There is no test script or test suite currently configured. Run lint and build before submitting changes.

## Coding Style & Naming Conventions

Use TypeScript and React. Follow the existing two-space indentation, semicolon, and double-quote style. Use PascalCase for React component files and component names (for example, `LockScreen.tsx`), and camelCase for hooks and other utilities (for example, `useUnlockGesture.tsx`). Keep components focused, use strict types, and mark client components with `'use client'` only when they need browser APIs, state, or effects. Run `pnpm lint` to check style and common Next.js issues.

## Testing Guidelines

Automated tests are not set up yet. For UI or interaction changes, manually verify the relevant screen in `pnpm dev`, including responsive layout and keyboard or touch behavior when applicable. Ensure `pnpm lint` and `pnpm build` pass; add tests if introducing a test framework or substantial reusable logic.

## Commit & Pull Request Guidelines

Recent commits use short, plain summaries such as `added lock screen`; keep commit subjects concise and focused on one change. Pull requests should explain the user-visible change, note relevant implementation details, and include screenshots for visual updates. Link related issues when available and report the lint/build checks run.

## Security & Configuration

Do not commit secrets or local environment files. Keep runtime configuration in environment variables and document any new required variables in the README.
