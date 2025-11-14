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
  TableFooter,
  TablePagination,
  StatusBadge,
  PriorityBadge,
  TableActions,
  ActionButton,
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
  Plus,
  Eye,
  Edit2,
  Trash2,
} from 'lucide-react'

export default function CampeekDesignSystem() {
  const [progress, setProgress] = React.useState(75)
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-8 md:p-16">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(5, 150, 105, 0.5)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
            Design System Enhanced
          </h1>
          <p className="text-lg text-white/70">
            Campeek Visual Identity & Components Library v2.0
          </p>
        </header>

        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Color Palette</h2>
          <p className="text-white/60 mb-10">WCAG AA compliant emerald-based color system</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ColorCard color="bg-emerald-400" name="Primary Light" hex="#34d399" />
            <ColorCard color="bg-emerald-600" name="Primary" hex="#059669" />
            <ColorCard color="bg-emerald-900" name="Primary Dark" hex="#064e3b" />
            <ColorCard color="bg-emerald-500" name="Success" hex="#10b981" />
            <ColorCard color="bg-red-500" name="Error" hex="#ef4444" />
            <ColorCard color="bg-amber-500" name="Warning" hex="#f59e0b" />
          </div>
        </section>

        {/* Gradients Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Gradient System</h2>
          <p className="text-white/60 mb-10">Pre-defined gradients for consistent visual style</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GradientCard
              gradient="bg-gradient-to-br from-emerald-400 to-emerald-600"
              name="Primary Gradient"
              code="linear-gradient(135deg, #34d399 0%, #059669 100%)"
            />
            <GradientCard
              gradient="bg-gradient-to-br from-emerald-600 to-emerald-900"
              name="Dark Gradient"
              code="linear-gradient(135deg, #059669 0%, #064e3b 100%)"
            />
            <GradientCard
              gradient="bg-gradient-to-b from-white via-emerald-300 to-emerald-600"
              name="Text Gradient"
              code="linear-gradient(180deg, #ffffff 30%, #059669 100%)"
            />
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Button System</h2>
          <p className="text-white/60 mb-10">Interactive button styles with all states</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ButtonShowcase variant="primary" label="Primary States" />
            <ButtonShowcase variant="secondary" label="Secondary States" />
            <ButtonShowcase variant="glass" label="Glass States" />
            <ButtonShowcase variant="outline" label="Outline States" />
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Glass Cards</h2>
          <p className="text-white/60 mb-10">Glassmorphic card components with optimized blur</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card p-8 hover:scale-[1.02] transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/30 flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Feature Card</h3>
              <p className="text-white/70">
                Glassmorphic card with icon, title and description text. Perfect for feature showcases.
              </p>
            </Card>

            <Card className="glass-card p-8 hover:scale-[1.02] transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/30 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Content Card</h3>
              <p className="text-white/70">
                Flexible card component with hover effects and smooth transitions.
              </p>
            </Card>

            <Card className="glass-card p-8 hover:scale-[1.02] transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/30 flex items-center justify-center mb-6">
                <Star className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Info Card</h3>
              <p className="text-white/70">
                Clean design with backdrop blur and subtle borders for depth.
              </p>
            </Card>
          </div>
        </section>

        {/* Input Fields Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Input Fields</h2>
          <p className="text-white/60 mb-10">Form elements with all validation states</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6">
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Normal Input
              </label>
              <Input
                placeholder="Zadejte text..."
                className="glass-input"
              />
              <span className="text-xs text-white/60 mt-2 block">Pomocný text pro input</span>
            </div>

            <div className="glass-card p-6">
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Success State
              </label>
              <Input
                defaultValue="Validní hodnota"
                className="glass-input border-emerald-500"
              />
              <span className="text-xs text-emerald-500 mt-2 block">✓ Hodnota je správná</span>
            </div>

            <div className="glass-card p-6">
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Error State
              </label>
              <Input
                defaultValue="neplatny-email"
                className="glass-input border-red-500"
              />
              <span className="text-xs text-red-500 mt-2 block">✗ Zadejte platnou adresu</span>
            </div>

            <div className="glass-card p-6">
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Disabled State
              </label>
              <Input
                defaultValue="Disabled input"
                disabled
                className="glass-input opacity-50"
              />
            </div>
          </div>
        </section>

        {/* Progress Bars Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Progress Indicators</h2>
          <p className="text-white/60 mb-10">Visual feedback for loading and progress states</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="flex justify-between mb-2 text-sm text-white/80">
                <span>Dokončeno</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="glass-progress" />
            </div>

            <div className="glass-card p-6">
              <div className="flex justify-between mb-2 text-sm text-white/80">
                <span>Nahrávání</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="glass-progress" />
            </div>

            <div className="glass-card p-6">
              <div className="flex justify-between mb-2 text-sm text-white/80">
                <span>Úspěch</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="glass-progress" />
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Tab Navigation</h2>
          <p className="text-white/60 mb-10">Interactive tabbed content with keyboard navigation</p>

          <div className="glass-card p-8">
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="glass-tabs-list">
                <TabsTrigger value="tab1" className="glass-tab">Přehled</TabsTrigger>
                <TabsTrigger value="tab2" className="glass-tab">Funkce</TabsTrigger>
                <TabsTrigger value="tab3" className="glass-tab">Nastavení</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="text-white/80 mt-6">
                Toto je obsah prvního tabu. Zde můžete zobrazit přehled informací.
              </TabsContent>
              <TabsContent value="tab2" className="text-white/80 mt-6">
                Obsah druhého tabu s popisem funkcí a možností aplikace.
              </TabsContent>
              <TabsContent value="tab3" className="text-white/80 mt-6">
                Zde jsou nastavení a konfigurace systému.
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Badges & Labels</h2>
          <p className="text-white/60 mb-10">Status indicators and tags</p>

          <div className="flex flex-wrap gap-3">
            <Badge className="glass-badge">⭐ Nejpopulárnější</Badge>
            <Badge className="glass-badge-outline">🎯 Nové</Badge>
            <Badge className="glass-badge-primary">✨ Premium</Badge>
            <Badge className="glass-badge">500+ Uživatelů</Badge>
            <Badge className="glass-badge-outline">Beta</Badge>
            <Badge className="glass-badge-primary">Pro</Badge>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Alert Messages</h2>
          <p className="text-white/60 mb-10">Notification and feedback messages</p>

          <div className="space-y-4">
            <Alert variant="success">
              <CheckCircle2 className="h-5 w-5" />
              <div>
                <h4 className="font-semibold text-emerald-500 mb-1">Úspěšně uloženo</h4>
                <p className="text-sm text-white/70">Vaše změny byly úspěšně uloženy do systému.</p>
              </div>
            </Alert>

            <Alert variant="error">
              <XCircle className="h-5 w-5" />
              <div>
                <h4 className="font-semibold text-red-500 mb-1">Chyba při ukládání</h4>
                <p className="text-sm text-white/70">Něco se pokazilo. Zkuste to prosím znovu.</p>
              </div>
            </Alert>

            <Alert variant="warning">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <h4 className="font-semibold text-amber-500 mb-1">Upozornění</h4>
                <p className="text-sm text-white/70">Tato akce vyžaduje vaši pozornost.</p>
              </div>
            </Alert>

            <Alert variant="info">
              <Info className="h-5 w-5" />
              <div>
                <h4 className="font-semibold text-blue-500 mb-1">Informace</h4>
                <p className="text-sm text-white/70">Nová aktualizace je k dispozici.</p>
              </div>
            </Alert>
          </div>
        </section>

        {/* Data Tables Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Data Tables</h2>
          <p className="text-white/60 mb-10">Elegant data display with status indicators and actions</p>

          {/* Status & Priority Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card p-6">
              <h4 className="text-lg font-semibold mb-4">Statusy</h4>
              <div className="space-y-3">
                <StatusBadge status="pending">Čeká na schválení</StatusBadge>
                <StatusBadge status="approved">Schváleno</StatusBadge>
                <StatusBadge status="rejected">Zamítnuto</StatusBadge>
                <StatusBadge status="review">V kontrole</StatusBadge>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h4 className="text-lg font-semibold mb-4">Priority</h4>
              <div className="space-y-3">
                <PriorityBadge priority="high">High Priority</PriorityBadge>
                <PriorityBadge priority="medium">Medium Priority</PriorityBadge>
                <PriorityBadge priority="low">Low Priority</PriorityBadge>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h4 className="text-lg font-semibold mb-4">Akční tlačítka</h4>
              <div className="flex gap-2 mb-3">
                <ActionButton action="view" title="Zobrazit">
                  <Eye className="w-4 h-4" />
                </ActionButton>
                <ActionButton action="edit" title="Upravit">
                  <Edit2 className="w-4 h-4" />
                </ActionButton>
                <ActionButton action="delete" title="Smazat">
                  <Trash2 className="w-4 h-4" />
                </ActionButton>
              </div>
              <p className="text-xs text-white/60">
                Hover efekty: Zobrazit (modrá), Upravit (zelená), Smazat (červená)
              </p>
            </Card>
          </div>

          {/* Main Data Table */}
          <TableContainer>
            <TableHeader>
              <h3 className="text-xl font-bold">Přihlášky účastníků</h3>
              <Button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Přidat novou
              </Button>
            </TableHeader>

            <TableWrapper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Jméno</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Datum přihlášení</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Priorita</TableHeaderCell>
                    <TableHeaderCell align="right">Akce</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Jan Novák</TableCell>
                    <TableCell className="text-white/60 text-sm">jan.novak@email.cz</TableCell>
                    <TableCell className="text-white/70 text-sm">14. 11. 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="pending">Čeká na schválení</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority="high">High</PriorityBadge>
                    </TableCell>
                    <TableCell>
                      <TableActions>
                        <ActionButton action="view" title="Zobrazit detail">
                          <Eye className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="edit" title="Upravit">
                          <Edit2 className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="delete" title="Smazat">
                          <Trash2 className="w-4 h-4" />
                        </ActionButton>
                      </TableActions>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-semibold">Marie Svobodová</TableCell>
                    <TableCell className="text-white/60 text-sm">marie.svobodova@email.cz</TableCell>
                    <TableCell className="text-white/70 text-sm">13. 11. 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="approved">Schváleno</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority="medium">Medium</PriorityBadge>
                    </TableCell>
                    <TableCell>
                      <TableActions>
                        <ActionButton action="view" title="Zobrazit detail">
                          <Eye className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="edit" title="Upravit">
                          <Edit2 className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="delete" title="Smazat">
                          <Trash2 className="w-4 h-4" />
                        </ActionButton>
                      </TableActions>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-semibold">Petr Dvořák</TableCell>
                    <TableCell className="text-white/60 text-sm">petr.dvorak@email.cz</TableCell>
                    <TableCell className="text-white/70 text-sm">12. 11. 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="review">V kontrole</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority="low">Low</PriorityBadge>
                    </TableCell>
                    <TableCell>
                      <TableActions>
                        <ActionButton action="view" title="Zobrazit detail">
                          <Eye className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="edit" title="Upravit">
                          <Edit2 className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="delete" title="Smazat">
                          <Trash2 className="w-4 h-4" />
                        </ActionButton>
                      </TableActions>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-semibold">Anna Procházková</TableCell>
                    <TableCell className="text-white/60 text-sm">anna.prochazkova@email.cz</TableCell>
                    <TableCell className="text-white/70 text-sm">11. 11. 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="rejected">Zamítnuto</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority="low">Low</PriorityBadge>
                    </TableCell>
                    <TableCell>
                      <TableActions>
                        <ActionButton action="view" title="Zobrazit detail">
                          <Eye className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="edit" title="Upravit">
                          <Edit2 className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="delete" title="Smazat">
                          <Trash2 className="w-4 h-4" />
                        </ActionButton>
                      </TableActions>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-semibold">Tomáš Černý</TableCell>
                    <TableCell className="text-white/60 text-sm">tomas.cerny@email.cz</TableCell>
                    <TableCell className="text-white/70 text-sm">10. 11. 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="approved">Schváleno</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority="high">High</PriorityBadge>
                    </TableCell>
                    <TableCell>
                      <TableActions>
                        <ActionButton action="view" title="Zobrazit detail">
                          <Eye className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="edit" title="Upravit">
                          <Edit2 className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton action="delete" title="Smazat">
                          <Trash2 className="w-4 h-4" />
                        </ActionButton>
                      </TableActions>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableWrapper>

            <TableFooter>
              <div className="text-sm text-white/60">
                Zobrazeno 5 z 47 záznamů
              </div>
              <TablePagination />
            </TableFooter>
          </TableContainer>
        </section>

        {/* Modal Dialog Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Modal Dialog</h2>
          <p className="text-white/60 mb-10">Overlay dialogs for important actions</p>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary">Otevřít Modal</Button>
            </DialogTrigger>
            <DialogContent className="glass-modal">
              <DialogHeader>
                <DialogTitle>Příklad Modalu</DialogTitle>
              </DialogHeader>
              <div className="py-4 text-white/80">
                <p>Toto je příklad modálního okna. Můžete jej použít pro důležité akce, formuláře nebo potvrzovací dialogy.</p>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setModalOpen(false)} className="btn-secondary">
                  Zrušit
                </Button>
                <Button onClick={() => setModalOpen(false)} className="btn-primary">
                  Potvrdit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Loading States Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Loading States</h2>
          <p className="text-white/60 mb-10">Skeleton screens for better perceived performance</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card p-6">
              <Skeleton className="h-6 w-3/5 mb-4 glass-skeleton" />
              <Skeleton className="h-4 w-full mb-2 glass-skeleton" />
              <Skeleton className="h-4 w-full mb-2 glass-skeleton" />
              <Skeleton className="h-4 w-4/5 glass-skeleton" />
            </Card>

            <Card className="glass-card p-6">
              <Skeleton className="h-6 w-3/5 mb-4 glass-skeleton" />
              <Skeleton className="h-4 w-full mb-2 glass-skeleton" />
              <Skeleton className="h-4 w-full mb-2 glass-skeleton" />
              <Skeleton className="h-4 w-3/5 glass-skeleton" />
            </Card>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Typography Scale</h2>
          <p className="text-white/60 mb-10">8px-based font scale using Outfit typeface</p>

          <Card className="glass-card p-10">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold gradient-text">Display 1</h1>
              <h2 className="text-6xl font-bold text-emerald-400">Display 2</h2>
              <h3 className="text-4xl font-bold">Heading 1</h3>
              <h4 className="text-3xl font-semibold text-white/90">Heading 2</h4>
              <p className="text-xl text-white/80 leading-relaxed">
                Body Large - Větší text pro důležité informace a úvodní odstavce.
              </p>
              <p className="text-base text-white/75 leading-relaxed">
                Body Regular - Standardní text pro běžný obsah a popisky. Optimální čitelnost pro delší texty.
              </p>
            </div>
          </Card>
        </section>

        {/* Tooltips Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Tooltips</h2>
          <p className="text-white/60 mb-10">Contextual help on hover</p>

          <div className="flex gap-4 flex-wrap">
            <TooltipSimple content="Toto je tooltip">
              <Button className="btn-secondary">Najetím myší</Button>
            </TooltipSimple>

            <TooltipSimple content="Zobrazit více informací">
              <Button className="btn-primary">Informace</Button>
            </TooltipSimple>

            <TooltipSimple content="Pomocný text zde">
              <Button className="btn-outline">Nápověda</Button>
            </TooltipSimple>
          </div>
        </section>
      </div>
    </div>
  )
}

// Helper Components
function ColorCard({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <div className="glass-card overflow-hidden hover:scale-[1.02] transition-transform">
      <div className={`${color} h-40 flex items-center justify-center text-white font-semibold text-sm shadow-inner`}>
        {name}
      </div>
      <div className="p-6">
        <h3 className="font-semibold mb-2">{name}</h3>
        <div className="space-y-1">
          <p className="text-xs text-white/60 font-mono">HEX: {hex}</p>
        </div>
      </div>
    </div>
  )
}

function GradientCard({ gradient, name, code }: { gradient: string; name: string; code: string }) {
  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-transform">
      <div className={`${gradient} h-32 rounded-xl mb-6`}></div>
      <h3 className="font-semibold mb-2">{name}</h3>
      <p className="text-xs text-white/60 font-mono break-all leading-relaxed">{code}</p>
    </div>
  )
}

function ButtonShowcase({ variant, label }: { variant: string; label: string }) {
  return (
    <div className="glass-card p-8 text-center">
      <p className="text-sm text-white/60 uppercase tracking-wider mb-6 font-medium">{label}</p>
      <div className="space-y-4 flex flex-col items-center">
        <Button className={`btn-${variant}`}>Normal</Button>
        <Button className={`btn-${variant}`} disabled>Disabled</Button>
        {variant === 'primary' && (
          <Button className={`btn-${variant}`} disabled>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </Button>
        )}
      </div>
    </div>
  )
}
