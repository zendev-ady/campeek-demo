import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current backdrop-blur-md transition-all',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        success:
          'bg-white/5 dark:bg-white/5 border-emerald-500/30 text-card-foreground [&>svg]:text-emerald-500 *:data-[slot=alert-title]:text-emerald-500 *:data-[slot=alert-description]:text-foreground/70',
        error:
          'bg-white/5 dark:bg-white/5 border-red-500/30 text-card-foreground [&>svg]:text-red-500 *:data-[slot=alert-title]:text-red-500 *:data-[slot=alert-description]:text-foreground/70',
        warning:
          'bg-white/5 dark:bg-white/5 border-amber-500/30 text-card-foreground [&>svg]:text-amber-500 *:data-[slot=alert-title]:text-amber-500 *:data-[slot=alert-description]:text-foreground/70',
        info:
          'bg-white/5 dark:bg-white/5 border-blue-500/30 text-card-foreground [&>svg]:text-blue-500 *:data-[slot=alert-title]:text-blue-500 *:data-[slot=alert-description]:text-foreground/70',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
