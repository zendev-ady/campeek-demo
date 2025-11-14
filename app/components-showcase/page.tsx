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
  Loader2,
} from 'lucide-react'

export default function ComponentsShowcase() {
  const [progress, setProgress] = React.useState(65)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            campeek Design System
          </h1>
          <p className="text-xl text-foreground/70">
            Kompletní přehled komponent s glassmorphism designem
          </p>
        </div>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Buttons</h2>
          <Card variant="glass">
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default Button</Button>
                <Button variant="glass">Glass Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="glass" size="sm">Small</Button>
                <Button variant="glass" size="default">Default</Button>
                <Button variant="glass" size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="glass" loading>Loading...</Button>
                <Button variant="glass" disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>Standard glassmorphism effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  This card uses the glass variant with backdrop blur and subtle borders.
                </p>
              </CardContent>
            </Card>

            <Card variant="glass-light">
              <CardHeader>
                <CardTitle>Glass Light</CardTitle>
                <CardDescription>Lighter variant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  A lighter version of the glass effect for subtle emphasis.
                </p>
              </CardContent>
            </Card>

            <Card variant="glass-strong">
              <CardHeader>
                <CardTitle>Glass Strong</CardTitle>
                <CardDescription>Stronger variant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  A more pronounced glass effect for important content.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Inputs</h2>
          <Card variant="glass">
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Default Input" helper="Pomocný text pro pole">
                  <Input placeholder="Zadejte text..." />
                </InputGroup>

                <InputGroup
                  label="Success Input"
                  success="Email je validní"
                >
                  <Input placeholder="email@example.com" />
                </InputGroup>

                <InputGroup
                  label="Error Input"
                  error="Toto pole je povinné"
                >
                  <Input placeholder="Povinné pole" />
                </InputGroup>

                <InputGroup label="Disabled Input">
                  <Input placeholder="Disabled" disabled />
                </InputGroup>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Progress */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Progress</h2>
          <div className="space-y-4">
            <Progress
              value={progress}
              label="Průběh nahrávání"
              variant="glass"
            />
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
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Badges</h2>
          <Card variant="glass">
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="glass">Glass</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground/70">Status Badges:</p>
                <div className="flex flex-wrap gap-4">
                  <StatusBadge status="pending">Čeká</StatusBadge>
                  <StatusBadge status="approved">Schváleno</StatusBadge>
                  <StatusBadge status="rejected">Zamítnuto</StatusBadge>
                  <StatusBadge status="review">Na review</StatusBadge>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground/70">Priority Badges:</p>
                <div className="flex flex-wrap gap-4">
                  <PriorityBadge priority="high">Vysoká</PriorityBadge>
                  <PriorityBadge priority="medium">Střední</PriorityBadge>
                  <PriorityBadge priority="low">Nízká</PriorityBadge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Alerts */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Alerts</h2>
          <div className="space-y-4">
            <Alert variant="success">
              <CheckCircle2 />
              <AlertTitle>Úspěch!</AlertTitle>
              <AlertDescription>
                Vaše změny byly úspěšně uloženy.
              </AlertDescription>
            </Alert>

            <Alert variant="error">
              <XCircle />
              <AlertTitle>Chyba!</AlertTitle>
              <AlertDescription>
                Při ukládání došlo k chybě. Zkuste to prosím znovu.
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTriangle />
              <AlertTitle>Varování</AlertTitle>
              <AlertDescription>
                Tato akce nemůže být vrácena zpět.
              </AlertDescription>
            </Alert>

            <Alert variant="info">
              <Info />
              <AlertTitle>Informace</AlertTitle>
              <AlertDescription>
                Systém bude v údržbě od 22:00 do 24:00.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Skeleton Loading */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Skeleton Loading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard lines={4} showAvatar />
            <SkeletonCard lines={3} />
          </div>
        </section>

        {/* Tabs */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Tabs</h2>
          <Tabs defaultValue="tab1" variant="glass">
            <TabsList>
              <TabsTrigger value="tab1">První tab</TabsTrigger>
              <TabsTrigger value="tab2">Druhý tab</TabsTrigger>
              <TabsTrigger value="tab3">Třetí tab</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <p className="text-foreground/80">
                Obsah prvního tabu s glassmorphism designem.
              </p>
            </TabsContent>
            <TabsContent value="tab2">
              <p className="text-foreground/80">
                Obsah druhého tabu s plynulými přechody.
              </p>
            </TabsContent>
            <TabsContent value="tab3">
              <p className="text-foreground/80">
                Obsah třetího tabu s emerald akcenty.
              </p>
            </TabsContent>
          </Tabs>
        </section>

        {/* Table */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Table</h2>
          <TableContainer variant="glass">
            <TableHeader title="Ukázková tabulka" />
            <TableWrapper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Název</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Priorita</TableHeaderCell>
                    <TableHeaderCell className="text-right">Akce</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Projekt Alpha</TableCell>
                    <TableCell>
                      <StatusBadge status="approved">Schváleno</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority="high">Vysoká</PriorityBadge>
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
                    <TableCell className="font-medium">Projekt Beta</TableCell>
                    <TableCell>
                      <StatusBadge status="review">Na review</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority="medium">Střední</PriorityBadge>
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
                    <TableCell className="font-medium">Projekt Gamma</TableCell>
                    <TableCell>
                      <StatusBadge status="pending">Čeká</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority="low">Nízká</PriorityBadge>
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
              totalPages={3}
              totalItems={25}
              itemsPerPage={10}
              onPageChange={() => {}}
            />
          </TableContainer>
        </section>

        {/* Tooltips */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Tooltips</h2>
          <Card variant="glass">
            <CardContent>
              <div className="flex flex-wrap gap-8">
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

        {/* Dialog */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Dialog / Modal</h2>
          <Card variant="glass">
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="glass">Otevřít dialog</Button>
                </DialogTrigger>
                <DialogContent variant="glass">
                  <DialogHeader>
                    <DialogTitle>Glassmorphism Dialog</DialogTitle>
                    <DialogDescription>
                      Modal s glassmorphism overlay a emerald akcenty.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-foreground/80">
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

        {/* Design Tokens */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Design Tokens</h2>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Emerald-based color system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-emerald-300 border border-white/20"></div>
                  <p className="text-xs text-foreground/70">emerald-300</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-emerald-400 border border-white/20"></div>
                  <p className="text-xs text-foreground/70">emerald-400</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-emerald-500 border border-white/20"></div>
                  <p className="text-xs text-foreground/70">emerald-500</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-emerald-600 border border-white/20"></div>
                  <p className="text-xs text-foreground/70">emerald-600</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg bg-emerald-900 border border-white/20"></div>
                  <p className="text-xs text-foreground/70">emerald-900</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
              <CardDescription>8px grid system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'xs', size: '8px' },
                  { name: 'sm', size: '16px' },
                  { name: 'md', size: '24px' },
                  { name: 'lg', size: '32px' },
                  { name: 'xl', size: '40px' },
                  { name: '2xl', size: '48px' },
                ].map((space) => (
                  <div key={space.name} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-foreground/70">{space.name}</div>
                    <div className="h-6 bg-emerald-500/30 border border-emerald-400/50 rounded" style={{ width: space.size }}></div>
                    <div className="text-xs text-foreground/50">{space.size}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
