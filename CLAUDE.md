# Axel Design Sandbox

## Tech Stack
- Next.js 14.2.35 (App Router, `src/` directory)
- React 19, Tailwind CSS v4 via `@tailwindcss/postcss`
- Font: Lato (300,400,700,900) via `next/font/google`

## Critical: Tailwind v4 CSS Cascade Layers
- Tailwind v4 uses `@import "tailwindcss"` + `@theme` in globals.css, NOT `tailwind.config.js`
- **NEVER add unlayered `*` resets** — they silently break every Tailwind utility
- Tailwind's preflight already includes box-model reset

## Project Structure
- `src/app/` — Next.js routes (dashboard, screen/[slug], flow/[slug], component/[slug])
- `src/projects/axel-one/screens/` — ported screen components (Importing, FlightDeals)
- `src/components/` — shared components (StatusBar, CTAButton, FlightCard, PriceChart)
- `src/dashboard/` — dashboard UI components (ScreenCard, StatusBadge, etc.)
- `src/data/` — JSON data files (flights, bookings, user-profile)
- `src/lib/data.js` — data access layer (TODO: replace with Supabase)
- `src/dashboard.config.js` — project/screen/flow/component registry

## Design Rules — Read Before Every Design Task
- **Always read `DESIGN_SYSTEM.md` before writing any UI code**
- Typography: 400 weight for all text, 600 only for screen titles / card titles / prices. NEVER 700.
- Colors: pink #EF508D = Axel identity only. Blue #0090FF = user-interactive CTAs. Never swap.
- Text hierarchy: primary #FFF, secondary #AAA, tertiary #666, caption #555
- Surfaces: bg #000, card #111, border #222

## Design Language
- Dark theme, 393×852 mobile frame, rounded-[30px]
- Color tokens: bg (#181818), bg-2 (#242424), card-bg (#212121), text-1 (#fff), text-2 (#989898), green (#4fc660), orange (#fb7a29)
- Screen components use `'use client'` (interactive)

## Figma Integration
- **Export rules**: See [FIGMA_EXPORT_RULES.md](FIGMA_EXPORT_RULES.md) — no text wrapping frames, 4-16px spacing (2px steps), no side strokes
- Figma file: `9pbBXxSus03lQbq9ErSCmO` ("Axel One")
- Node IDs configured in `dashboard.config.js`
- FigmaLinkButton opens correct Figma node URLs
- **Send to Figma**: Dashboard button creates capture requests via `/api/figma-capture`
  - Capture targets: "Captures", "Flow — Flight Hold", or custom page name
  - Requests stored in `src/data/captures.json`; MCP `generate_figma_design` fulfills them
  - PUT `/api/figma-capture` with `{ id, status: 'completed', figmaUrl }` to mark done

## Iteration System
- Components and screens support versioned iterations (A, B, C, D, E...)
- Metadata stored in `src/data/iterations.json`, file mappings in `dashboard.config.js`
- Version files: `FlightCard.B.jsx`, `Importing.C.jsx` (same directory as main)
- API routes:
  - `POST /api/iterations` `{ type, slug }` — create new version (copies main file)
  - `PUT /api/iterations` `{ type, slug, saveVersion }` — save version as main, archive others
  - `PATCH /api/iterations/notes` `{ type, slug, label, notes }` — update version notes
- Preview routes: `/preview/component/[slug]?v=B`, `/preview/screen/[slug]?v=B`
- Dashboard: IterationPanel shows all versions side-by-side with iframe previews
- Save: selected version overwrites main file, others move to `archive/` subdirectory
- Dynamic imports via `next/dynamic` with webpack context for versioned files

## SVG Imports
- Next.js webpack returns an object with `.src` property for static imports
- Use `src={img.src || img}` pattern for compatibility

## Spacing (from Figma)
- 16px: section-to-section gap
- 8px: between rows within cards
- 4px: header text line pairs
- Card padding: px-[16px] py-[12px], rounded-[8px]
- CTA: absolute top-[711px], px-[8px] py-[14px], rounded-[30px]
