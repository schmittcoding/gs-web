---
name: gs-web-design
description: Build frontend components and pages for the Ran Online GS private MMORPG server web app — a Next.js 16 App Router project with shadcn/ui (radix-nova), Tailwind CSS v4, and a dark game-launcher aesthetic. Use this skill whenever the user asks to build, add, or design any page, component, section, form, table, widget, or dashboard feature in this project. Trigger even when the request doesn't explicitly mention design — if it's frontend work in gs-web, this skill applies.
---

This skill guides the creation of frontend UI for **Ran Online GS** (`gs-web`), a Next.js 16 App Router project. Every output must feel like it belongs to a dark, immersive game launcher — not a SaaS dashboard, not a generic template.

## Before writing any code

Read up to **5 existing files** that are closest to what you're building. Start with:
1. The most similar existing component (e.g. if building a rankings widget, read `components/dashboard/widgets/top-rankings.dashboard.tsx`)
2. The relevant `actions.ts` for the feature domain — this defines the real data types you'll build against
3. Any `types.*.ts` or `constants.*.ts` files in that feature domain

Do not skip this step. The existing code is the design system. Reading it before writing prevents style drift.

## File structure rules

Follow these exactly — no exceptions:

**Feature components**: `components/<domain>/<function>.<domain>.tsx`
- Examples: `content.events.tsx`, `card.rankings.tsx`, `dialog.recharge.tsx`

**Page files**: `app/(dashboard)/<route>/page.tsx`
- Always also generate the parallel header slot: `app/(dashboard)/@header/<route>/page.tsx`

**Server actions**: `app/(dashboard)/<route>/actions.ts` (or `components/<domain>/actions.<domain>.ts`)
- Always generated alongside the component — never omit

**Form schemas**: `components/<domain>/<form-name>.schema.ts`
- Every form gets a co-located Zod schema file

**Exports**: Named exports only — `export { MyComponent }` or `export function MyComponent() {}`

**Server vs client**:
- Default to Server Component — no `"use client"` unless state, hooks, or event handlers are needed
- Add `"use client"` silently at the top when required — no comment needed

## Visual identity — the Ran Online GS look

The target aesthetic is a **modern dark game launcher**: immersive, atmospheric, high contrast. Think Battle.net or a polished private server portal — not a SaaS product.

### Palette — use CSS variables, never hardcode

| Token | Value | Use |
|-------|-------|-----|
| `--background` | cod-gray-950 (`#0f0f0f`) | Page background |
| `--card` | cod-gray-900 (`#1a1a1a`) | Card/panel background |
| `--primary` | orange-peel-500 (amber) | Brand accent, CTAs, highlights |
| `--muted-foreground` | gray-500 | Subdued labels |
| `--border` | cod-gray-800 / `border-gray-800` | Card borders |
| `--foreground` | cod-gray-100 | Body text |

**Forbidden**: `bg-white`, `bg-gray-50`, `bg-slate-*`, `border-gray-200`, any light-mode background. Cards are always dark.

### Typography

- Font: **Oxanium only** — it's set as `--font-sans` in the theme. Never introduce a second font family.
- Labels/meta: `text-[10px] font-semibold uppercase tracking-widest text-gray-500` — the project's signature label style
- Section headers: `font-black uppercase tracking-tight`
- Numbers/stats: add `tabular-nums` for alignment

### Shape language

Apply `shape-main` to all **cards, panels, and interactive containers**. This is the project's signature bevel corner — `border-radius: 0 12px` with CSS corner-shape. Do not use `rounded-full` pill shapes on cards or containers.

```tsx
// Correct — every card uses shape-main
<Card className="shape-main border border-gray-800 ...">

// Wrong — generic rounding
<Card className="rounded-lg ...">
```

### Atmospheric layering

Every non-trivial page section should have visual depth. The standard approach:

```tsx
{/* Ambient glow — brand color at corner */}
<div className="absolute -right-16 -top-16 h-75 w-75 rounded-full opacity-[0.06]"
  style={{ background: "radial-gradient(circle, var(--color-orange-peel-500), transparent 70%)" }} />

{/* Subtle grid texture */}
<div className="absolute inset-0 opacity-[0.03]"
  style={{ backgroundImage: "linear-gradient(var(--color-cod-gray-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-cod-gray-400) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

{/* Gradient mask — keeps content readable */}
<div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/95 to-transparent" />

{/* Accent line — brand color hairline at bottom */}
<div className="absolute bottom-0 left-0 h-0.5 w-1/3 bg-linear-to-r from-primary to-transparent" />
```

