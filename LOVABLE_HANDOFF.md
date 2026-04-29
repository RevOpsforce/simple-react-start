# Lovable Handoff

## Project status
This app was exported from Manus and has been validated in GitHub. It can be connected to Lovable for frontend/UI work only. Production readiness still depends on resolving auth, OAuth, database, backend, and environment-specific concerns.

## What Lovable can edit
Lovable may inspect and edit frontend/UI files only, including visual layout, copy, styling, components, and page-level presentation.

## What Lovable must not edit without review
Lovable must not modify:
- auth or OAuth logic
- tRPC routes or procedures
- MySQL or database logic
- server/backend logic
- API behavior
- environment variable names
- deployment configuration
- package dependencies unless explicitly approved

## First prompt to give Lovable
This app was exported from Manus and validated in GitHub. It installs, builds, and starts successfully.

For now, work on frontend/UI only.

Rules:
- Preserve existing functionality.
- Do not modify auth, OAuth, tRPC, MySQL, database, server logic, API behavior, deployment settings, or environment variable names.
- Do not redesign the app yet.
- First, inspect the frontend structure and summarize the main pages, routes, components, and styling approach.
- Do not make code changes until I approve the frontend plan.

## Ongoing Lovable rules
- Make small frontend-only changes.
- Explain what files will change before editing.
- Avoid backend, auth, database, and deployment files.
- Do not introduce new libraries without approval.
- Keep the app buildable.
