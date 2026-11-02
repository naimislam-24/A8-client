# client — Next.js frontend

Frontend app for the `mileston-8` project. The Express + MongoDB backend lives in the sibling `../server` directory (separate repo folder, runs on port 5000); keep client and server changes in their own directories.

## Commands

- `npm run dev` — dev server (Turbopack) on localhost:3000
- `npx tsc --noEmit` — typecheck; there is no typecheck script, and `npm run build` is the only automated type gate
- `npm run lint` — runs `eslint` with no args (flat config: core-web-vitals + TS rules)
- No test framework is configured

## Backend wiring

- Pages fetch the Express API directly (server components, `fetch` + `cache: "no-store"`), e.g. `src/app/facilities/page.tsx`.
- The base URL env var is misspelled `NEXT_PUBLIC_SERVER_BESE_URL` (in `.env`, used in 3 pages). The spelling is correct *for this repo* — do not rename it, or every fetch breaks.
- Run `../server` (`index.js`, port 5000) in parallel or all fetches fail at build/runtime.

## Stack quirks

- Next.js 16.4.3 via Turbopack. In `next.config.ts`: `cacheComponents: false` and `partialPrefetching: false` (both explicitly off), `reactCompiler: true` (React Compiler via `babel-plugin-react-compiler`), `experimental.agentFeedback: true`. Pre-16.x Next.js API knowledge is unreliable here — read `node_modules/next/dist/docs/` before writing app-router code.
- Dynamic-route `params` must be awaited (`const { id } = await params`), as in `src/app/facilities/[id]/page.tsx`.
- Styling is Tailwind v4 via `@tailwindcss/turbopack` — no tailwind config file; theme lives in `src/app/globals.css`. daisyUI is loaded as a plugin (`@plugin "daisyui"`) and `<html data-theme="light">` is set in `src/app/layout.tsx`.
- The shadcn/Tailwind theme block in `globals.css` (`@theme inline` token mapping, `:root`/`.dark` variables) is active — shadcn color/wording tokens like `bg-card`, `border-input`, `ring-ring` work. daisyUI is still loaded alongside via `@plugin "daisyui"` (`data-theme="light"` on `<html>`).
- shadcn/ui scaffolding: `components.json` uses style `base-nova`, which is built on `@base-ui/react` primitives (not Radix), with lucide icons. Components live in `src/components/ui`. Path alias: `@/* -> src/*`.
- `src/app/layout.tsx` renders `<Navbar />` (`src/components/shared/Navbar.tsx`) on every page.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