Use the full treatment on hero/welcome cards and major section containers. Use only the accent line on simpler components.

### Tables and data grids

Apply the game aesthetic — not stock table styling:

```tsx
<td className="leaderboard-cell ...">
```

The `leaderboard-cell` class from `globals.css` provides the bevel corner treatment for table cells. Use it on all data grid rows.

### Backgrounds for different contexts

- **Dashboard components**: subtle gradient depth + accent line. No diamond pattern.
- **Item shop**: uses the heavy `item-shop` CSS class with fixed grid + diamond pattern (already defined in `globals.css`). Do not apply this outside item shop.
- **Landing/public pages**: use `ran-scan-fx`, `ran-fade-up-*` animations and stronger atmospheric layering.

## Animations — ran-* convention

**All custom animations go in `app/globals.css`** with the `ran-` prefix. Never define `@keyframes` inside a component file.

Existing animation classes to use (don't redefine):
- `ran-fade-up-1` through `ran-fade-up-5` — staggered entrance (use for cards, stats, content)
- `ran-scan-fx` — HUD scanline sweep (use on landing page hero overlays)
- `ran-sweep-line` — horizontal sweep reveal (use on decorative lines)
- `ran-glow-pulse` — amber glow breathe (use on accent elements)
- `ran-flicker` — neon flicker (use sparingly on decorative text/borders)

When you need a new animation not covered above:
1. Define `@keyframes ran-<name>` in `globals.css`
2. Create a `.ran-<name>` utility class below it
3. Reference the class in JSX

## Buttons

- **Primary CTAs** → `GameButton` from `@/components/common/game.button`
- **Secondary/utility** → shadcn `Button` from `@/components/ui/button`
- **Icon-only** → `Button` with `size="icon"` or `size="icon-sm"`

`GameButton` extends the shadcn Button and adds loading state with `IconLoader2`. Use it for any action that triggers a server operation.

## Server actions pattern

Every `actions.ts` must:
- Start with `"use server"`
- Use `fetcherPrivate` from `@/lib/fetcher` for authenticated API calls
- Handle `401` with `redirect(AUTH_CONFIG.loginPath)` from `@/lib/constants`
- Return typed responses (never `any`) with a `success: boolean` field

```ts
"use server";

import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";

type MyResponse = {
  success: boolean;
  data: MyDataType | null;
};

export async function getMyData(): Promise<MyResponse> {
  const res = await fetcherPrivate("/v1/my-endpoint");

  if (!res.ok) {
    if (res.status === 401) redirect(AUTH_CONFIG.loginPath);
    return { success: false, data: null };
  }

  return res.json();
}
```

## Zod schemas

Co-locate with the feature, named `<form-name>.schema.ts`:

```ts
import { z } from "zod";

export const myFormSchema = z.object({
  field: z.string().min(1, "Required"),
});

export type MyFormValues = z.infer<typeof myFormSchema>;
```

## Icons

Always import directly from `@tabler/icons-react`. Use the `Icon` prefix naming.

```tsx
import { IconShoppingCartPlus, IconLoader2, IconChevronRight } from "@tabler/icons-react";
```

Default icon size is `size-4` via CSS. Add `data-icon="inline-start"` or `data-icon="inline-end"` when positioning within a button or input.

## Class utilities

- Use `cn()` from `@/lib/utils` for all conditional or merged class names
- Use CVA (`cva`) for components with multiple variants — see `button.tsx` as reference
- Use `data-slot="<name>"` attributes for compound component CSS targeting
- Use `data-state`, `data-variant`, `data-unavailable` attributes for CSS-driven state styling

## Hard rules — what never appears in output

- No `bg-white`, `bg-gray-50`, or any light background on cards/panels
- No hardcoded color values (`#fff`, `rgb(...)`) — CSS variables only
- No inline `style={{}}` props except for complex gradients that require CSS variable interpolation (same pattern as welcome-card)
- No lorem ipsum, placeholder text, or gray stub boxes — build against real types from the actions file
- No `export default` for feature components — named exports only
- No second font family — Oxanium only
- No `rounded-full` or generic `rounded-lg` on cards — use `shape-main`
- No `border-gray-200` or any light border — use `border-gray-800`

## Output format

Write all files first. Then end with a concise checklist:

```
Files created:
- components/events/my-component.events.tsx
- app/(dashboard)/events/my-route/page.tsx
- app/(dashboard)/@header/events/my-route/page.tsx
- app/(dashboard)/events/my-route/actions.ts
```

No preamble. No explanation of design choices unless asked. Ship the files.
