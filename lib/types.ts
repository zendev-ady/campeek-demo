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

export interface Event {
  id: string
  organizationId: string
  name: string
  description: string
  startDate: string
  endDate: string
  location: string
  capacity: number
  price: number
  ageMin?: number
  ageMax?: number
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
}

export interface Registration {
  id: string
  eventId: string
  parentName: string
  parentEmail: string
  parentPhone: string
  children: Child[]
  totalPrice: number
  status?: "pending" | "confirmed" | "cancelled"
  createdAt: string
  notes?: string
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
