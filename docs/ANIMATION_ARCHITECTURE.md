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

- GSAP is the primary system for scroll-linked motion, section choreography, and coordinated transitions.
- `motion/react` is reserved for lightweight UI state transitions such as the mobile menu.
- Prefer reusable configuration from `src/animations/`.

## Cleanup Requirements

- All animated effects must clean up listeners, `requestAnimationFrame` loops, and plugin instances.
- `useGSAP` or scoped GSAP contexts should own cleanup for section and intro timelines.

## Reduced Motion

- Respect `prefers-reduced-motion`.
- Skip the intro timeline and smooth scrolling when reduced motion is enabled.
- CSS transitions are globally minimized in `src/styles/animations.css`.

## Session-Based Intro Behavior

- The intro plays once per browser session.
- Refreshing the site in the same session should not replay the full overlay.
- Clearing session storage will allow the intro to run again.
