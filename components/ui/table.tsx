import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

// Table Footer (div wrapper, not tfoot element)
function TableFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("p-4 border-t border-white/10 flex justify-between items-center flex-wrap gap-4", className)}>
      {children}
    </div>
  )
}

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
interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
}

const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(({ className, align = 'left', ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'px-6 py-4 text-left text-sm font-semibold text-white/70 uppercase tracking-wider border-b border-white/10',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      className
    )}
    {...props}
  />
))
TableHeaderCell.displayName = 'TableHeaderCell'

// Table Cell
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
}

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(({ className, align = 'left', ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'px-6 py-4 text-white/85',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      className
    )}
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

// Table Pagination
function TablePagination({ className }: { className?: string }) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const totalPages = 10

  return (
    <div className={cn("flex gap-2", className)}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-semibold transition-all hover:bg-white/10 hover:border-emerald-500/40 hover:text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => setCurrentPage(1)}
        className={cn(
          "w-8 h-8 inline-flex items-center justify-center rounded-lg border text-sm font-semibold transition-all",
          currentPage === 1
            ? "bg-emerald-600 border-emerald-600 text-white"
            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-emerald-500/40 hover:text-emerald-400"
        )}
      >
        1
      </button>

      <button
        onClick={() => setCurrentPage(2)}
        className={cn(
          "w-8 h-8 inline-flex items-center justify-center rounded-lg border text-sm font-semibold transition-all",
          currentPage === 2
            ? "bg-emerald-600 border-emerald-600 text-white"
            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-emerald-500/40 hover:text-emerald-400"
        )}
      >
        2
      </button>

      <button
        onClick={() => setCurrentPage(3)}
        className={cn(
          "w-8 h-8 inline-flex items-center justify-center rounded-lg border text-sm font-semibold transition-all",
          currentPage === 3
            ? "bg-emerald-600 border-emerald-600 text-white"
            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-emerald-500/40 hover:text-emerald-400"
        )}
      >
        3
      </button>

      <div className="w-8 h-8 inline-flex items-center justify-center text-white/50 text-sm">...</div>

      <button
        onClick={() => setCurrentPage(totalPages)}
        className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-semibold transition-all hover:bg-white/10 hover:border-emerald-500/40 hover:text-emerald-400"
      >
        {totalPages}
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-semibold transition-all hover:bg-white/10 hover:border-emerald-500/40 hover:text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
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

// Table Actions Container
export function TableActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex gap-2 justify-end", className)}>
      {children}
    </div>
  )
}

// Action Button
export function ActionButton({
  action,
  title,
  children,
  className,
  onClick
}: {
  action: 'view' | 'edit' | 'delete';
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const actionStyles = {
    view: "hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-blue-400",
    edit: "hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:text-emerald-400",
    delete: "hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400",
  }

  return (
    <button
      title={title}
      onClick={onClick}
      className={cn(
        "w-8 h-8 inline-flex items-center justify-center rounded-lg",
        "bg-white/5 border border-white/10 text-white/60",
        "transition-all hover:-translate-y-0.5",
        actionStyles[action],
        className
      )}
    >
      {children}
    </button>
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
  ActionButton,
}
