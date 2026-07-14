# TattvaTech Website

Official parent-brand website for TattvaTech, built as a production-ready Next.js application. The site presents TattvaTech as the parent technology company while prioritizing TattvaTech Services as the currently active business vertical.

## Company Overview

TattvaTech is a founder-led technology company operated by Loukik Salvi, Rishit Singh, and Raunak. The brand is structured as a parent company with four business verticals:

- TattvaTech Services
- TattvaTech Products
- TattvaTech Drones
- TattvaTech Training

The current homepage emphasizes technical credibility, long-term ambition, clarity, and disciplined execution without fabricating scale or achievements.

## Technology Stack

- Next.js App Router
- React
- TypeScript in strict mode
- Tailwind CSS
- Motion
- GSAP
- Lenis
- Lucide React

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Development Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run check:assets
npm run validate:content
```

## Production Build

```bash
npm run build
npm run start
```

## Asset Locations

- Brand assets: `public/brand`
  - Full logo PNG: `public/brand/tattvatech-logo.png`
  - Isolated symbol PNG: `public/brand/tattvatech-symbol.png`
- Section imagery: `public/images`
- Temporary fallbacks: `public/placeholders`

## Environment Variables

Copy values from `.env.example` as needed.

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`

## Docker

Build and run the production container:

```bash
docker build -t tattvatech .
docker run -p 3000:3000 --env-file .env tattvatech
```

The Docker image uses Next.js standalone output and runs as a non-root user.

## Project Structure

```text
.github/              CI workflows
docs/                 Design, content, and animation documentation
public/               Brand assets, placeholders, and public imagery
scripts/              Validation and asset checks
src/
  app/                App Router entrypoints and metadata routes
  components/         UI, layout, cards, sections, animations
  constants/          Approved content and navigation data
  hooks/              Lightweight browser hooks
  lib/                Metadata, animation helpers, utilities
  styles/             Design tokens and shared animation styles
  types/              Shared TypeScript types
```

## Notes

- Keep all application code inside `src/`.
- Do not add fabricated business claims, testimonials, or achievements.
- Later homepage sections are intentionally scaffolded for future approved content drops.
