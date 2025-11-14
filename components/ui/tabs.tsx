import * as React from 'react'
import { cn } from '@/lib/utils'

// Tabs Context
interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

// Tabs Container (Root)
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: 'default' | 'glass'
}

function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = 'glass',
  className,
  children,
  ...props
}: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(controlledValue || defaultValue)

  const handleTabChange = React.useCallback((newValue: string) => {
    if (controlledValue === undefined) {
      setActiveTab(newValue)
    }
    onValueChange?.(newValue)
  }, [controlledValue, onValueChange])

  const value = React.useMemo(
    () => ({
      activeTab: controlledValue || activeTab,
      setActiveTab: handleTabChange,
    }),
    [controlledValue, activeTab, handleTabChange]
  )

  return (
    <TabsContext.Provider value={value}>
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
        {children}
      </div>
    </TabsContext.Provider>
  )
}

// Tabs List (Navigation)
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        'flex gap-2 mb-6 border-b border-white/10 overflow-x-auto',
        className
      )}
      {...props}
    />
  )
}

// Tab Trigger (Button)
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext()
  const isActive = activeTab === value

  return (
    <button
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-4 py-3 font-semibold text-base whitespace-nowrap',
        'bg-transparent border-none cursor-pointer transition-all',
        'border-b-2 border-transparent',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:outline-offset-2 focus-visible:rounded',
        isActive
          ? 'text-emerald-400 border-emerald-400'
          : 'text-foreground/60 hover:text-foreground/90',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Tab Content
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { activeTab } = useTabsContext()
  const isActive = activeTab === value

  if (!isActive) return null

  return (
    <div
      role="tabpanel"
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'animate-in fade-in-0 duration-300',
        'text-foreground/80',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
