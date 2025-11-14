import * as React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'title' | 'circular'
}

function Skeleton({
  className,
  variant = 'default',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton-loading rounded-md',
        {
          'h-4 w-full': variant === 'text',
          'h-6 w-3/5': variant === 'title',
          'rounded-full aspect-square': variant === 'circular',
          'h-12 w-full': variant === 'default',
        },
        className
      )}
      {...props}
    />
  )
}

// Skeleton Card - pre-composed skeleton for card layouts
interface SkeletonCardProps {
  lines?: number
  showAvatar?: boolean
  className?: string
}

function SkeletonCard({
  lines = 3,
  showAvatar = false,
  className,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6 space-y-4',
        className
      )}
    >
      {showAvatar && (
        <div className="flex items-center gap-4">
          <Skeleton variant="circular" className="w-12 h-12" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="title" className="w-32" />
            <Skeleton variant="text" className="w-48" />
          </div>
        </div>
      )}
      {!showAvatar && <Skeleton variant="title" />}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            className={i === lines - 1 ? 'w-4/5' : 'w-full'}
          />
        ))}
      </div>
    </div>
  )
}

export { Skeleton, SkeletonCard }
