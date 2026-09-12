import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '確認',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '取消',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '更多選項',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">小按鈕</Button>
      <Button size="md">中按鈕</Button>
      <Button size="lg">大按鈕</Button>
    </div>
  ),
}
