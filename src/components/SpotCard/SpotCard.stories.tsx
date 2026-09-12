import type { Meta, StoryObj } from '@storybook/react'
import { SpotCard } from './SpotCard'

const meta: Meta<typeof SpotCard> = {
  title: 'Components/SpotCard',
  component: SpotCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SpotCard>

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400&h=300&fit=crop'

export const NotVisited: Story = {
  args: {
    title: 'Taroko Gorge',
    image: SAMPLE_IMAGE,
    visited: false,
  },
}

export const Visited: Story = {
  args: {
    title: 'Taroko Gorge',
    image: SAMPLE_IMAGE,
    visited: true,
  },
}

export const LongTitle: Story = {
  args: {
    title: 'Alishan National Scenic Area Sunrise Trail',
    image: SAMPLE_IMAGE,
    visited: false,
  },
}
