import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  variant?: 'default' | 'glass'
}

function Progress({
  value = 0,
  max = 100,
  label,
  showValue = true,
  variant = 'default',
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      className={cn(
        'rounded-xl border p-6 transition-all',
        variant === 'glass'
          ? 'glass-card'
          : 'bg-card border-border',
        className
      )}
      {...props}
    >
      {(label || showValue) && (
        <div className="flex justify-between mb-2 text-sm text-foreground/80">
          {label && <span className="font-medium">{label}</span>}
          {showValue && <span className="font-medium">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className="w-full h-3 bg-muted/30 rounded-full overflow-hidden relative"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}

export { Progress }
