export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  emailVerified: boolean
}

export interface Organization {
  id: string
  name: string
  description?: string
  createdAt: string
  createdBy: string
}

export interface OrganizationMember {
  userId: string
  organizationId: string
  role: "owner" | "admin" | "member"
  joinedAt: string
}

export interface NotificationSettings {
  // Upozornění rodičům - Registrace
  parentRegistrationConfirm: boolean
  parentRegistrationCancel: boolean

  // Upozornění rodičům - Platby
  parentPaymentConfirm: boolean
  parentPaymentReminder: boolean
  parentPaymentReminderDays: number

  // Upozornění rodičům - Čekací listina
  parentWaitlistAdded: boolean
  parentWaitlistSpotAvailable: boolean
  parentWaitlistSpotHours: number
  parentWaitlistMoved: boolean

  // Upozornění rodičům - Před akcí
  parentEventReminder: boolean
  parentEventReminderDays: number
  parentEventReminderText: string

  // Upozornění rodičům - Změny akce
  parentEventChanged: boolean
  parentEventCancelled: boolean

  // Upozornění organizátorovi - Registrace
  organizerNewRegistration: boolean
  organizerWaitlistConfirmed: boolean

  // Upozornění organizátorovi - Platby
  organizerPaymentRecorded: boolean

  // Upozornění organizátorovi - Kapacita
  organizerCapacityWarning: boolean
  organizerCapacityWarningPercent: number
  organizerCapacityFull: boolean

  // Upozornění organizátorovi - Před akcí
  organizerEventReminder: boolean
  organizerEventReminderDays: number
  organizerEventReminderNote: string
}

export interface Event {
  id: string
  organizationId: string
  name: string
  description: string
  startDate: string
  startTime?: string
  endDate: string
  endTime?: string
  location: string
  capacity: number
  price: number
  ageMin?: number
  ageMax?: number
  logoUrl?: string
  websiteUrl?: string
  instagramUrl?: string
  facebookUrl?: string
  termsUrl?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  allowInstallments?: boolean
  depositAmount?: number
  finalPaymentAmount?: number
  depositDueDate?: string
  finalPaymentDueDate?: string
  paymentDueDate?: string
  paymentMethods?: ("transfer" | "cash")[]
  bankAccount?: string
  registrationStartDate?: string
  registrationEndDate?: string
  allowDiscounts?: boolean
  discounts?: Discount[]
  allowDiscountCodes?: boolean
  discountCodes?: DiscountCode[]
  contactEmail?: string
  contactPhone?: string
  allowWaitlist?: boolean
  requiresAdminApproval?: boolean
  notificationSettings?: NotificationSettings
}

export interface Payment {
  id: string
  type: "deposit" | "final" | "other"
  amount: number
  dueDate: string | null // ISO
  paidDate: string | null // ISO
  status: "paid" | "unpaid"
  note?: string
}

export interface ChangeHistoryEntry {
  id: string
  timestamp: string // ISO
  action: string // "Přihláška vytvořena", "Záloha zaplacena", etc.
  actor: string // "Systém" or user name
  note?: string
}

export interface Registration {
  id: string
  eventId: string
  participantId: string
  parentId: string // primary contact
  secondaryParentId?: string

  // Legacy fields (for compatibility)
  parentName: string
  parentEmail: string
  parentPhone: string
  children: Child[]

  status: "confirmed" | "waitlist" | "cancelled"

  totalPrice: number
  amountPaid: number

  payments: Payment[]

  registeredAt: string // ISO
  registrationNumber: string // e.g. "#2025-042"

  parentNote?: string // from registration form
  internalNote: string

  changeHistory: ChangeHistoryEntry[]

  createdAt: string
  notes?: string // legacy
}

export interface Child {
  id: string
  name: string
  birthDate: string
  allergies?: string
  medicalInfo?: string
}

export interface Discount {
  id: string
  name: string
  type: "percentage" | "fixed"
  value: number
  condition?: string
}

export interface DiscountCode {
  id: string
  code: string
  value: number
  type: "percentage" | "fixed"
  validFrom?: string
  validUntil?: string
  usageLimit?: number
  usageCount?: number
}

// Communication Domain Types

export interface Message {
  id: string
  organizationId: string
  subject: string
  content: string
  status: "scheduled" | "sent" | "cancelled"
  scheduledAt?: string
  sentAt?: string
  cancelledAt?: string
  recipientFilter?: {
    type: "all" | "event"
    eventId?: string
  }
  recipientIds: string[] // Registration IDs
  attachments?: MessageAttachment[]
  createdAt: string
  createdBy: string
}

export interface MessageAttachment {
  id: string
  name: string
  size: number
  url: string
}

export interface MessageRecipient {
  id: string
  messageId: string
  registrationId: string
  parentName: string
  parentEmail: string
  status: "pending" | "delivered" | "failed"
  deliveredAt?: string
  failedReason?: string
}

export interface OrganizationBranding {
  organizationId: string
  name: string
  logoUrl?: string
  primaryColor: string
  secondaryColor: string
  contactEmail: string
  emailFrom?: string // e.g., "organizace123@campeek.app"
  smtpSettings?: {
    server: string
    port: number
    username: string
    domainVerified: boolean
  }
}

// Contacts Domain Types

export interface Address {
  street: string
  city: string
  zip: string
}

export interface Parent {
  id: string
  name: string
  surname: string
  email: string
  phone: string
  address: Address
  billingInfo?: {
    companyName: string
    ico: string
    dic: string
    billingAddress: Address
  }
  internalNote: string
  organizationId: string
  children: string[] // participant IDs
  registrations: string[] // registration IDs
  status: 'active' | 'inactive'
  createdAt: string
}

export interface Participant {
  id: string
  name: string
  surname: string
  birthDate: string // ISO
  address?: Address
  rodneCislo?: string
  email?: string
  phone?: string
  healthInfo: {
    allergies: string
    healthRestrictions: string
    healthInsurance: string
    swimmer: boolean
  }
  internalNote: string
  organizationId: string
  parents: string[] // parent IDs
  registrations: string[] // registration IDs
  createdAt: string
}
