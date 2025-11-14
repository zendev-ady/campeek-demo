import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'flex field-sizing-content min-h-16 w-full border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default:
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-md dark:bg-input/30',
        glass:
          'bg-white/5 border-emerald-500/30 text-white placeholder:text-white/40 focus-visible:border-emerald-400 focus-visible:bg-white/[0.08] focus-visible:ring-emerald-500/20 focus-visible:ring-[3px] rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Textarea({
  className,
  variant,
  ...props
}: React.ComponentProps<'textarea'> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
