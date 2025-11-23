# Demo - Development & Preview Utilities

Development tools and preview pages for testing and demonstration purposes.

## 🗂️ Structure

```
demo/
├── layout.tsx              # Minimal layout (no sidebar)
└── email/
    └── [id]/
        └── page.tsx        → /demo/email/:id
```

## 🎯 Purpose

### Email Previews (`/demo/email/[id]`)

Preview email templates that would be sent to parents/organizers:

**Use cases:**
- Development - View emails without sending
- Testing - Verify email content and styling
- Demo - Show clients what emails look like

**Example URL:**
```
/demo/email/registration-confirmation
/demo/email/payment-reminder
/demo/email/event-cancelled
```

## 🎨 Layout

Uses minimal layout without dashboard chrome:

```tsx
export default function DemoLayout({ children }) {
  return <>{children}</>  // Just the content
}
```

No sidebar, no header, no navigation - clean preview.

## 🔄 How It Works

1. Create email template component
2. Access via `/demo/email/template-name`
3. Preview in browser with full styling
4. Can link from dashboard for organizer preview

## 💡 When to Use

- ✅ Email template development
- ✅ Email styling testing
- ✅ Client demonstrations
- ✅ QA/testing workflows

## 🚫 Production Considerations

This directory can be:
- Removed in production builds
- Protected by environment check
- Restricted to admin users only

```tsx
// Optional production guard
if (process.env.NODE_ENV === 'production' && !user?.isAdmin) {
  return <NotFound />
}
```

## 🚀 Adding New Demo Pages

1. Create page in relevant subdirectory:
   ```tsx
   // app/demo/invoices/[id]/page.tsx
   export default function InvoicePreview({ params }) {
     return <InvoiceTemplate id={params.id} />
   }
   ```

2. Access at `/demo/invoices/123`

## 🎯 Best Practices

- Keep demo routes under `/demo` prefix
- Use realistic mock data
- Mirror production styling exactly
- Add easy navigation back to dashboard
- Consider authentication for sensitive previews
