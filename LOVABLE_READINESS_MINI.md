# Lovable Readiness Mini

Scope: limited migration-readiness check only. No builds run, no source code modified, and only targeted files/searches were inspected.

## 1. Verdict

Yes — the repo can be connected to Lovable now for frontend/UI work, provided Lovable edits are limited to client-facing pages/components/styles and reviewed before touching backend/auth/deployment code.

Not production-ready for Lovable as-is: inspected files show Manus-coupled OAuth, Manus/Forge service assumptions, MySQL/Drizzle backend dependencies, and tRPC server coupling.

`VALIDATION_REPORT.md`: not found from inspected files.  
`README.md`: not found from inspected files.

## 2. P0 blockers

- `server/_core/sdk.ts`: OAuth uses Manus-specific service paths (`/webdev.v1.WebDevAuthPublicService/*`) and Manus platform/openId assumptions; production auth must be replaced or explicitly supported outside Manus.
- `server/_core/oauth.ts` / `client/src/const.ts`: login flow depends on `OAUTH_SERVER_URL`, `VITE_APP_ID`, and `VITE_OAUTH_PORTAL_URL`; Lovable production auth behavior is unknown from inspected files.
- `.env.example` / `server/_core/env.ts`: production requires real `DATABASE_URL`, `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, and `OWNER_OPEN_ID`; placeholders are not production-ready.
- `drizzle.config.ts` / `server/db.ts`: database layer is MySQL/Drizzle and migration commands require `DATABASE_URL`; production DB provisioning/ownership is unresolved.
- `server/_core/llm.ts`, `server/storage.ts`, `server/_core/dataApi.ts`, `server/_core/map.ts`: Forge/API proxy functionality depends on `BUILT_IN_FORGE_API_URL` and `BUILT_IN_FORGE_API_KEY`; non-Manus equivalents are unknown from inspected files.
- `vite.config.ts` / `package.json`: Manus runtime/debug tooling remains (`vite-plugin-manus-runtime`, `__manus__` debug collector, Manus allowedHosts); production deployment impact in Lovable is unknown from inspected files.

## 3. Safe for Lovable

- `client/src/pages/*`: likely safe for copy/layout/content edits if changes do not add auth or API dependencies.
- `client/src/components/*`: likely safe for presentational UI edits; avoid `ManusDialog`, AI, Map, auth-aware, or API-calling components without review.
- `client/src/index.css`: likely safe for styling/theme adjustments.
- `components.json`: shadcn/ui configuration appears frontend-oriented and likely safe for UI component work.
- Static marketing/content changes are likely safe if they do not touch environment variables, server routes, database, or auth flow.

## 4. Do not let Lovable edit without review

- Auth/OAuth/session files: `server/_core/sdk.ts`, `server/_core/oauth.ts`, `server/_core/cookies.ts`, `server/_core/context.ts`, `client/src/const.ts`, `client/src/_core/hooks/useAuth.ts`, `client/src/components/ManusDialog.tsx`.
- Backend/API files: `server/_core/index.ts`, `server/routers.ts`, `server/_core/trpc.ts`, `server/_core/systemRouter.ts`.
- Database files: `drizzle/*`, `drizzle.config.ts`, `server/db.ts`.
- Deployment/build config: `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `tsconfig*.json`, `vitest.config.ts`.
- Forge/Manus service integrations: `server/_core/llm.ts`, `server/storage.ts`, `server/_core/dataApi.ts`, `server/_core/imageGeneration.ts`, `server/_core/voiceTranscription.ts`, `server/_core/map.ts`, `client/src/components/Map.tsx`.
- Environment files: `.env.example` and any real `.env*` files.

## 5. Recommended next step

A. Connect to Lovable now for frontend/UI only.

Keep backend/auth/database/deployment changes outside Lovable or require developer review before merging. Before production, resolve Manus OAuth replacement, real environment variables, MySQL hosting, Forge/API proxy strategy, and Manus Vite/plugin assumptions.
