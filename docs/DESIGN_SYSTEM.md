# Design System

## Color

- Primary background: `#ffffff`
- Warm background: `#fcfbf9`
- Dark surface: `#101828`
- Primary text: `#101828`
- Secondary text: `#475467`
- Muted text: `#98a2b3`
- Border default: `#eaecf0`
- Border strong: `#d0d5dd`
- Orange primary: `#f55a0a`
- Orange accent: `#ff7a00`
- Orange dark: `#d9470d`
- Amber primary: `#ffa800`
- Amber soft: `#ffc56b`

Use orange and amber as guided accents, not dominant surface colors. Most of the interface should remain white, warm white, charcoal, and neutral.

## Typography

- Heading font: `Sora`
- Body font: `Inter`
- Hero title: `clamp(2.75rem, 7vw, 6rem)`
- Section titles: `clamp(2rem, 4vw, 4rem)`
- Body text: `1rem` to `1.25rem`
- Labels: approximately `0.72rem` to `0.74rem`

Keep heading contrast strong, line lengths controlled, and uppercase labels restrained.

## Spacing

- Outer page width: `1440px`
- Primary content width: `1280px`
- Horizontal padding: `24px` mobile, `40px` tablet, `64px` desktop
- Section spacing: `64px` to `136px` depending on breakpoint

## Radii

- Contained surfaces: `24px` to `32px`
- Pills and action elements: fully rounded

## Shadows

- Soft layout shadow: `var(--shadow-soft)`
- Card shadow: `var(--shadow-card)`
- CTA emphasis: orange-tinted elevation via `--orange-shadow`

## Buttons

- Primary: brand gradient background, white text, rounded full
- Secondary: white surface, neutral border, charcoal text

## Responsive Breakpoints

- Base/mobile: default styles
- `md`: tablet and navigation transition
- `lg`: desktop section layouts
- `xl`: expanded spacing and denser multi-column layouts

## Animation Principles

- Motion should guide attention, not perform spectacle.
- Use Motion for content reveal and small state transitions.
- Reserve GSAP for intro sequencing and tightly coordinated moments.
- Always support reduced motion and avoid scroll hijacking.
