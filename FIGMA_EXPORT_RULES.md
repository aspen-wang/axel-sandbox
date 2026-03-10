# Figma Export Rules

Rules for generating components that export cleanly to Figma via HTML-to-Design capture.

## Rule 1: No Wrapping Frames on Standalone Text

Never wrap a single text element in a `<div>`, `<span>`, or any container frame. Text nodes must be direct children of their parent layout — no extra wrappers.

**Bad:**
```jsx
<div className="flex ...">
  <div><span className="text-sm text-text-2">Apr 15 - 18, 2026</span></div>
</div>
```

**Good:**
```jsx
<div className="flex ...">
  <span className="text-sm text-text-2">Apr 15 - 18, 2026</span>
</div>
```

- If a text element needs padding or background, that is the only exception — and the wrapper must have a visible purpose (e.g., a pill/badge with `bg-*` and `rounded-*`).
- Inline icons next to text: place both as siblings in the same flex row, not wrapped in separate frames.

## Rule 2: Spacing Scale — 4px to 16px, 2px Steps Only

All `margin`, `padding`, `gap`, and spacing values must use this scale:

```
4px, 6px, 8px, 10px, 12px, 14px, 16px
```

- Minimum: **4px**
- Maximum: **16px**
- Step size: **2px** increments only
- No odd values (no 3px, 5px, 7px, 9px, 11px, 13px, 15px)
- No values below 4px (no 1px, 2px spacing)
- No values above 16px for inner spacing (outer page padding like 48px is fine for export layout only, not component internals)

**Tailwind mapping:**
| Value | Tailwind class |
|-------|---------------|
| 4px   | `p-[4px]`, `gap-[4px]`, `m-[4px]` |
| 6px   | `p-[6px]` |
| 8px   | `p-[8px]`, `gap-[8px]` |
| 10px  | `p-[10px]` |
| 12px  | `p-[12px]`, `gap-[12px]` |
| 14px  | `p-[14px]` |
| 16px  | `p-[16px]`, `gap-[16px]` |

## Rule 3: No Side Stroke / Left Border Accents

Never use a left-side (or any single-side) border/stroke as a visual accent on cards. This includes:

- `border-l-*` (left border)
- `border-r-*` (right border)
- Pseudo-elements that simulate a side stripe
- Any vertical accent bar on the edge of a card

**Bad:**
```jsx
<div className="rounded-[8px] bg-card-bg border-l-[3px] border-l-green">
  ...
</div>
```

**Good:**
```jsx
<div className="rounded-[8px] bg-card-bg">
  ...
</div>
```

- Cards should use uniform borders (`border border-white/10`) or no border at all.
- If a visual indicator is needed, use a colored pill/badge, icon, or background tint instead.

## Rule 4: Auto Layout for Badges, Chips, and Background Containers

Any element with a visible background (`bg-*`), badge, chip, or pill must use flex (auto layout). Auto layout sizing must always be either **fill** (stretch to parent width) or **hug** (shrink to content) — never fixed width/height.

Use `padding` and `gap`/`margin` to create space — never use fixed `width`/`height` to size these elements.

**Bad:**
```jsx
<div className="w-[80px] h-[28px] bg-white/10 rounded-full text-center">
  LOW
</div>
```

**Good:**
```jsx
<div className="inline-flex items-center px-[10px] py-[4px] bg-white/10 rounded-full">
  LOW
</div>
```

- **Hug content**: Use `inline-flex` + padding. The element sizes itself to its text/icon content.
- **Fill container**: Use `flex w-full` or `self-stretch`. The element stretches to match its parent.
- Never set explicit `w-[Npx]` or `h-[Npx]` on badges/chips — let padding + content determine size.
- Spacing between items inside a badge: use `gap-[4px]` or `margin-right` on children, not fixed widths.

## General Export Guidelines

- Use `margin-bottom` / `margin-right` on children instead of `gap` on parent — nested auto-layout gap values get lost in Figma capture.
- Keep component hierarchy flat — fewer nested divs means cleaner Figma layers.
- All card `border-radius`: use `rounded-[8px]` or `rounded-[12px]` only.
- Text should use design system colors (`text-text-1`, `text-text-2`, `text-green`, `text-orange`) — no raw hex in components.
