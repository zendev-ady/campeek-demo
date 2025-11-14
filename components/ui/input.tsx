import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default:
          'border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        success:
          'border-success focus-visible:border-success focus-visible:ring-success/20 focus-visible:ring-[3px]',
        error:
          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 focus-visible:ring-[3px]',
        glass:
          'bg-white/5 border-emerald-500/30 text-white placeholder:text-white/40 focus-visible:border-emerald-400 focus-visible:bg-white/[0.08] focus-visible:ring-emerald-500/20 focus-visible:ring-[3px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

// Input Group Component with Label and Helper Text
interface InputGroupProps {
  label?: string
  helper?: string
  error?: string
  success?: string
  children: React.ReactNode
  className?: string
}

function InputGroup({
  label,
  helper,
  error,
  success,
  children,
  className,
}: InputGroupProps) {
  const hasError = !!error
  const hasSuccess = !!success && !hasError
  const helperText = error || success || helper

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          className="text-sm font-medium text-foreground"
          htmlFor={
            React.isValidElement(children) ? children.props.id : undefined
          }
        >
          {label}
        </label>
      )}
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<any>, {
          variant: hasError ? 'error' : hasSuccess ? 'success' : 'default',
          'aria-invalid': hasError,
          'aria-describedby': helperText
            ? `${children.props.id}-helper`
            : undefined,
        })}
      {helperText && (
        <p
          id={
            React.isValidElement(children)
              ? `${children.props.id}-helper`
              : undefined
          }
          className={cn('text-xs', {
            'text-destructive': hasError,
            'text-success': hasSuccess,
            'text-muted-foreground': !hasError && !hasSuccess,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

export { Input, InputGroup, inputVariants }
