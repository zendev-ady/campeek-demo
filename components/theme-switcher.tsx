'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const themes = [
  {
    value: 'light',
    label: 'Světlý',
    icon: Sun,
    description: 'Klasický světlý motiv',
  },
  {
    value: 'dark',
    label: 'Tmavý',
    icon: Moon,
    description: 'Šetrný k očím',
  },
  {
    value: 'emerald',
    label: 'Emerald',
    icon: Sparkles,
    description: 'Premium glassmorphic',
  },
] as const

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">Přepnout téma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map((t) => {
          const Icon = t.icon
          const isActive = theme === t.value
          return (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground">
                  {t.description}
                </div>
              </div>
              {isActive && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Compact version for sidebar
export function ThemeSwitcherCompact() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const cycleTheme = () => {
    const themeOrder = ['light', 'dark', 'emerald']
    const currentIndex = themeOrder.indexOf(theme || 'light')
    const nextIndex = (currentIndex + 1) % themeOrder.length
    setTheme(themeOrder[nextIndex])
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      className="w-full justify-start gap-2"
    >
      <CurrentIcon className="h-4 w-4" />
      <span>{currentTheme.label}</span>
    </Button>
  )
}

// Visual theme selector with preview cards
export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {themes.map((t) => {
        const Icon = t.icon
        const isActive = theme === t.value
        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`
              relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
              ${isActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }
            `}
          >
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center
              ${t.value === 'light' ? 'bg-white border border-gray-200' : ''}
              ${t.value === 'dark' ? 'bg-gray-900 border border-gray-700' : ''}
              ${t.value === 'emerald' ? 'bg-gradient-to-br from-emerald-600 to-emerald-900' : ''}
            `}>
              <Icon className={`h-5 w-5 ${t.value === 'light' ? 'text-gray-700' : 'text-white'}`} />
            </div>
            <span className="text-sm font-medium">{t.label}</span>
            {isActive && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-primary" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
