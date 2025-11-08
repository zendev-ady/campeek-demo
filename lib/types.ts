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
