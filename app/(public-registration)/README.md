# (public-registration) - Public Event Registration

**Public-facing registration flow** for parents to register their children for camps and events.

## 🌍 Public Access

This route is **NOT protected** - anyone with a link can access it:

```
https://campeek.cz/register/abc-123-event-id
```

## 🗂️ Structure

```
(public-registration)/
├── layout.tsx              → Minimal layout (no sidebar)
└── register/
    └── [id]/
        └── page.tsx        → /register/:id (public registration form)
```

## ❓ Why Separate from Other Routes?

| Route | Purpose | User Type | Auth Required |
|-------|---------|-----------|---------------|
| `(auth)/register` | Create organizer account | Organizers | ❌ No |
| `(public-registration)/register/[id]` | Register child for event | Parents | ❌ No |
| `(app)/events/[id]` | Manage event (admin) | Organizers | ✅ Yes |

These serve **completely different purposes** and audiences!

## 🎯 Registration Flow

```
1. Parent receives event link (shared by organizer)
   ↓
2. Opens /register/abc-123
   ↓
3. Views event details (dates, location, price, capacity)
   ↓
4. Fills registration form:
   - Parent contact info
   - Children details (multiple allowed)
   - Health information
   - Allergies
   ↓
5. Reviews pricing (with sibling discounts)
   ↓
6. Submits registration
   ↓
7. Registration saved to localStorage (demo) / API (production)
   ↓
8. Confirmation screen with registration number
```

## 📋 Form Fields

### Parent Information
- Full name *
- Email *
- Phone number *
- Notes (optional)

### Child Information (repeatable)
- Name *
- Birth date *
- Allergies
- Medical information

### Pricing
- Automatic calculation based on event price
- Sibling discounts applied (10% for 2+ children)
- Discount codes (if enabled by organizer)

## 💾 Data Storage

Registration is saved to `localStorage.registrations` (demo):

```tsx
const registration = {
  id: string,
  eventId: string,  // Links to event
  parentName: string,
  parentEmail: string,
  parentPhone: string,
  children: Child[],
  totalPrice: number,
  status: "pending",
  notes: string,
  createdAt: string,
}
```

## 🎨 No Layout/Sidebar

This page **does NOT inherit** the app layout:
- No sidebar navigation
- No authentication header
- Clean, focused registration form
- Event branding (if configured)
- Gradient background for visual appeal

## 🔄 Integration with App

Once submitted, the registration appears in:
- `(app)/events/[id]/registrations` - Organizers can view and manage
- Organizers receive notifications (when implemented)

## 🚀 Event Link Generation

Organizers can share this link from the event settings:

```tsx
// In event settings page
const registrationUrl = `${baseUrl}/register/${event.id}`
// → https://campeek.cz/register/abc-123

// Can be shared via:
// - Email to parents
// - Social media posts
// - WhatsApp/messaging apps
// - QR codes on posters
```

## 🎯 Features

- ✅ Multiple children in one registration
- ✅ Automatic age validation
- ✅ Capacity checking (when implemented)
- ✅ Waitlist support (when implemented)
- ✅ Discount code validation (when implemented)
- ✅ Sibling discount calculation (10%)
- ✅ Email confirmation (mock in demo)

## 🔐 No Authentication Required

Parents do **NOT** need to create an account:
- Quick registration process
- Lower barrier to entry
- Better conversion rates
- Ideal for one-time events

## 💡 Future Enhancements

- [ ] Email confirmation with payment link
- [ ] Multi-step form with progress indicator
- [ ] File uploads (medical documents, consent forms)
- [ ] Payment gateway integration
- [ ] QR code for registration confirmation
- [ ] SMS notifications
- [ ] Calendar invite generation
