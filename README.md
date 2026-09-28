# Exam Chronicle

Exam Chronicle is a GCSE & A-Level revision and past-paper tracking PWA.

## Current release: Phase 34

Phase 34 focuses on iPhone/Safari reliability and release hardening:

- Dynamic iPhone viewport support using `100dvh` with fallback.
- 16px form controls to prevent Safari input zoom.
- Improved touch targets and touch behaviour.
- Relative Vite/PWA paths for GitHub Pages project deployments.
- Relative manifest start/scope URLs.
- Service worker cache bumped to v34 with safer offline fallback.
- Existing course, assignment and study data structures unchanged.

## Build

```bash
npm ci
npm run build
```

The production output is written to `dist/`.

## Netlify

This repository already contains `netlify.toml` configured to run the Vite build and publish `dist`.

## GitHub Pages

The Vite base path is relative, so the production build can be served from a repository sub-path such as:

`https://deanmbaxter1973-dotcom.github.io/Examc/`

GitHub Pages still needs to be enabled in repository settings or deployed through a Pages workflow.
