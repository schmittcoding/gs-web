---
name: GameSelect UI Component
description: Reusable dark-styled popover-based dropdown for gs-web — use instead of shadcn Select for any dropdown in this project
type: reference
---

`components/ui/game-select.tsx` — compound dropdown built on Radix Popover with the project's `shape-main` bevel aesthetic.

**Use this instead of shadcn `Select` for all dropdowns in gs-web.**

## Compound components

| Component | Purpose |
|-----------|---------|
| `GameSelect` | Root — accepts `value: string` and `onValueChange: (v: string) => void` |
| `GameSelectTrigger` | Styled trigger button — appends rotating `IconChevronDown` automatically |
| `GameSelectContent` | Dropdown panel — `max-h-[350px]`, `shape-main`, `divide-y divide-gray-800 p-0` |
| `GameSelectItem` | Clickable item — `data-active` driven, closes popover on click |

## Sizing via className

The trigger is intentionally unsized — pass layout via `className`:

```tsx
// Compact / single-line (filter toggles, etc.)
<GameSelectTrigger className="w-40 h-9 px-3 items-center">

// Rich / multi-line (snapshot picker, etc.)
<GameSelectTrigger className="relative w-full items-start px-5 py-3 whitespace-normal">
```

## Item padding override

Default item padding is generous (`pt-4 pl-5 pr-3 pb-4`) for rich multi-line content.
Override for compact text-only items:

```tsx
<GameSelectItem value="foo" className="px-4 py-2.5 text-sm">Foo</GameSelectItem>
```

## Example — compact filter dropdown

```tsx
<GameSelect value={value} onValueChange={setValue}>
  <GameSelectTrigger className="w-40 h-9 px-3 items-center">
    <span className="text-sm">{LABELS[value]}</span>
  </GameSelectTrigger>
  <GameSelectContent className="w-40">
    <GameSelectItem value="a" className="px-4 py-2.5 text-sm">Option A</GameSelectItem>
    <GameSelectItem value="b" className="px-4 py-2.5 text-sm">Option B</GameSelectItem>
  </GameSelectContent>
</GameSelect>
```

## Example — rich content dropdown

```tsx
<GameSelect value={selectedId} onValueChange={setSelectedId}>
  <GameSelectTrigger className="relative w-full items-start px-5 py-3 whitespace-normal">
    <section className="space-y-2" key={selected?.id}>
      <p>{selected?.label}</p>
      <section className="grid grid-cols-3">{/* stats */}</section>
    </section>
  </GameSelectTrigger>
  <GameSelectContent>
    {items.map((item) => (
      <GameSelectItem key={item.id} value={item.id} className="space-y-2">
        <p>{item.label}</p>
        <section className="grid grid-cols-3 gap-4">{/* stats */}</section>
      </GameSelectItem>
    ))}
  </GameSelectContent>
</GameSelect>
```
