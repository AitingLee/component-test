# SpotCard

A card that represents a single travel spot, showing its image and title, and indicating whether the designer has visited it.

## Description

SpotCard is used to display a location within a travel log, such as Taiwan Travel Log. It shows a photo and a title, and visually distinguishes spots that haven't been visited yet by displaying the image in grayscale. Once marked as visited, the image switches to full color.

## Component Hierarchy

```
SpotCard
└── none
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|--------------|
| `title` | `string` | — | Yes | The name of the spot shown below the image |
| `image` | `string` | — | Yes | URL of the spot's image |
| `visited` | `boolean` | `false` | No | Whether the spot has been visited; controls grayscale vs. full color |
| `className` | `string` | `''` | No | Additional classes to override or extend styling |

## Variants & States

**Variants:** none — SpotCard has a single visual style.

**States** (driven by the `visited` prop):
- `visited = false` (default) — image is shown in grayscale, indicating the spot hasn't been visited yet
- `visited = true` — image is shown in its original color, indicating the spot has been visited

## Usage Example

```tsx
import { SpotCard } from '@/components/SpotCard'

<SpotCard
  title="Taroko Gorge"
  image="/images/taroko-gorge.jpg"
  visited={false}
/>
```
