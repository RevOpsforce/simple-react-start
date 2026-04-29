# Lovable Guardrails

## Purpose
This repository was exported from Manus and is being connected to Lovable for frontend/UI work only.

The app has been validated to install, build, and start, but production readiness still depends on auth, OAuth, database, backend, and environment-specific decisions.

## Primary rule
Lovable may work on frontend/UI only unless explicitly instructed otherwise.

## Safe areas
Lovable may edit:
- visual layout
- page copy
- frontend styling
- frontend components
- frontend-only interaction states
- responsive UI behavior

## Restricted areas
Lovable must not edit without human review:
- auth logic
- OAuth logic
- tRPC routes or procedures
- MySQL/database logic
- server/backend logic
- API behavior
- environment variable names
- deployment configuration
- package dependencies
- build tooling
- vite configuration
- database schema or migrations

## Required workflow for Lovable
Before making changes, Lovable should:
1. State which files it plans to edit.
2. Confirm the change is frontend/UI-only.
3. Avoid restricted areas.
4. Make small, reviewable changes.
5. Preserve existing functionality.
6. Keep the app buildable.

## First Lovable instruction
Use this when connecting the repo to Lovable:

This app was exported from Manus and validated in GitHub. It installs, builds, and starts successfully. For now, work frontend/UI only. Do not modify auth, OAuth, tRPC, MySQL, database, server logic, API behavior, deployment settings, environment variable names, package dependencies, build tooling, or vite configuration. First inspect the frontend structure and propose a small UI-only plan before making changes.
