# Project Structure

## Repository Shape

This repository is intentionally a single Next.js application. Root-level folders are reserved for:

- `.github`
- `docs`
- `public`
- `scripts`
- `src`

Do not convert this project into a monorepo unless the product direction explicitly changes.

## Source Layout

- `src/app`: routing, metadata, globals, and app entrypoints
- `src/components/animations`: GSAP timelines, reveal helpers, and lightweight motion wrappers
- `src/components/cards`: reusable content cards
- `src/components/layout`: page shell, navbar, footer, wrappers
- `src/components/sections`: homepage sections in approved order
- `src/components/ui`: small reusable primitives
- `src/constants`: approved content and navigation data
- `src/hooks`: browser hooks for intro, media, and scroll behavior
- `src/lib`: metadata, utilities, and shared animation presets
- `src/styles`: tokens and shared CSS helpers
- `src/types`: shared TypeScript types

## Asset Layout

- `public/brand`: official brand files
- `public/images`: section-specific imagery for future expansion
- `public/placeholders`: temporary visual stand-ins
- `public/icons`: reserved for future icon assets

## Extension Rules

- New code should be added inside existing feature-appropriate folders.
- Prefer reusable components and constants over inline duplication.
- Keep homepage sections aligned with the approved structure.
