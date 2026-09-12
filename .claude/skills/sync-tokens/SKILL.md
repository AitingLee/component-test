---
description: Sync design tokens from `design-guideline.json` into `src/styles/globals.css`
---

## Step 1 — Read design-guideline.json

Read the file and extract:
- `palette` — all color steps and their hex values
- `semantic.light` — token references (required)
- `semantic.dark` — token references (optional; absent means no dark mode)
- `typography.fonts` and `typography.imports`
- `spacing.scale` — the raw step scale (required)
- `spacing.semantic` — named roles that reference a scale step (optional; often empty until components need one)
- `border-radius.scale` — the raw step scale (required)
- `border-radius.semantic` — named roles that reference a scale step (optional; often empty until components need one)

## Step 2 — Check if semantic tokens are filled

Count how many values in `semantic.light` are empty strings (`""`).

If more than half are empty, stop and explain to the designer:

> Your `semantic` tokens are not filled in yet. Each value should reference a palette step using this syntax:
>
> ```
> "{palette.brand.600}"
> "{palette.neutral.100}"
> "{palette.white}"
> "{palette.black}"
> ```
>
> The path follows the structure of your `palette` object. Fill in `semantic.light` (and `semantic.dark` if needed) in `design-guideline.json`, then run `/sync-tokens` again.

If semantic tokens are sufficiently filled, continue to Step 3.

## Step 3 — Resolve references

References point at a scale step and always include the full path from the JSON root, including the domain name.

- Color: `{palette.brand.600}` → look up `palette.brand["600"]`. Also `{palette.white}` → `#FFFFFF`, `{palette.black}` → `#000000`.
- Spacing: `{spacing.scale.md}` → look up `spacing.scale["md"]`.
- Border radius: `{border-radius.scale.sm}` → look up `border-radius.scale["sm"]`.

Skip a token if:
- The semantic value itself is empty (`""`)
- The referenced path does not exist or is empty

## Step 4 — Derive CSS variable names

CSS variable names are derived automatically from the token path.

**Color tokens** — Rule: `semantic.light.<category>.<token>` → `--color-<category>-<token>`

| Token path example | CSS variable |
|---|---|
| `semantic.light.brand.primary` | `--color-brand-primary` |
| `semantic.light.brand.hover` | `--color-brand-hover` |
| `semantic.light.text.default` | `--color-text-default` |
| `semantic.light.text.muted` | `--color-text-muted` |
| `semantic.light.surface.page` | `--color-surface-page` |
| `semantic.light.feedback.error` | `--color-feedback-error` |
| *(any category).(any token)* | `--color-<category>-<token>` |

Dark mode uses the same variable names but sourced from `semantic.dark`.

**Spacing and border radius** — scale steps and semantic roles share the same CSS namespace, so a semantic role name must never collide with a scale step name:

| Source | CSS variable |
|---|---|
| `typography.fonts.display` | `--font-display` |
| `typography.fonts.body` | `--font-body` |
| `spacing.scale.<key>` | `--spacing-<key>` |
| `spacing.semantic.<role>` | `--spacing-<role>` |
| `border-radius.scale.<key>` | `--radius-<key>` |
| `border-radius.semantic.<role>` | `--radius-<role>` |

## Step 5 — Write to globals.css

Read `src/styles/globals.css` and apply the following changes:

### 5a — Font imports
If `typography.imports` has entries, add each URL as an `@import` at the very top of the file, before `@import "tailwindcss"`. Skip any URL already present.

### 5b — Light mode colors
Replace everything between `/* COLORS:START */` and `/* COLORS:END */` inside `@theme { }` with the resolved light mode color variables, one per line, indented two spaces.

### 5c — Dark mode colors
If `semantic.dark` exists: replace everything between `/* COLORS:START */` and `/* COLORS:END */` inside the `@media (prefers-color-scheme: dark)` block with the resolved dark mode color variables.

If `semantic.dark` is absent: replace the same block with a single comment `/* dark mode not configured */`.

### 5d — Typography and scale steps
Fill in values in-place for the remaining scale variables in `@theme { }`:
- Font families: quote names that contain spaces, e.g. `--font-display: "Fraunces";`
- Spacing: append `px`, e.g. `"8"` → `--spacing-sm: 8px;`
- Border radius: append `px`, e.g. `"24"` → `--radius-md: 24px;`

### 5e — Semantic spacing and radius
Replace everything between `/* SPACING:START */` and `/* SPACING:END */` with the resolved `spacing.semantic` variables (same `px`-suffix rule as the scale). Replace everything between `/* RADIUS:START */` and `/* RADIUS:END */` with the resolved `border-radius.semantic` variables. Leave both empty if their `semantic` object is empty — that's the normal state until a component needs one.

## Step 6 — Report

Tell the designer:
- How many color tokens were applied
- Which tokens were skipped (empty or unresolved), so they know what still needs to be filled in
- A sample of the Tailwind utility classes now available (e.g. `bg-brand-primary`, `text-text-default`, and any semantic spacing/radius roles like `p-card-padding`, `rounded-button`)
