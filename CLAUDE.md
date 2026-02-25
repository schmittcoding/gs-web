# CLAUDE.md

## Project Purpose

`gs-web` is a Next.js 16 application serving as a UI component showcase and foundation for building feature-rich interfaces. It uses shadcn/ui components built on Radix UI primitives, styled with Tailwind CSS v4, and organized as a component library starter.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 (PostCSS), CSS variables (oklch) |
| Components | shadcn/ui (radix-nova style), Radix UI, Base UI |
| Icons | Tabler Icons (`@tabler/icons-react`) |
| Variants | class-variance-authority (CVA) |
| Class merging | clsx + tailwind-merge via `cn()` in `lib/utils.ts` |
| Package manager | pnpm |

---

## Architecture

```
gs-web/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home page
│   └── globals.css         # Tailwind + CSS variable theme
├── components/
│   ├── ui/                 # shadcn/ui primitive components
│   └── *.tsx               # Feature/showcase components
├── lib/
│   └── utils.ts            # cn() utility
└── components.json         # shadcn/ui CLI configuration
```

- **App Router only** — no pages directory.
- **Server Components by default**; add `"use client"` only when needed (state, event handlers, browser APIs).
- **No API routes yet** — add them under `app/api/` following Next.js App Router conventions.
- **No global state management yet** — use React context or a lightweight store if needed, wrapping in `app/layout.tsx`.

---

## Coding Conventions
Functions: camelCase

### Components

- **Files**: kebab-case (`alert-dialog.tsx`, `component-example.tsx`)
- **Exports**: PascalCase named exports — no default exports for components
- **Props**: Extend native HTML element props where appropriate:
  ```ts
  type ButtonProps = React.ComponentProps<"button"> & { variant?: ButtonVariant }
  ```
- **Compound components**: Use the pattern from `card.tsx` — multiple named exports (`Card`, `CardHeader`, `CardContent`, etc.)
- **Slot pattern**: Use `data-slot="<name>"` attributes to target child elements in CSS

### Styling

- Use `cn()` from `@/lib/utils` for all conditional/merged class names
- Use CVA (`cva`) for components with multiple variants — see `button.tsx` as the reference
- Use CSS variables from `globals.css` for all colors — never hardcode color values
- Tailwind utility classes only — no inline `style` props unless absolutely necessary
- Dark mode via `.dark` class on `<html>` — all CSS variables have dark mode overrides

### TypeScript

- Strict mode is on — no `any`, no type assertions without a comment explaining why
- Prefer `type` over `interface` for props
- Use `React.ComponentProps<"element">` for prop spreading
- Path alias `@/` maps to the project root — use it for all internal imports

### Icons

- Always use Tabler Icons (`@tabler/icons-react`)
- Import icons with the `Icon` prefix (e.g., `IconDownload`, `IconX`, `IconCheck`)
- Default size is `size-4` (via CSS)
- Use `data-icon="inline-start"` or `data-icon="inline-end"` attributes for positioning within buttons/inputs

---

## Common Tasks

### Adding a new UI component

1. If it's a shadcn/ui component, use the CLI:
   ```bash
   pnpm dlx shadcn@latest add <component-name>
   ```
   This respects `components.json` and places files in `components/ui/`.

2. For a custom component, create `components/ui/<name>.tsx`, following the compound-component + CVA pattern from existing files like `button.tsx` or `card.tsx`.

3. Export the component and any sub-components as named exports.

### Adding a new page

1. Create `app/<route>/page.tsx` — it's a Server Component by default.
2. Add `"use client"` only if the page needs interactivity at the top level.
3. Reuse layout wrappers from `app/layout.tsx` — avoid duplicating font or metadata setup.

### Adding an API route

1. Create `app/api/<route>/route.ts`.
2. Export named HTTP method handlers: `GET`, `POST`, etc.
3. Use `NextResponse.json()` for responses.

### Debugging

- **Component not rendering**: Check whether it needs `"use client"` — hooks and event handlers require it.
- **Styles not applying**: Confirm Tailwind classes aren't being purged (dynamic class names must be complete strings, not concatenated). Check that CSS variables are defined in `globals.css` for both light and dark modes.
- **Type errors on props**: Extend `React.ComponentProps<"element">` instead of writing props from scratch to get full HTML attribute support.
- **shadcn/ui component broken after update**: Re-run `pnpm dlx shadcn@latest add <component>` — shadcn components are vendored and may need manual re-generation.
- **`cn()` not merging correctly**: Tailwind v4 class conflicts are resolved by `tailwind-merge`; if overrides aren't working, check class ordering and specificity.

### Theming / Design tokens

All design tokens live in `app/globals.css` as CSS custom properties under `:root` (light) and `.dark`. The color system uses `oklch()`. To change a color, update the variable — never patch individual component files.

---

## Do Not

- Do not use `pages/` directory — this project uses App Router exclusively.
- Do not hardcode colors — use CSS variables.
- Do not use default exports for components.
- Do not install a second icon library — use Tabler Icons exclusively.
- Do not add `style={{}}` props for layout — use Tailwind utilities.
- Do not create new utility functions in component files — put them in `lib/`.