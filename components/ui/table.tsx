import * as React from 'react'
import { cn } from '@/lib/utils'

// Main Table Container with Glass Effect
interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass'
}

function TableContainer({
  className,
  variant = 'glass',
  ...props
}: TableContainerProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border overflow-hidden transition-all',
        variant === 'glass'
          ? 'glass-card'
          : 'bg-card border-border',
        className
      )}
      {...props}
    />
  )
}

// Table Header with Title and Actions
interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  action?: React.ReactNode
}

function TableHeader({ className, title, action, children, ...props }: TableHeaderProps) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-b border-white/10 flex justify-between items-center',
        className
      )}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {title && <h3 className="text-xl font-bold text-foreground">{title}</h3>}
          {action && <div>{action}</div>}
        </>
      )}
    </div>
  )
}

// Table Wrapper for Responsive Scrolling
function TableWrapper({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('overflow-x-auto', className)}
      {...props}
    />
  )
}

// Base Table Component
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn('w-full border-collapse', className)}
    {...props}
  />
))
Table.displayName = 'Table'

// Table Header
const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('bg-white/[0.02]', className)}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

// Table Body
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('', className)} {...props} />
))
TableBody.displayName = 'TableBody'

// Table Footer
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium', className)}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

// Table Row
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-white/5 transition-colors hover:bg-white/[0.03]',
      'data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

// Table Header Cell
const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'px-6 py-3 text-left align-middle font-semibold text-xs text-foreground/70',
      'uppercase tracking-wider border-b border-white/10',
      className
    )}
    {...props}
  />
))
TableHeaderCell.displayName = 'TableHeaderCell'

// Table Cell
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('px-6 py-4 align-middle text-sm text-foreground/85', className)}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

// Table Caption
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

// Table Pagination Footer
interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage?: number
  totalPages?: number
  totalItems?: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
}

function TablePagination({
  className,
  currentPage = 1,
  totalPages = 1,
  totalItems,
  itemsPerPage,
  onPageChange,
  ...props
}: TablePaginationProps) {
  const startItem = (currentPage - 1) * (itemsPerPage || 0) + 1
  const endItem = Math.min(currentPage * (itemsPerPage || 0), totalItems || 0)

  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-white/10 flex justify-between items-center',
        className
      )}
      {...props}
    >
      <div className="text-sm text-foreground/60">
        {totalItems && itemsPerPage && (
          <>Zobrazeno {startItem}-{endItem} z {totalItems} záznamů</>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'w-8 h-8 flex items-center justify-center',
            'bg-white/5 border border-white/10 rounded-md',
            'transition-all hover:bg-white/10 hover:border-emerald-400/40',
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5'
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const page = i + 1
          return (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={cn(
                'w-8 h-8 flex items-center justify-center text-sm font-semibold',
                'border rounded-md transition-all',
                page === currentPage
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white/5 border-white/10 text-foreground/70 hover:bg-white/10 hover:border-emerald-400/40 hover:text-emerald-400'
              )}
            >
              {page}
            </button>
          )
        })}

        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'w-8 h-8 flex items-center justify-center',
            'bg-white/5 border border-white/10 rounded-md',
            'transition-all hover:bg-white/10 hover:border-emerald-400/40',
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5'
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  )
}

// Status Badge Component (used in tables)
interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'review'
  children?: React.ReactNode
}

function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span className={`badge-status badge-status-${status}`}>
      {children}
    </span>
  )
}

// Priority Badge Component (used in tables)
interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low'
  children?: React.ReactNode
}

function PriorityBadge({ priority, children }: PriorityBadgeProps) {
  return (
    <span className={`badge-priority badge-priority-${priority}`}>
      {children}
    </span>
  )
}

// Action Buttons Component
interface TableActionsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

function TableActions({ onView, onEdit, onDelete, className }: TableActionsProps) {
  return (
    <div className={cn('flex gap-2 justify-end', className)}>
      {onView && (
        <button
          onClick={onView}
          className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-md transition-all hover:bg-blue-500/20 hover:border-blue-500/40 group"
          title="Zobrazit detail"
        >
          <svg className="w-4 h-4 stroke-foreground/60 group-hover:stroke-blue-400 transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-md transition-all hover:bg-emerald-500/20 hover:border-emerald-500/40 group"
          title="Upravit"
        >
          <svg className="w-4 h-4 stroke-foreground/60 group-hover:stroke-emerald-400 transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-md transition-all hover:bg-red-500/20 hover:border-red-500/40 group"
          title="Smazat"
        >
          <svg className="w-4 h-4 stroke-foreground/60 group-hover:stroke-red-400 transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      )}
    </div>
  )
}

export {
  TableContainer,
  TableHeader,
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableCaption,
  TablePagination,
  StatusBadge,
  PriorityBadge,
  TableActions,
}
