import * as React from 'react'
import { cn } from '@/lib/utils'

// Simple Tooltip Component (CSS-based, no Radix UI)
interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

function TooltipSimple({
  content,
  children,
  position = 'top',
  className,
}: TooltipProps) {
  return (
    <div className={cn('relative inline-block group', className)}>
      {children}
      <div
        className={cn(
          'absolute z-50 px-3 py-1.5 text-xs font-medium text-white',
          'bg-black/90 backdrop-blur-md rounded-md whitespace-nowrap',
          'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
          'transition-all duration-150 pointer-events-none',
          {
            'bottom-full left-1/2 -translate-x-1/2 mb-2': position === 'top',
            'top-full left-1/2 -translate-x-1/2 mt-2': position === 'bottom',
            'right-full top-1/2 -translate-y-1/2 mr-2': position === 'left',
            'left-full top-1/2 -translate-y-1/2 ml-2': position === 'right',
          }
        )}
        role="tooltip"
      >
        {content}
        {/* Arrow */}
        <div
          className={cn(
            'absolute w-0 h-0 border-4 border-transparent',
            {
              'top-full left-1/2 -translate-x-1/2 border-t-black/90': position === 'top',
              'bottom-full left-1/2 -translate-x-1/2 border-b-black/90': position === 'bottom',
              'top-1/2 left-full -translate-y-1/2 border-l-black/90': position === 'left',
              'top-1/2 right-full -translate-y-1/2 border-r-black/90': position === 'right',
            }
          )}
        />
      </div>
    </div>
  )
}

export { TooltipSimple }
