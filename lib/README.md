# Lib - Shared Utilities & Business Logic

Core utilities, type definitions, React contexts, and shared functions.

## 🗂️ Directory Structure

```
lib/
├── types.ts                    # TypeScript type definitions
├── utils.ts                    # Utility functions
├── auth-context.tsx            # Authentication context
├── organization-context.tsx    # Organization management
├── event-context.tsx           # Event CRUD operations
└── mock-data.ts                # Demo data seeding
```

## 📘 Files Overview

### `types.ts` - Type Definitions

**Central source of truth** for all TypeScript interfaces:

```tsx
// Domain types
export interface User { ... }
export interface Organization { ... }
export interface Event { ... }
export interface Registration { ... }
export interface Child { ... }

// Communication
export interface Message { ... }
export interface MessageRecipient { ... }

// Contacts
export interface Parent { ... }
export interface Participant { ... }
```

**Key domains:**
- **Users & Auth** - User, Organization, OrganizationMember
- **Events** - Event, NotificationSettings, Discount, DiscountCode
- **Registrations** - Registration, Payment, Child, ChangeHistoryEntry
- **Communication** - Message, MessageAttachment, MessageRecipient
- **Contacts** - Parent, Participant, Address
- **Branding** - OrganizationBranding

**Usage:**
```tsx
import type { Event, Registration } from "@/lib/types"

const event: Event = { ... }
```

### `auth-context.tsx` - Authentication

**React Context** for user authentication:

```tsx
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<string>
  resetPassword: (token: string, newPassword: string) => Promise<void>
  isLoading: boolean
}
```

**Usage:**
```tsx
import { useAuth } from "@/lib/auth-context"

function MyComponent() {
  const { user, login, logout } = useAuth()
  
  if (!user) return <LoginForm onSubmit={login} />
  return <div>Welcome {user.name}</div>
}
```

**Storage:** `localStorage.users`, `localStorage.user`

### `organization-context.tsx` - Organizations

**React Context** for organization management:

```tsx
interface OrganizationContextType {
  organizations: Organization[]
  currentOrganization: Organization | null
  setCurrentOrganization: (org: Organization) => void
  userMemberships: OrganizationMember[]
  createOrganization: (name: string, description?: string) => Promise<Organization>
  isLoading: boolean
}
```

**Usage:**
```tsx
import { useOrganization } from "@/lib/organization-context"

function OrgSelector() {
  const { organizations, currentOrganization, setCurrentOrganization } = useOrganization()
  
  return (
    <select onChange={(e) => setCurrentOrganization(organizations[e.target.value])}>
      {organizations.map(org => <option key={org.id}>{org.name}</option>)}
    </select>
  )
}
```

**Storage:** `localStorage.organizations`, `localStorage.organizationMembers`, `localStorage.currentOrganizationId`

### `event-context.tsx` - Events

**React Context** for event CRUD operations:

```tsx
interface EventContextType {
  events: Event[]
  createEvent: (event: Omit<Event, "id" | "createdAt" | "updatedAt" | "createdBy">) => Promise<Event>
  updateEvent: (id: string, updates: Partial<Event>) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  getEventById: (id: string) => Event | undefined
  isLoading: boolean
}
```

**Usage:**
```tsx
import { useEvent } from "@/lib/event-context"

function EventManager() {
  const { events, createEvent, updateEvent, deleteEvent } = useEvent()
  
  const handleCreate = async () => {
    await createEvent({
      name: "Summer Camp 2025",
      capacity: 50,
      // ...
    })
  }
}
```

**Storage:** `localStorage.events`

### `mock-data.ts` - Demo Data

**Seed function** to populate localStorage with demo data:

```tsx
export function initializeDemoMode(): void {
  // Creates:
  // - Demo user (demo@campeek.cz)
  // - Sample organization
  // - Multiple events
  // - Sample registrations
  // - Messages
  
  localStorage.setItem("users", JSON.stringify([demoUser]))
  localStorage.setItem("organizations", JSON.stringify([demoOrg]))
  localStorage.setItem("events", JSON.stringify(demoEvents))
  // ...
}
```

**Usage:**
```tsx
import { initializeDemoMode } from "@/lib/mock-data"

function LandingPage() {
  const handleDemo = () => {
    initializeDemoMode()
    router.push("/dashboard")
  }
  
  return <Button onClick={handleDemo}>Try Demo</Button>
}
```

**Demo credentials:**
- Email: `demo@campeek.cz`
- Password: `demo123`

### `utils.ts` - Utility Functions

**Shared helper functions:**

```tsx
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Currently minimal - for Tailwind class merging.

**Future utilities:**
- Date formatting
- Price calculations
- String manipulation
- Validation helpers

## 🔄 Context Provider Setup

All contexts wrap the app in root layout:

```tsx
// app/layout.tsx
import { AuthProvider } from "@/lib/auth-context"
import { OrganizationProvider } from "@/lib/organization-context"
import { EventProvider } from "@/lib/event-context"

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <OrganizationProvider>
        <EventProvider>
          {children}
        </EventProvider>
      </OrganizationProvider>
    </AuthProvider>
  )
}
```

## 💾 Data Flow Architecture

```
┌─────────────────┐
│  localStorage   │  ← Persistence layer (prototype)
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  React Context  │  ← State management
│   Providers     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Components    │  ← UI layer
│   & Pages       │
└─────────────────┘
```

**Migration path:**
```tsx
// Current (prototype)
localStorage.setItem("events", JSON.stringify(events))

// Future (production)
await api.post("/events", event)
```

## 🎯 Best Practices

### Types
- ✅ Define all interfaces in `types.ts`
- ✅ Export as `export interface` (not `export type`)
- ✅ Use TypeScript strict mode
- ✅ Add JSDoc comments for complex types

### Contexts
- ✅ One context per domain/feature
- ✅ Provide loading states (`isLoading`)
- ✅ Handle errors gracefully
- ✅ Use async/await for operations
- ✅ Keep localStorage keys consistent

### Utils
- ✅ Pure functions (no side effects)
- ✅ Type-safe parameters and returns
- ✅ Add JSDoc documentation
- ✅ Unit test critical utilities

## 🚀 Adding New Context

1. **Create context file:**
```tsx
// lib/registration-context.tsx
"use client"

import { createContext, useContext, useState } from "react"
import type { Registration } from "./types"

interface RegistrationContextType {
  registrations: Registration[]
  addRegistration: (reg: Registration) => void
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined)

export function RegistrationProvider({ children }) {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  
  const addRegistration = (reg: Registration) => {
    setRegistrations(prev => [...prev, reg])
  }
  
  return (
    <RegistrationContext.Provider value={{ registrations, addRegistration }}>
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistration() {
  const context = useContext(RegistrationContext)
  if (!context) throw new Error("Must be used within RegistrationProvider")
  return context
}
```

2. **Add to root layout:**
```tsx
<RegistrationProvider>
  {children}
</RegistrationProvider>
```

3. **Use in components:**
```tsx
const { registrations, addRegistration } = useRegistration()
```

## 🔍 Production Migration Plan

Replace localStorage with API calls:

```tsx
// Create storage abstraction layer
// lib/storage.ts
interface StorageAdapter {
  getEvents: () => Promise<Event[]>
  createEvent: (event: Event) => Promise<Event>
  // ...
}

class LocalStorageAdapter implements StorageAdapter { }
class ApiAdapter implements StorageAdapter { }

export const storage = 
  process.env.NODE_ENV === "production" 
    ? new ApiAdapter() 
    : new LocalStorageAdapter()
```

Then contexts use `storage` instead of `localStorage` directly.
