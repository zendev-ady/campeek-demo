# Components - UI Building Blocks

Reusable React components organized by feature and complexity.

## 🗂️ Directory Structure

```
components/
├── ui/                          # shadcn/ui primitives (Radix-based)
├── contacts/                    # Contact management components
├── event-registrations/         # Registration management
├── event-settings/              # Event configuration
├── finances/                    # Financial components
├── brand.tsx                    # Campeek branding component
├── landing-page.tsx             # Landing page sections
├── sidebar-menu.tsx             # Dashboard navigation
├── organization-switcher.tsx    # Org selector dropdown
├── global-search.tsx            # Command palette search
└── ...                          # Feature-specific components
```

## 📦 Component Categories

### 1. UI Primitives (`ui/`)

**shadcn/ui components** built on Radix UI:

```
ui/
├── button.tsx          # Button variants and sizes
├── input.tsx           # Form inputs
├── dialog.tsx          # Modal dialogs
├── card.tsx            # Card containers
├── select.tsx          # Dropdown selects
└── ...                 # 16 total primitives
```

**Usage:**
```tsx
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"

<Button variant="default" size="lg">Click me</Button>
```

**Key Features:**
- ✅ Accessible (Radix UI)
- ✅ Customizable with Tailwind
- ✅ TypeScript support
- ✅ Class variance authority

### 2. Feature Components

Organized by domain/feature area:

#### Contacts (`contacts/`)
- Contact listing and filtering
- Contact detail views
- Parent/participant forms

#### Event Registrations (`event-registrations/`)
- Registration list with filters
- Registration detail panel
- Payment tracking
- Status management

#### Event Settings (`event-settings/`)
- General settings
- Pricing configuration
- Discount management
- Notification settings

#### Finances (`finances/`)
- Payment recording
- Financial reports
- Invoice generation

### 3. Layout Components

Shared across multiple pages:

| Component | Purpose | Used In |
|-----------|---------|---------|
| `sidebar-menu.tsx` | Dashboard navigation | All `/dashboard` pages |
| `organization-switcher.tsx` | Switch organizations | Dashboard header |
| `global-search.tsx` | Command palette | Dashboard header |
| `brand.tsx` | Campeek logo | Sidebar, landing |

### 4. Page-Specific Components

Large, complex components tied to specific routes:

- `landing-page.tsx` - Landing page sections
- `event-onboarding-wizard.tsx` - Multi-step event creation
- `new-message-dialog.tsx` - Communication composer
- `organization-branding-settings.tsx` - Org customization

## 🎯 Component Patterns

### Naming Conventions

```tsx
// UI primitives - lowercase
button.tsx, input.tsx, card.tsx

// Feature components - kebab-case
event-card.tsx, registration-list.tsx

// React components - PascalCase exports
export function EventCard() { }
export default function RegistrationList() { }
```

### File Organization

**Small component:**
```tsx
// brand.tsx
export function Brand() {
  return <div>Campeek</div>
}
```

**Feature module:**
```
event-settings/
├── general-settings.tsx
├── pricing-settings.tsx
├── discount-settings.tsx
└── notification-settings.tsx
```

### Import Aliases

All components use `@/` path alias:

```tsx
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/event-card"
import { useAuth } from "@/lib/auth-context"
```

## 🔄 Data Flow

```
Context Providers (lib/)
    ↕
Feature Components (components/)
    ↕
UI Primitives (components/ui/)
```

Components consume contexts:
```tsx
import { useAuth } from "@/lib/auth-context"
import { useOrganization } from "@/lib/organization-context"
import { useEvent } from "@/lib/event-context"
```

## 🚀 Adding New Components

### UI Primitive (shadcn)
```bash
# Use shadcn CLI
npx shadcn@latest add tooltip
```

### Feature Component
```tsx
// components/my-feature.tsx
"use client"  // If using hooks/context

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function MyFeature() {
  const { user } = useAuth()
  return <div>{user.name}</div>
}
```

### Feature Module
```
components/
└── my-feature/
    ├── feature-list.tsx
    ├── feature-detail.tsx
    └── feature-form.tsx
```

## 🎨 Styling

All components use **Tailwind CSS**:

```tsx
<div className="flex items-center gap-2 p-4 bg-white border-2 border-black">
  <Button className="w-full">Submit</Button>
</div>
```

**UI components** support variants via `class-variance-authority`:

```tsx
<Button variant="default" size="lg" />
<Button variant="outline" size="sm" />
<Button variant="ghost" size="icon" />
```

## 🎯 Best Practices

- ✅ Use TypeScript for all components
- ✅ Add `"use client"` for client-side hooks
- ✅ Extract shared logic to custom hooks
- ✅ Keep components focused (single responsibility)
- ✅ Use UI primitives for consistency
- ✅ Organize by feature for large modules
- ✅ Export named functions when possible
- ✅ Use path aliases `@/` for imports

## 🔍 Component Size Guidelines

- **Small** (<100 lines) - Single file
- **Medium** (100-300 lines) - Consider splitting
- **Large** (>300 lines) - Split into module

Example:
```tsx
// Too large (500+ lines) ❌
event-onboarding-wizard.tsx

// Better ✅
event-onboarding-wizard/
├── step-general.tsx
├── step-pricing.tsx
├── step-settings.tsx
└── wizard-shell.tsx
```
