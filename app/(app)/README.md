# (app) - Main Application

Protected admin area for event organizers to manage their organizations, events, and registrations.

## 🔒 Authentication

All routes under the `(app)` route group are **protected** by the `layout.tsx`:

```tsx
// Automatic redirect if not authenticated
useEffect(() => {
  if (!authLoading && !user) {
    router.push("/login")
  }
}, [user, authLoading, router])
```

## 🗂️ Routes

```
(app)/
├── layout.tsx                        → Protected layout with sidebar
├── page.tsx                          → / (app home)
├── events/
│   ├── page.tsx                      → /events
│   └── [id]/
│       ├── page.tsx                  → /events/[id]
│       ├── registrations/page.tsx    → /events/[id]/registrations
│       ├── payments/page.tsx         → /events/[id]/payments
│       └── settings/page.tsx         → /events/[id]/settings
├── communication/
│   ├── page.tsx                      → /communication
│   └── preview/[id]/page.tsx         → /communication/preview/[id]
├── contacts/page.tsx                 → /contacts
├── finances/page.tsx                 → /finances
└── organization/page.tsx             → /organization
```

## 🎯 Main Sections

### App Home (`/`)
- Overview cards (total registrations, upcoming events, capacity)
- Quick stats and insights
- Welcome message
- Quick access to recent events

### Events (`/events`)
- List of all events for current organization
- Create/edit/duplicate events
- Event cards with status indicators
- Event detail pages with tabs:
  - **Overview** (`/events/[id]`) - Event details and status
  - **Registrations** (`/events/[id]/registrations`) - Manage participant registrations
  - **Payments** (`/events/[id]/payments`) - Track payments and invoices
  - **Settings** (`/events/[id]/settings`) - Event configuration

### Communication (`/communication`)
- Send messages to parents
- Message history and drafts
- Email templates
- Preview sent messages (`/communication/preview/[id]`)

### Contacts (`/contacts`)
- Manage parents and participants
- Contact information
- Registration history
- Import/export contacts

### Finances (`/finances`)
- Payment overview
- Financial reports
- Export capabilities
- Revenue tracking

### Organization (`/organization`)
- Organization settings
- Branding configuration
- Team management
- Billing information

## 🎨 Shared Layout (`layout.tsx`)

All app pages share this layout:

```
┌─────────────────────────────────────────┐
│ Sidebar                │ Header          │
│ - Brand (/)            │ - Global Search │
│ - Org Switcher         │                 │
│ - Navigation Menu      ├─────────────────┤
│   • Přehled (/)        │                 │
│   • Kontakty           │                 │
│   • Komunikace         │   Page Content  │
│   • Finance            │                 │
│   • Organizace         │                 │
│ - Events List          │                 │
│ - User Profile         │                 │
└────────────────────────┴─────────────────┘
```

**Layout Components:**
- `<SidebarMenu />` - Main navigation with expandable events
- `<OrganizationSwitcher />` - Switch between organizations
- `<GlobalSearch />` - Command palette search (Cmd/Ctrl+K)
- `<Brand />` - Campeek logo (links to `/`)

## 📦 Context Providers

App pages use multiple React contexts:

| Context | Purpose | File |
|---------|---------|------|
| `AuthProvider` | User authentication | `lib/auth-context.tsx` |
| `OrganizationProvider` | Organization management | `lib/organization-context.tsx` |
| `EventProvider` | Event CRUD operations | `lib/event-context.tsx` |

## 🔄 Data Flow

```
localStorage (demo) / API (production)
    ↕
Context Providers
    ↕
App Pages
    ↕
UI Components
```

> **Note:** Currently uses `localStorage` for demo. In production, replace with API calls.

## 🚀 Adding a New App Page

1. **Create page in appropriate directory:**
   ```tsx
   // app/(app)/reports/page.tsx
   export default function ReportsPage() {
     return <div>Reports Dashboard</div>
   }
   // URL: /reports
   ```

2. **Add route to sidebar menu:**
   ```tsx
   // components/sidebar-menu.tsx
   const globalMenuItems = [
     // ... existing items
     { id: "reports", label: "Reporty", href: "/reports", icon: FileText },
   ]
   ```

3. **Ensure proper permissions/context if needed**

## 🎯 URL Structure

After refactoring, all app URLs are clean and short:

```
/                          → App home (dashboard overview)
/events                    → Events management
/events/abc-123            → Event detail
/events/abc-123/settings   → Event settings
/communication             → Communication center
/contacts                  → Contact management
/finances                  → Financial overview
/organization              → Organization settings
```

**Benefits:**
- ✅ Shorter URLs (9-15 characters saved!)
- ✅ Cleaner appearance
- ✅ Easier to remember
- ✅ Better for sharing

## 🔐 Protected vs Public Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `(app)/*` | 🔒 Protected | Authenticated organizers only |
| `(auth)/*` | 🌍 Public | Login/register pages |
| `(public-registration)/*` | 🌍 Public | Parent registration |
| `(marketing)/*` | 🌍 Public | Landing page |

## 🎨 Best Practices

- ✅ Keep pages focused - use tabs for related content
- ✅ Use shared components from `components/`
- ✅ Leverage contexts instead of prop drilling
- ✅ Add loading states for async operations
- ✅ Handle errors gracefully with error boundaries
- ✅ Use TypeScript for type safety
- ✅ Follow existing naming conventions

## 📝 File Naming

- Pages: `page.tsx`
- Layouts: `layout.tsx`
- Loading states: `loading.tsx`
- Error boundaries: `error.tsx`
- Not found: `not-found.tsx`

## 🔍 Navigation Patterns

**Breadcrumbs:**
```
Home → Events → Summer Camp 2025 → Settings
 /      /events   /events/abc-123   /events/abc-123/settings
```

**Sidebar:**
- Global items always visible
- Events section expandable
- Active state highlighted
- Quick navigation to event sub-pages
