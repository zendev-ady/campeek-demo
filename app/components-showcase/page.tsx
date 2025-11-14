'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input, InputGroup } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Skeleton, SkeletonCard } from '@/components/ui/skeleton'
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
  DialogDescription,
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
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-emerald-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">

          {/* Header */}
          <header className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              campeek Design System
            </h1>
            <p className="text-lg sm:text-xl text-white/70">
              Visual Identity & Components Library v2.0
            </p>
          </header>

          {/* CSS Variables Section */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              CSS Custom Properties
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Theme-ready design tokens for easy customization
            </p>
            <Card variant="glass">
              <CardContent>
                <pre className="text-sm text-white/70 overflow-x-auto">
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
              </CardContent>
            </Card>
          </section>

          {/* Color Palette */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Color Palette
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
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
                <Card key={color.name} variant="glass" className="overflow-hidden p-0">
                  <div className={`h-32 flex items-center justify-center ${color.bg} text-white font-semibold text-sm shadow-inner`}>
                    {color.name}
                  </div>
                  <CardContent>
                    <div className="font-semibold mb-2">{color.name}</div>
                    <div className="space-y-1 text-xs font-mono text-white/60">
                      <div>HEX: {color.hex}</div>
                      <div>RGB: {color.rgb}</div>
                      <div>tw: {color.var}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Gradients */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Gradient System
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Pre-defined gradients for consistent visual style
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Primary Gradient', class: 'from-emerald-400 to-emerald-600' },
                { name: 'Dark Gradient', class: 'from-emerald-600 to-emerald-900' },
                { name: 'Text Gradient', class: 'from-white to-emerald-600' },
              ].map((gradient) => (
                <Card key={gradient.name} variant="glass">
                  <CardContent>
                    <div className={`h-28 rounded-lg bg-gradient-to-br ${gradient.class} mb-4`}></div>
                    <div className="font-semibold mb-2">{gradient.name}</div>
                    <div className="text-xs font-mono text-white/60 break-words">
                      bg-gradient-to-br {gradient.class}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Buttons */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Button System
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Interactive button styles with all states
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Primary States', variant: 'default' as const },
                { label: 'Glass States', variant: 'glass' as const },
                { label: 'Outline States', variant: 'outline' as const },
                { label: 'Secondary States', variant: 'secondary' as const },
              ].map((group) => (
                <Card key={group.label} variant="glass">
                  <CardContent className="text-center">
                    <div className="text-xs uppercase tracking-wider text-white/60 mb-6 font-medium">
                      {group.label}
                    </div>
                    <div className="flex flex-col gap-3 items-center">
                      <Button variant={group.variant}>Normal</Button>
                      <Button variant={group.variant} disabled>Disabled</Button>
                      <Button variant={group.variant} loading>Loading</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Glass Cards */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Glass Cards
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Glassmorphic card components with optimized blur
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Calendar, title: 'Feature Card', text: 'Glassmorphic card with icon, title and description text.' },
                { icon: Users, title: 'Content Card', text: 'Flexible card component with hover effects and smooth transitions.' },
                { icon: Star, title: 'Info Card', text: 'Clean design with backdrop blur and subtle borders for depth.' },
              ].map((item) => (
                <Card key={item.title} variant="glass">
                  <CardContent>
                    <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm flex items-center justify-center mb-4">
                      <item.icon className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-white/80">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Input Fields */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Input Fields
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Form elements with all validation states
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card variant="glass">
                <CardContent>
                  <InputGroup label="Normal Input" helper="Pomocný text pro pole">
                    <Input placeholder="Zadejte text..." />
                  </InputGroup>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent>
                  <InputGroup label="Success State" success="✓ Hodnota je správná">
                    <Input placeholder="Validní hodnota" defaultValue="email@example.com" />
                  </InputGroup>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent>
                  <InputGroup label="Error State" error="✗ Zadejte platnou hodnotu">
                    <Input placeholder="Neplatná hodnota" defaultValue="invalid" />
                  </InputGroup>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent>
                  <InputGroup label="Disabled State">
                    <Input placeholder="Disabled input" disabled defaultValue="Cannot edit" />
                  </InputGroup>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Progress Bars */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Progress Indicators
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
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
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Badges & Labels
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Status indicators and tags
            </p>
            <Card variant="glass">
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-medium text-white/70 mb-3">Badge Variants:</div>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="default">⭐ Default</Badge>
                      <Badge variant="glass">🎯 Glass</Badge>
                      <Badge variant="outline">✨ Outline</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/70 mb-3">Status Badges:</div>
                    <div className="flex flex-wrap gap-3">
                      <StatusBadge status="pending">Čeká</StatusBadge>
                      <StatusBadge status="approved">Schváleno</StatusBadge>
                      <StatusBadge status="rejected">Zamítnuto</StatusBadge>
                      <StatusBadge status="review">Na review</StatusBadge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/70 mb-3">Priority Badges:</div>
                    <div className="flex flex-wrap gap-3">
                      <PriorityBadge priority="high">High</PriorityBadge>
                      <PriorityBadge priority="medium">Medium</PriorityBadge>
                      <PriorityBadge priority="low">Low</PriorityBadge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Alerts */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Alert Messages
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Notification and feedback messages
            </p>
            <div className="space-y-4">
              <Alert variant="success">
                <CheckCircle2 className="h-5 w-5" />
                <AlertTitle>Úspěšně uloženo</AlertTitle>
                <AlertDescription>
                  Vaše změny byly úspěšně uloženy do systému.
                </AlertDescription>
              </Alert>

              <Alert variant="error">
                <XCircle className="h-5 w-5" />
                <AlertTitle>Chyba při ukládání</AlertTitle>
                <AlertDescription>
                  Něco se pokazilo. Zkuste to prosím znovu.
                </AlertDescription>
              </Alert>

              <Alert variant="warning">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle>Upozornění</AlertTitle>
                <AlertDescription>
                  Tato akce vyžaduje vaši pozornost.
                </AlertDescription>
              </Alert>

              <Alert variant="info">
                <Info className="h-5 w-5" />
                <AlertTitle>Informace</AlertTitle>
                <AlertDescription>
                  Nová aktualizace je k dispozici.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Skeleton Loading */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Loading States
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Skeleton screens for better perceived performance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkeletonCard lines={4} showAvatar />
              <SkeletonCard lines={3} />
            </div>
          </section>

          {/* Tabs */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Tab Navigation
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Interactive tabbed content with keyboard navigation
            </p>
            <Tabs defaultValue="tab1" variant="glass">
              <TabsList>
                <TabsTrigger value="tab1">Přehled</TabsTrigger>
                <TabsTrigger value="tab2">Funkce</TabsTrigger>
                <TabsTrigger value="tab3">Nastavení</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <p className="text-white/80">
                  Toto je obsah prvního tabu. Zde můžete zobrazit přehled informací.
                </p>
              </TabsContent>
              <TabsContent value="tab2">
                <p className="text-white/80">
                  Obsah druhého tabu s popisem funkcí a možností aplikace.
                </p>
              </TabsContent>
              <TabsContent value="tab3">
                <p className="text-white/80">
                  Zde jsou nastavení a konfigurace systému.
                </p>
              </TabsContent>
            </Tabs>
          </section>

          {/* Tooltips */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Tooltips
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Contextual help on hover
            </p>
            <Card variant="glass">
              <CardContent>
                <div className="flex flex-wrap gap-4">
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
              </CardContent>
            </Card>
          </section>

          {/* Dialog/Modal */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Modal Dialog
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Overlay dialogs for important actions
            </p>
            <Card variant="glass">
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="glass">Otevřít Modal</Button>
                  </DialogTrigger>
                  <DialogContent variant="glass">
                    <DialogHeader>
                      <DialogTitle>Glassmorphism Dialog</DialogTitle>
                      <DialogDescription>
                        Modal s glassmorphism overlay a emerald akcenty.
                      </DialogDescription>
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
              </CardContent>
            </Card>
          </section>

          {/* Data Table */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Data Tables
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
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
                      <TableHeaderCell>Jméno</TableHeaderCell>
                      <TableHeaderCell>Email</TableHeaderCell>
                      <TableHeaderCell>Datum</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Priorita</TableHeaderCell>
                      <TableHeaderCell className="text-right">Akce</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-white">Jan Novák</TableCell>
                      <TableCell className="text-white/60 text-sm">jan.novak@email.cz</TableCell>
                      <TableCell className="text-white/70 text-sm">14. 11. 2025</TableCell>
                      <TableCell>
                        <StatusBadge status="pending">Čeká</StatusBadge>
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority="high">High</PriorityBadge>
                      </TableCell>
                      <TableCell>
                        <TableActions
                          onView={() => {}}
                          onEdit={() => {}}
                          onDelete={() => {}}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-white">Marie Svobodová</TableCell>
                      <TableCell className="text-white/60 text-sm">marie.svobodova@email.cz</TableCell>
                      <TableCell className="text-white/70 text-sm">13. 11. 2025</TableCell>
                      <TableCell>
                        <StatusBadge status="approved">Schváleno</StatusBadge>
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority="medium">Medium</PriorityBadge>
                      </TableCell>
                      <TableCell>
                        <TableActions
                          onView={() => {}}
                          onEdit={() => {}}
                          onDelete={() => {}}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-white">Petr Dvořák</TableCell>
                      <TableCell className="text-white/60 text-sm">petr.dvorak@email.cz</TableCell>
                      <TableCell className="text-white/70 text-sm">12. 11. 2025</TableCell>
                      <TableCell>
                        <StatusBadge status="review">Review</StatusBadge>
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority="low">Low</PriorityBadge>
                      </TableCell>
                      <TableCell>
                        <TableActions
                          onView={() => {}}
                          onEdit={() => {}}
                          onDelete={() => {}}
                        />
                      </TableCell>
                    </TableRow>
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
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Typography Scale
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              8px-based font scale using system fonts
            </p>
            <Card variant="glass">
              <CardContent className="space-y-6">
                <div>
                  <div className="text-6xl font-bold bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
                    Display 1
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-emerald-400">
                    Display 2
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white">
                    Heading 1
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-white/90">
                    Heading 2
                  </div>
                </div>
                <div>
                  <div className="text-xl text-white/80 leading-relaxed">
                    Body Large - Větší text pro důležité informace a úvodní odstavce.
                  </div>
                </div>
                <div>
                  <div className="text-base text-white/75 leading-relaxed">
                    Body Regular - Standardní text pro běžný obsah a popisky.
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Spacing System */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Spacing System
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              Consistent 8px grid system
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'XS', size: '8px', height: 'h-2' },
                { name: 'SM', size: '16px', height: 'h-4' },
                { name: 'MD', size: '24px', height: 'h-6' },
                { name: 'LG', size: '32px', height: 'h-8' },
                { name: 'XL', size: '40px', height: 'h-10' },
                { name: '2XL', size: '48px', height: 'h-12' },
              ].map((space) => (
                <Card key={space.name} variant="glass">
                  <CardContent className="text-center">
                    <div className={`${space.height} bg-emerald-500/30 border border-emerald-400/50 rounded mb-3`}></div>
                    <div className="text-sm font-semibold text-white/80 mb-1">{space.name}</div>
                    <div className="text-xs font-mono text-white/60">{space.size}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Accessibility */}
          <section className="mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white via-white to-emerald-600 bg-clip-text text-transparent">
              Accessibility Features
            </h2>
            <p className="text-base text-white/60 mb-8 sm:mb-12">
              WCAG AA compliant design system
            </p>
            <Card variant="glass">
              <CardContent>
                <h3 className="text-xl font-semibold mb-6 text-white">Implemented Features:</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>WCAG AA color contrast ratios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Keyboard navigation support (Tab, Enter, Escape)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Focus-visible states for all interactive elements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>ARIA labels and roles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Screen reader friendly markup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Semantic HTML structure</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </>
  )
}
