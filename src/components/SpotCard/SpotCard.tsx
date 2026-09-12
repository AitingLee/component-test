import { type HTMLAttributes } from 'react'

export interface SpotCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  image: string
  visited?: boolean
}

export function SpotCard({
  title,
  image,
  visited = false,
  className = '',
  ...props
}: SpotCardProps) {
  return (
    <div
      className={`w-64 overflow-hidden rounded-[12px] bg-surface-card ${className}`}
      {...props}
    >
      <div className="flex h-40 w-full items-center justify-center overflow-hidden bg-surface-accent">
        <img
          src={image}
          alt={title}
          className={`h-full w-full object-cover transition-[filter] duration-300 ${
            visited ? 'grayscale-0' : 'grayscale'
          }`}
        />
      </div>
      <div className="p-md">
        <p className="font-display text-text-default">{title}</p>
      </div>
    </div>
  )
}
