'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import {
  TableContainer,
  TableHeader,
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TablePagination,
  StatusBadge,
  PriorityBadge,
  TableActions,
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TooltipSimple } from '@/components/ui/tooltip-simple'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Calendar,
  Users,
  Star,
} from 'lucide-react'

export default function ComponentsShowcase() {
  const [progress, setProgress] = React.useState(65)

  return (
    <>
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(5, 150, 105, 0.5)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-emerald-900 to-emerald-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent leading-tight">
              campeek Design System
            </h1>
            <p className="text-lg text-white/70">
              Visual Identity & Components Library v2.0
            </p>
          </header>

          {/* CSS Variables Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              CSS Custom Properties
            </h2>
            <p className="text-base text-white/60 mb-10">
              Theme-ready design tokens for easy customization
            </p>
            <Card variant="glass" className="p-10">
              <pre className="text-sm text-white/70 overflow-x-auto leading-relaxed">
{`:root {
  /* Colors */
  --color-primary: #059669;
  --color-primary-light: #34d399;

  /* Spacing (8px grid) */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;

  /* Typography */
  --font-size-base: 16px;
  --font-size-lg: 18px;

  /* Effects */
  --blur-amount: 16px;
  --transition-base: 0.25s ease;
}`}
              </pre>
            </Card>
          </section>

          {/* Color Palette */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Color Palette
            </h2>
            <p className="text-base text-white/60 mb-10">
              WCAG AA compliant emerald-based color system
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Primary Light', hex: '#34d399', rgb: '52, 211, 153', var: 'emerald-400', bg: 'bg-emerald-400' },
                { name: 'Primary', hex: '#059669', rgb: '5, 150, 105', var: 'emerald-600', bg: 'bg-emerald-600' },
                { name: 'Primary Dark', hex: '#064e3b', rgb: '6, 78, 59', var: 'emerald-900', bg: 'bg-emerald-900' },
                { name: 'Success', hex: '#10b981', rgb: '16, 185, 129', var: 'emerald-500', bg: 'bg-emerald-500' },
                { name: 'Error', hex: '#ef4444', rgb: '239, 68, 68', var: 'red-500', bg: 'bg-red-500' },
                { name: 'Warning', hex: '#f59e0b', rgb: '245, 158, 11', var: 'amber-500', bg: 'bg-amber-500' },
              ].map((color) => (
                <Card
                  key={color.name}
                  variant="glass"
                  className="overflow-hidden p-0 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(5,150,105,0.1)]"
                >
                  <div className={`h-36 flex items-center justify-center ${color.bg} text-white font-semibold text-sm shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]`}>
                    {color.name}
                  </div>
                  <div className="p-6">
                    <div className="font-semibold text-white mb-2">{color.name}</div>
                    <div className="space-y-1 text-xs font-mono text-white/60">
                      <div>HEX: {color.hex}</div>
                      <div>RGB: {color.rgb}</div>
                      <div>tw: {color.var}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Gradients */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Gradient System
            </h2>
            <p className="text-base text-white/60 mb-10">
              Pre-defined gradients for consistent visual style
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Primary Gradient', class: 'from-emerald-400 to-emerald-600' },
                { name: 'Dark Gradient', class: 'from-emerald-600 to-emerald-900' },
                { name: 'Text Gradient', class: 'from-white to-emerald-600' },
              ].map((gradient) => (
                <Card
                  key={gradient.name}
                  variant="glass"
                  className="p-6 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`h-28 rounded-xl bg-gradient-to-br ${gradient.class} mb-6`}></div>
                  <div className="font-semibold text-white mb-2">{gradient.name}</div>
                  <div className="text-xs font-mono text-white/60 break-words">
                    bg-gradient-to-br {gradient.class}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Buttons */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Button System
            </h2>
            <p className="text-base text-white/60 mb-10">
              Interactive button styles with all states (hover, focus, disabled, loading)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Primary States', variant: 'default' as const },
                { label: 'Glass States', variant: 'glass' as const },
                { label: 'Outline States', variant: 'outline' as const },
                { label: 'Secondary States', variant: 'secondary' as const },
              ].map((group) => (
                <Card key={group.label} variant="glass" className="p-10 text-center">
                  <div className="text-xs uppercase tracking-wider text-white/60 mb-6 font-medium">
                    {group.label}
                  </div>
                  <div className="flex flex-col gap-4 items-center">
                    <Button variant={group.variant} className="w-full max-w-[160px]">Normal</Button>
                    <Button variant={group.variant} disabled className="w-full max-w-[160px]">Disabled</Button>
                    <Button variant={group.variant} loading className="w-full max-w-[160px]">Loading</Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Glass Cards */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Glass Cards
            </h2>
            <p className="text-base text-white/60 mb-10">
              Glassmorphic card components with optimized blur
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Calendar, title: 'Feature Card', text: 'Glassmorphic card with icon, title and description text. Perfect for feature showcases.' },
                { icon: Users, title: 'Content Card', text: 'Flexible card component with hover effects and smooth transitions.' },
                { icon: Star, title: 'Info Card', text: 'Clean design with backdrop blur and subtle borders for depth.' },
              ].map((item) => (
                <Card
                  key={item.title}
                  variant="glass"
                  className="p-8 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(5,150,105,0.2)] transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/30 backdrop-blur-sm flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-base text-white/70 leading-relaxed">{item.text}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Input Fields */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Input Fields
            </h2>
            <p className="text-base text-white/60 mb-10">
              Form elements with all validation states
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Normal Input', helper: 'Pomocný text pro pole', value: '', error: null, success: null },
                { label: 'Success State', helper: null, value: 'email@example.com', error: null, success: '✓ Hodnota je správná' },
                { label: 'Error State', helper: null, value: 'invalid', error: '✗ Zadejte platnou hodnotu', success: null },
                { label: 'Disabled State', helper: null, value: 'Cannot edit', error: null, success: null, disabled: true },
              ].map((input, idx) => (
                <Card key={idx} variant="glass" className="p-8">
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    {input.label}
                  </label>
                  <Input
                    placeholder="Zadejte text..."
                    defaultValue={input.value}
                    disabled={input.disabled}
                    className={`
                      w-full bg-white/5 border-emerald-600/30 text-white placeholder:text-white/40
                      focus:border-emerald-400 focus:ring-emerald-400/20
                      ${input.error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                      ${input.success ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20' : ''}
                    `}
                  />
                  {(input.helper || input.error || input.success) && (
                    <span className={`
                      block mt-2 text-xs
                      ${input.error ? 'text-red-400' : ''}
                      ${input.success ? 'text-emerald-400' : ''}
                      ${!input.error && !input.success ? 'text-white/60' : ''}
                    `}>
                      {input.error || input.success || input.helper}
                    </span>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* Progress Bars */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Progress Indicators
            </h2>
            <p className="text-base text-white/60 mb-10">
              Visual feedback for loading and progress states
            </p>
            <div className="space-y-6">
              <Progress value={progress} label="Průběh nahrávání" variant="glass" />
              <div className="flex gap-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                >
                  -10%
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                >
                  +10%
                </Button>
              </div>
              <Progress value={45} label="Upload" variant="glass" />
              <Progress value={100} label="Dokončeno" variant="glass" />
            </div>
          </section>

          {/* Badges */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Badges & Labels
            </h2>
            <p className="text-base text-white/60 mb-10">
              Status indicators and tags
            </p>
            <Card variant="glass" className="p-10">
              <div className="space-y-8">
                <div>
                  <div className="text-sm font-semibold text-white/70 mb-4">Badge Variants:</div>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">⭐ Default</Badge>
                    <Badge variant="glass">🎯 Glass</Badge>
                    <Badge variant="outline">✨ Outline</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/70 mb-4">Status Badges:</div>
                  <div className="flex flex-wrap gap-3">
                    <StatusBadge status="pending">Čeká</StatusBadge>
                    <StatusBadge status="approved">Schváleno</StatusBadge>
                    <StatusBadge status="rejected">Zamítnuto</StatusBadge>
                    <StatusBadge status="review">Na review</StatusBadge>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/70 mb-4">Priority Badges:</div>
                  <div className="flex flex-wrap gap-3">
                    <PriorityBadge priority="high">High</PriorityBadge>
                    <PriorityBadge priority="medium">Medium</PriorityBadge>
                    <PriorityBadge priority="low">Low</PriorityBadge>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Alerts */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Alert Messages
            </h2>
            <p className="text-base text-white/60 mb-10">
              Notification and feedback messages
            </p>
            <div className="space-y-4">
              <Alert variant="success" className="flex items-start gap-4 p-6">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-emerald-400 mb-1">Úspěšně uloženo</h4>
                  <p className="text-sm text-white/70">Vaše změny byly úspěšně uloženy do systému.</p>
                </div>
              </Alert>

              <Alert variant="error" className="flex items-start gap-4 p-6">
                <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-red-400 mb-1">Chyba při ukládání</h4>
                  <p className="text-sm text-white/70">Něco se pokazilo. Zkuste to prosím znovu.</p>
                </div>
              </Alert>

              <Alert variant="warning" className="flex items-start gap-4 p-6">
                <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-amber-400 mb-1">Upozornění</h4>
                  <p className="text-sm text-white/70">Tato akce vyžaduje vaši pozornost.</p>
                </div>
              </Alert>

              <Alert variant="info" className="flex items-start gap-4 p-6">
                <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-blue-400 mb-1">Informace</h4>
                  <p className="text-sm text-white/70">Nová aktualizace je k dispozici.</p>
                </div>
              </Alert>
            </div>
          </section>

          {/* Skeleton Loading */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Loading States
            </h2>
            <p className="text-base text-white/60 mb-10">
              Skeleton screens for better perceived performance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="glass" className="p-8 space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </Card>
              <Card variant="glass" className="p-8 space-y-4">
                <Skeleton className="h-6 w-3/5 mb-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/5" />
              </Card>
            </div>
          </section>

          {/* Tabs */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Tab Navigation
            </h2>
            <p className="text-base text-white/60 mb-10">
              Interactive tabbed content with keyboard navigation
            </p>
            <Tabs defaultValue="tab1" variant="glass">
              <TabsList>
                <TabsTrigger value="tab1">Přehled</TabsTrigger>
                <TabsTrigger value="tab2">Funkce</TabsTrigger>
                <TabsTrigger value="tab3">Nastavení</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="text-white/80">
                Toto je obsah prvního tabu. Zde můžete zobrazit přehled informací.
              </TabsContent>
              <TabsContent value="tab2" className="text-white/80">
                Obsah druhého tabu s popisem funkcí a možností aplikace.
              </TabsContent>
              <TabsContent value="tab3" className="text-white/80">
                Zde jsou nastavení a konfigurace systému.
              </TabsContent>
            </Tabs>
          </section>

          {/* Tooltips */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Tooltips
            </h2>
            <p className="text-base text-white/60 mb-10">
              Contextual help on hover
            </p>
            <Card variant="glass" className="p-10">
              <div className="flex flex-wrap gap-6 justify-center">
                <TooltipSimple content="Tooltip nahoře" position="top">
                  <Button variant="glass">Top</Button>
                </TooltipSimple>
                <TooltipSimple content="Tooltip vpravo" position="right">
                  <Button variant="glass">Right</Button>
                </TooltipSimple>
                <TooltipSimple content="Tooltip dole" position="bottom">
                  <Button variant="glass">Bottom</Button>
                </TooltipSimple>
                <TooltipSimple content="Tooltip vlevo" position="left">
                  <Button variant="glass">Left</Button>
                </TooltipSimple>
              </div>
            </Card>
          </section>

          {/* Dialog/Modal */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Modal Dialog
            </h2>
            <p className="text-base text-white/60 mb-10">
              Overlay dialogs for important actions
            </p>
            <Card variant="glass" className="p-10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="glass">Otevřít Modal</Button>
                </DialogTrigger>
                <DialogContent variant="glass">
                  <DialogHeader>
                    <DialogTitle className="text-white">Glassmorphism Dialog</DialogTitle>
                    <p className="text-sm text-white/60 mt-2">
                      Modal s glassmorphism overlay a emerald akcenty.
                    </p>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-white/80">
                      Tento dialog používá nový design system s backdrop blur efektem
                      a emerald color palette.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Zrušit</Button>
                    <Button variant="glass">Potvrdit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Card>
          </section>

          {/* Data Table */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Data Tables
            </h2>
            <p className="text-base text-white/60 mb-10">
              Elegant data display with status indicators and actions
            </p>

            <TableContainer variant="glass">
              <TableHeader
                title="Přihlášky účastníků"
                action={
                  <Button variant="glass" size="sm">
                    Přidat novou
                  </Button>
                }
              />
              <TableWrapper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="text-white/70">Jméno</TableHeaderCell>
                      <TableHeaderCell className="text-white/70">Email</TableHeaderCell>
                      <TableHeaderCell className="text-white/70">Datum</TableHeaderCell>
                      <TableHeaderCell className="text-white/70">Status</TableHeaderCell>
                      <TableHeaderCell className="text-white/70">Priorita</TableHeaderCell>
                      <TableHeaderCell className="text-right text-white/70">Akce</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { name: 'Jan Novák', email: 'jan.novak@email.cz', date: '14. 11. 2025', status: 'pending' as const, priority: 'high' as const },
                      { name: 'Marie Svobodová', email: 'marie.svobodova@email.cz', date: '13. 11. 2025', status: 'approved' as const, priority: 'medium' as const },
                      { name: 'Petr Dvořák', email: 'petr.dvorak@email.cz', date: '12. 11. 2025', status: 'review' as const, priority: 'low' as const },
                    ].map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-semibold text-white">{row.name}</TableCell>
                        <TableCell className="text-white/60 text-sm">{row.email}</TableCell>
                        <TableCell className="text-white/70 text-sm">{row.date}</TableCell>
                        <TableCell>
                          <StatusBadge status={row.status}>
                            {row.status === 'pending' ? 'Čeká' : row.status === 'approved' ? 'Schváleno' : 'Review'}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={row.priority}>
                            {row.priority === 'high' ? 'High' : row.priority === 'medium' ? 'Medium' : 'Low'}
                          </PriorityBadge>
                        </TableCell>
                        <TableCell>
                          <TableActions
                            onView={() => {}}
                            onEdit={() => {}}
                            onDelete={() => {}}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
              <TablePagination
                currentPage={1}
                totalPages={10}
                totalItems={47}
                itemsPerPage={5}
                onPageChange={() => {}}
              />
            </TableContainer>
          </section>

          {/* Typography Scale */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Typography Scale
            </h2>
            <p className="text-base text-white/60 mb-10">
              8px-based font scale using system fonts
            </p>
            <Card variant="glass" className="p-10 space-y-8">
              <div className="text-7xl font-extrabold bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent leading-tight">
                Display 1
              </div>
              <div className="text-6xl font-bold text-emerald-400">
                Display 2
              </div>
              <div className="text-5xl font-bold text-white">
                Heading 1
              </div>
              <div className="text-3xl font-semibold text-white/90">
                Heading 2
              </div>
              <div className="text-xl text-white/80 leading-relaxed">
                Body Large - Větší text pro důležité informace a úvodní odstavce.
              </div>
              <div className="text-base text-white/75 leading-relaxed">
                Body Regular - Standardní text pro běžný obsah a popisky.
              </div>
            </Card>
          </section>

          {/* Spacing System */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Spacing System
            </h2>
            <p className="text-base text-white/60 mb-10">
              Consistent 8px grid system
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: 'XS', size: '8px', height: 'h-2' },
                { name: 'SM', size: '16px', height: 'h-4' },
                { name: 'MD', size: '24px', height: 'h-6' },
                { name: 'LG', size: '32px', height: 'h-8' },
                { name: 'XL', size: '40px', height: 'h-10' },
                { name: '2XL', size: '48px', height: 'h-12' },
              ].map((space) => (
                <Card key={space.name} variant="glass" className="p-6 text-center">
                  <div className={`${space.height} bg-emerald-500/30 border border-emerald-400/50 rounded mb-4`}></div>
                  <div className="text-sm font-semibold text-white/80 mb-1">{space.name}</div>
                  <div className="text-xs font-mono text-white/60">{space.size}</div>
                </Card>
              ))}
            </div>
          </section>

          {/* Accessibility */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-b from-white from-10% to-emerald-600 bg-clip-text text-transparent">
              Accessibility Features
            </h2>
            <p className="text-base text-white/60 mb-10">
              WCAG AA compliant design system
            </p>
            <Card variant="glass" className="p-10">
              <h3 className="text-xl font-bold mb-8 text-white">Implemented Features:</h3>
              <ul className="space-y-4 text-white/80">
                {[
                  'WCAG AA color contrast ratios',
                  'Keyboard navigation support (Tab, Enter, Escape)',
                  'Focus-visible states for all interactive elements',
                  'ARIA labels and roles',
                  'Screen reader friendly markup',
                  'Semantic HTML structure',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

        </div>
      </div>
    </>
  )
}
