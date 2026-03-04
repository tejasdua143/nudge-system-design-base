# @paids/ui

A design system built on Tailwind CSS v4, Radix UI, and React. Ships 56 production-ready components with a three-layer token architecture, dark mode, and LLM-readable specs.

## Installation

```bash
npm install @paids/ui
```

### Setup

Run the init CLI to configure your project automatically — this sets up AI assistant instructions (CLAUDE.md) and a token audit script:

```bash
npx @paids/ui init
```

### CSS

Add to your main CSS file:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@paids/ui/styles.css";

@source "../node_modules/@paids/ui/dist";
```

The `@source` directive tells Tailwind v4 to scan the package for utility classes.

### Dark Mode

Add `className="dark"` to your `<html>` element, or use [next-themes](https://github.com/pacocoursey/next-themes).

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@paids/ui"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary" tone="default">
          Click me
        </Button>
      </CardContent>
    </Card>
  )
}
```

## Components

Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, Context Menu, Dialog, Direction, Drawer, Dropdown Menu, Empty, Field, Form, Hover Card, Input, Input Group, Input OTP, Item, Kbd, Label, Menubar, Native Select, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner (Toast), Spinner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip

## Token Architecture

The design system uses a three-layer token system. Never hardcode colors, spacing, or typography values — use tokens instead.

| Layer | Prefix | Rule |
|-------|--------|------|
| 1 — Palette | `--paids-*` | Raw hex values. Never use directly in components. |
| 2 — Semantic | `--bg-*`, `--text-*`, `--border-*`, `--shadow-*` | Meaningful aliases. Switch automatically in dark mode. |
| 3 — Components | Tailwind utilities | Reference Layer 2 via `bg-bg-brand`, `text-text-primary`, etc. |

### Common mappings

| Instead of | Use |
|---|---|
| `bg-[#ff5500]` | `bg-bg-brand` |
| `text-[10px]` | `text-[length:var(--text-2xs)]` |
| `rounded-[4px]` | `rounded-[var(--radius-checkbox)]` |
| `ring-[3px]` | `ring-[length:var(--focus-ring-width)]` |
| `border-[1.5px]` | `border-[length:var(--border-width-thick)]` |
| `leading-[1.43]` | `leading-[var(--leading-body)]` |

## Token Audit

Run before committing to enforce token usage:

```bash
npx paids-audit
```

Zero errors required. The script scans for hardcoded visual values and suggests the correct token.

## AI-Assisted Development

This package ships with LLM-readable specs so AI coding assistants (Claude Code, Cursor, etc.) can reference them automatically.

After running `npx @paids/ui init`, your CLAUDE.md is configured to point assistants to:

- `node_modules/@paids/ui/specs/foundations/` — color, spacing, typography, radius, elevation, motion
- `node_modules/@paids/ui/specs/components/` — per-component specs
- `node_modules/@paids/ui/specs/tokens/token-reference.md` — master map of all CSS variables

## CSS Imports

The package exports CSS at multiple granularity levels:

```css
@import "@paids/ui/styles.css";   /* Everything (recommended) */
@import "@paids/ui/globals.css";  /* Theme + tokens only */
@import "@paids/ui/tokens.css";   /* Spacing, typography, radius, motion only */
```

## Peer Dependencies

- `react` ^18 or ^19
- `react-dom` ^18 or ^19
- `tailwindcss` ^4
- `next-themes` (optional — only needed for Sonner/toast)

## License

Private — internal use only.
