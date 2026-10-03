# 🎹 Shraddha's Music Academy — Design System

This is the **approved** design system from the client's design handoff
(`design_handoff_shraddha_music_site/README.md`), implemented in
`frontend/src/styles/tokens.css`. It supersedes the earlier exploratory
palette that used to live in this file.

## Color Palette

| Token | Hex Code | Usage |
|---|---|---|
| Purple | `#3e1f66` | Nav, headings, primary buttons, table header |
| Purple deep | `#2c1549` | Footer, video surround |
| Purple darkest | `#1e0f33` | Deepest accents |
| Purple hover | `#2a1446` | Hover state for purple buttons |
| Gold | `#d6a63b` | Accents, active nav underline, CTA-on-purple button, borders |
| Gold hover | `#e3b957` | Gold button hover |
| Gold text | `#8a6a1e` | Gold-toned text on light backgrounds |
| Lavender 100 | `#efe9f6` | Chip backgrounds |
| Lavender 200 | `#f6f2fa` | Alternating table rows |
| Border lavender | `#e2d9ee` | Card/table borders |
| On-purple text | `#d9cfe8` | Body text on purple backgrounds |
| On-purple text muted | `#b7a3d6` | Footer text on purple |
| Page ground | `#faf8fc` | Page background |
| Text body | `#231a30` | Default body text |
| Text secondary | `#4a4057` / `#5e5850` | Secondary copy |

## Typography

- **Font family**: Montserrat (Google Fonts), weights 400/500/600/700/800, used everywhere.
- Caveat (used for annotations in the design wireframes) is **not** shipped — it was hand-lettered designer notes, not UI copy.
- Nav: 600 weight, 13px, uppercase, letter-spacing 0.06em.
- H1 (hero): 800 weight, `clamp(32px, 5vw, 56px)`, line-height 1.08.

## Radii

| Token | Value | Usage |
|---|---|---|
| Card | 16px | Tiles, table container |
| Modal | 20px | Course detail modal |
| Pill | 999px | Buttons, chips, filter pills |

## Layout

- Content max-width: `1120px`
- Horizontal padding: `clamp(20px, 5vw, 48px)`
- Buttons are pills, minimum 48px tall on hi-fi pages.
- Focus ring: `2px solid #d6a63b`, 2px offset, on all interactive elements.

## Components

### Buttons
- Primary: purple background, white text.
- Secondary: white background, purple border/text.
- Gold (CTA on purple backgrounds): gold background, dark purple text.

### Cards / tiles
- White background, `#e2d9ee` border, 16px radius.
- Hover: `translateY(-3px)`, purple border, `0 10px 22px rgba(62,31,102,.18)` shadow.

### Tables
- Header row: purple background, white 700 weight 9.5px uppercase text.
- Rows alternate white / `#f6f2fa`.

## Logo Concepts (historical — do not use)
The client's approved logo lockup is `assets/shraddha-lockup.png`
("Shraddha's Music Academy", purple/gold wordmark). It's a temporary
client file (`logo_temp`) — the codebase currently ships a placeholder
SVG wordmark (`frontend/src/components/Logo.jsx`) until the final vector
logo is provided.

## Open questions for the client
- Official name: "Shraddha's Music Academy" (logo) vs. "Shraddha Music Studio" (About page copy).
- Free assessment session length: 20 vs. 30 minutes.
- "Know the musician" bio content, course modal overview copy, and Home hero copy are placeholders pending client sign-off.

---

**Target audience**: Parents of young piano learners, ages 4–10.
