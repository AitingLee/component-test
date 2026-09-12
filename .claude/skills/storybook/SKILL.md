---
description: How to write Storybook stories: file structure, required setup, Story examples
---

## Story File Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],       // required for auto-generated docs
}

export default meta
type Story = StoryObj<typeof Button>
```

---

## Rules

- `tags: ['autodocs']` is required
- `title` format: `Components/<ComponentName>`
- Each file should have at least **2–3 Stories** showing different states or variants
- Story names should be in **English**, descriptive and designer-friendly

---

## Story Examples

```tsx
// Basic usage
export const Primary: Story = {
  args: {
    children: 'Submit',
    variant: 'primary',
  },
}

// Variant
export const Secondary: Story = {
  args: {
    children: 'Cancel',
    variant: 'secondary',
  },
}

// State
export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
  },
}
```

---

## Common Story Types Reference

| Scenario | Suggested Story Name |
|----------|---------------------|
| Default style | `Default` |
| Size variants | `Small`, `Large` |
| Color/semantic variants | `Primary`, `Secondary`, `Danger` |
| Interactive states | `Disabled`, `Loading`, `Error` |
| Long text / edge cases | `LongContent` |
