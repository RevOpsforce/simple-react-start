# Lovable Connect Checklist

## Status
This repo is ready to connect to Lovable for frontend/UI work only.

Do not use Lovable for backend, auth, database, API, deployment, package, or build-tool changes unless explicitly reviewed and approved.

## Before connecting to Lovable
- Confirm the latest GitHub branch includes:
  - LOVABLE_READINESS_MINI.md
  - LOVABLE_HANDOFF.md
  - LOVABLE_FRONTEND_MAP.md
  - LOVABLE_GUARDRAILS.md
  - .github/copilot-instructions.md
  - VALIDATION_REPORT.md
  - MIGRATION_AUDIT.md
- Connect the GitHub repo to Lovable.
- Start with inspection only.
- Do not ask Lovable to redesign or rebuild the app yet.

## First Lovable prompt
This app was exported from Manus and validated in GitHub. It installs, builds, and starts successfully.

For now, work frontend/UI only.

Before making changes:
1. Read LOVABLE_HANDOFF.md, LOVABLE_FRONTEND_MAP.md, and LOVABLE_GUARDRAILS.md.
2. Inspect the frontend structure only.
3. Summarize the main pages, routes, components, and styling approach.
4. Propose one small frontend/UI-only first change.
5. Do not edit files until I approve the plan.

Rules:
- Preserve existing functionality.
- Do not modify auth, OAuth, tRPC, MySQL, database, server logic, API behavior, deployment settings, environment variable names, package dependencies, build tooling, or vite configuration.
- Do not redesign the app yet.
- Do not introduce new libraries.
- Keep changes small and reviewable.

## Safe first task ideas
- Update homepage copy.
- Improve spacing or responsive layout on one page.
- Adjust button labels or calls to action.
- Polish one existing component visually.
- Improve empty states or loading states if frontend-only.

## Stop conditions
Stop and ask for review if a task requires:
- auth changes
- database access
- backend/server changes
- API changes
- new environment variables
- package installs
- deployment changes
- vite/build configuration changes
