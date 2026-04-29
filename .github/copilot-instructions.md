# Copilot Instructions

This repository was exported from Manus and is being prepared for Lovable.

## Current migration status
The app has already been validated to install, build, and start successfully.

Lovable migration recommendation:
Use Lovable for frontend/UI work only unless a human explicitly approves backend, auth, database, API, deployment, or build changes.

## Primary rule
Preserve existing functionality. Make small, reviewable changes.

## Allowed by default
Copilot may help with:
- documentation
- frontend/UI mapping
- frontend-only component changes
- copy changes
- styling changes
- small visual layout changes
- README or handoff documentation

## Restricted without explicit approval
Do not modify these areas unless specifically instructed:
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

## Validation expectations
When making code changes, run the relevant install/build/check commands when available and document the results honestly.

Do not claim that commands were run unless they were actually executed.

## Migration docs
Important migration files:
- LOVABLE_READINESS_MINI.md
- LOVABLE_HANDOFF.md
- LOVABLE_FRONTEND_MAP.md
- LOVABLE_GUARDRAILS.md
- VALIDATION_REPORT.md
- MIGRATION_AUDIT.md
