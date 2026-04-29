# Lovable Frontend Map

## App type

React 19 + TypeScript app built with Vite 7. The package also includes an Express/tRPC backend bundled separately with esbuild, so Lovable should treat frontend work as limited to `client/` unless reviewed.

## Likely frontend entrypoints

- `client/index.html` — Vite HTML template and root `<div id="root">`.
- `client/src/main.tsx` — React render/bootstrap and tRPC client provider setup.
- `client/src/App.tsx` — app shell and Wouter route definitions.
- `client/src/index.css` — global CSS/theme styling.

## Likely page or route files

- `client/src/pages/` — page-level route components.
- `client/src/pages/Home.tsx` — main `/` page.
- `client/src/pages/Privacy.tsx` — `/privacy` page.
- `client/src/pages/NotFound.tsx` — fallback and `/404` page.
- `client/src/pages/ComponentShowcase.tsx` — component showcase page file found; route exposure unknown from inspected files.
- `client/src/App.tsx` — likely route map using Wouter.

## Likely component folders

- `client/src/components/` — custom frontend components.
- `client/src/components/ui/` — shadcn/Radix-style UI primitives.
- `client/src/contexts/` — React context providers.
- `client/src/hooks/` — frontend hooks.
- `client/src/lib/` — frontend utilities, including tRPC client wiring.
- `client/public/` — static assets.

## Styling approach

Tailwind CSS 4 with `@tailwindcss/vite`, CSS variables, Radix UI, and shadcn/ui-style components. `client/src/index.css` appears to be the primary global styling file.

## Safe frontend edit areas

- `client/src/pages/Home.tsx` for copy/layout/presentation changes.
- `client/src/pages/Privacy.tsx` for policy-page copy/layout changes.
- `client/src/pages/NotFound.tsx` for simple 404 presentation changes.
- Presentational components in `client/src/components/`, especially visual graphics such as `GTMGraphic.tsx`, `GTMStackGraphic.tsx`, and `InfraLayersGraphic.tsx`.
- `client/src/components/ui/` for small UI styling adjustments, with review if changing shared primitives broadly.
- `client/src/index.css` for controlled theme/style adjustments.
- `client/public/` for approved static image/favicon/text assets, except Manus debug assets.

## Avoid editing

- `client/src/main.tsx` because it wires tRPC, React Query, and API credentials behavior.
- `client/src/const.ts` because it builds OAuth login URLs and uses environment variables.
- `client/src/_core/` because readiness notes identify auth-related hooks there.
- `client/src/lib/trpc.ts` or API client utilities because they touch backend/API behavior.
- `client/src/components/ManusDialog.tsx` because it is auth/OAuth-facing.
- `client/src/components/AIChatBox.tsx` unless the AI/API interaction plan is reviewed.
- `client/src/components/Map.tsx` because it uses Forge/API key style environment variables.
- `client/public/__manus__/` because it is Manus debug tooling.
- `client/index.html` analytics, environment placeholders, metadata URLs, or script tags without review.
- Root build/deployment files such as `package.json`, `vite.config.ts`, and lock/config files.

## First UI task recommendation

Start with a small copy-only or spacing-only update on `client/src/pages/Home.tsx`, such as tightening one hero section headline/subheadline or adjusting a single section's visual spacing, then confirm the exact diff before broader UI changes.
