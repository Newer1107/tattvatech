# Animation Architecture

## Intro Timeline

- `WebsiteIntro` decides whether the intro should render.
- `useIntroSession` stores a session flag in `sessionStorage`.
- `IntroTimeline` owns the GSAP intro sequence and calls `onComplete` when finished.

## GSAP Ownership

- GSAP is used only for coordinated intro choreography.
- Each GSAP component must create animations inside a scoped context and clean them up with `ctx.revert()`.
- Do not scatter GSAP selectors across unrelated sections.

## Motion Usage

- Use `motion/react` for section reveals, mobile menu transitions, and view-based content animation.
- Prefer reusable presets from `src/lib/animations.ts`.

## Cleanup Requirements

- All animated effects must clean up listeners, `requestAnimationFrame` loops, and third-party instances.
- `SmoothScroll` must destroy the Lenis instance on unmount.

## Reduced Motion

- Respect `prefers-reduced-motion`.
- Skip the intro timeline and smooth scrolling when reduced motion is enabled.
- CSS transitions are globally minimized in `src/styles/animations.css`.

## Session-Based Intro Behavior

- The intro plays once per browser session.
- Refreshing the site in the same session should not replay the full overlay.
- Clearing session storage will allow the intro to run again.
