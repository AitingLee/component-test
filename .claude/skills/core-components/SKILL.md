---
description: How to write components: file structure, TypeScript conventions, Design System tokens, usage examples for each component
---

## Component File Structure

Each component must include four files, placed in `src/components/<ComponentName>/`:

```
Button/
  Button.tsx          ← component
  Button.stories.tsx  ← Storybook preview (see storybook skill)
  index.ts            ← export
  SPEC.md             ← component spec (see spec-component skill)
```

### `<ComponentName>.tsx`

```tsx
import { type ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`... ${className}`} {...props}>
      {children}
    </button>
  )
}
```

### `index.ts`

```ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

### After adding the component, add to `src/components/index.ts`:

```ts
export * from './Button'
```

---

## Language

All code, identifiers, and comments must be written in English — regardless of what language the conversation with the designer happens in. Never let the conversation's language leak into generated code.

---

## TypeScript Conventions

- Props interface **must be exported**
- Props **must extend** native HTML attributes (`ButtonHTMLAttributes<HTMLButtonElement>`, `HTMLAttributes<HTMLDivElement>`, `InputHTMLAttributes<HTMLInputElement>`, etc.)
- No `any` — prefer union types, then `unknown`
- Optional props should have defaults in the function destructuring, not via `defaultProps`
- Do not use `React.FC` — write named functions directly
- Must support `className` prop to allow style overrides
- Any clickable element (buttons, links, or a `div`/`span` with an `onClick`) must have `cursor-pointer`, unless `disabled`

---

## Design System

Before writing any component, read `src/styles/globals.css` and note all tokens defined in the `@theme` block.

Use those exact variable names as Tailwind classes:
- `--color-primary` → `bg-primary`, `text-primary`, `border-primary`
- `--color-background` → `bg-background`
- `--font-sans` → `font-sans`
- `--radius-md` → `rounded-md`
- `--spacing-sm` → `p-sm`, `m-sm`, `gap-sm`

Never assume token names — always derive them from `globals.css`.

If no tokens are defined yet, use standard Tailwind defaults (e.g. `bg-indigo-500`) and add a comment `{/* TODO: replace with your design token */}`.
