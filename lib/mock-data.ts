import type { User, Organization, OrganizationMember, Event, Registration } from "./types"

export const DEMO_USER: User & { password: string } = {
  id: "demo-user-1",
  email: "demo@campeek.cz",
  name: "Demo Organizátor",
  password: "demo123",
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  emailVerified: true,
}

export const DEMO_ORGANIZATION: Organization = {
  id: "demo-org-1",
  name: "Letní tábory 2025",
  description: "Profesionální organizátor letních táborů v Česku",
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  createdBy: DEMO_USER.id,
}

export const DEMO_MEMBER: OrganizationMember = {
  userId: DEMO_USER.id,
  organizationId: DEMO_ORGANIZATION.id,
  role: "owner",
  joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
}

export const DEMO_EVENTS: Event[] = [
  {
    id: "event-1",
    organizationId: DEMO_ORGANIZATION.id,
    name: "Letní tábor - Jižní Čechy",
    description: "Týdenní intenzivní program s vodními aktivitami v Borovanech",
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 52 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Borovan, Jižní Čechy",
    capacity: 30,
    price: 8500,
    ageMin: 8,
    ageMax: 15,
    status: "published",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: DEMO_USER.id,
  },
  {
    id: "event-2",
    organizationId: DEMO_ORGANIZATION.id,
    name: "Příměstský tábor - Programování",
    description: "Třídenní intenzív věnovaný tvorbě her v Pythonu",
    startDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Praha 5 - Střední škola",
    capacity: 20,
    price: 3500,
    ageMin: 12,
    ageMax: 18,
    status: "published",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: DEMO_USER.id,
  },
  {
    id: "event-3",
    organizationId: DEMO_ORGANIZATION.id,
    name: "Raftingový tábor - Dunaj",
    description: "Dobrodružný rafting s profesionálními průvodci",
    startDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 82 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Österreich - Dunaj",
    capacity: 25,
    price: 12000,
    ageMin: 16,
    ageMax: 25,
    status: "draft",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: DEMO_USER.id,
  },
]

export const DEMO_REGISTRATIONS: Registration[] = [
  {
    id: "reg-1",
    eventId: "event-1",
    parentName: "Jana Nováková",
    parentEmail: "jana.novakova@email.com",
    parentPhone: "+420 723 456 789",
    children: [
      {
        id: "child-1",
        name: "Tomáš Novák",
        birthDate: "2012-05-15",
        allergies: "Arašídy",
        medicalInfo: "Bez zvláštních opatření",
      },
    ],
    totalPrice: 8500,
    status: "confirmed",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Zaplaceno 15.11.2024",
  },
  {
    id: "reg-2",
    eventId: "event-1",
    parentName: "Petr Svoboda",
    parentEmail: "petr.svoboda@email.com",
    parentPhone: "+420 607 123 456",
    children: [
      {
        id: "child-2",
        name: "Matěj Svoboda",
        birthDate: "2011-08-22",
        allergies: "Bez alergiíí",
        medicalInfo: "Astma - rozprašovač v batůžku",
      },
      {
        id: "child-3",
        name: "Lukáš Svoboda",
        birthDate: "2014-03-10",
        allergies: "Bez alergiíí",
        medicalInfo: "Zdravý",
      },
    ],
    totalPrice: 15300,
    status: "confirmed",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Sleva pro sourozence: -10% (1530 Kč)",
  },
  {
    id: "reg-3",
    eventId: "event-1",
    parentName: "Martina Veselá",
    parentEmail: "martina.vesela@email.com",
    parentPhone: "+420 731 222 333",
    children: [
      {
        id: "child-4",
        name: "Kateřina Veselá",
        birthDate: "2013-11-07",
        allergies: "Laktóza",
        medicalInfo: "Bez zvláštních opatření",
      },
    ],
    totalPrice: 8500,
    status: "pending",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Čeká se na zaplacení - reminder poslán",
  },
  {
    id: "reg-4",
    eventId: "event-2",
    parentName: "David Kučera",
    parentEmail: "david.kucera@email.com",
    parentPhone: "+420 776 555 666",
    children: [
      {
        id: "child-5",
        name: "Filip Kučera",
        birthDate: "2010-02-14",
        allergies: "Bez alergiíí",
        medicalInfo: "Zdravý",
      },
    ],
    totalPrice: 3500,
    status: "confirmed",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Zaplaceno",
  },
  {
    id: "reg-5",
    eventId: "event-2",
    parentName: "Klára Černá",
    parentEmail: "klara.cerna@email.com",
    parentPhone: "+420 724 111 222",
    children: [
      {
        id: "child-6",
        name: "Daniel Černý",
        birthDate: "2009-09-05",
        allergies: "Bez alergiíí",
        medicalInfo: "Zdravý",
      },
    ],
    totalPrice: 3500,
    status: "confirmed",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Zaplaceno",
  },
  {
    id: "reg-6",
    eventId: "event-2",
    parentName: "Pavel Horák",
    parentEmail: "pavel.horak@email.com",
    parentPhone: "+420 737 333 444",
    children: [
      {
        id: "child-7",
        name: "Michaela Horáková",
        birthDate: "2010-12-20",
        allergies: "Bez alergiíí",
        medicalInfo: "Zdravý",
      },
    ],
    totalPrice: 3500,
    status: "confirmed",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Zaplaceno",
  },
  {
    id: "reg-7",
    eventId: "event-2",
    parentName: "Eva Bílá",
    parentEmail: "eva.bila@email.com",
    parentPhone: "+420 771 555 666",
    children: [
      {
        id: "child-8",
        name: "Vojtěch Bílý",
        birthDate: "2011-04-15",
        allergies: "Bez alergiíí",
        medicalInfo: "Zdravý",
      },
    ],
    totalPrice: 3500,
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Čeká na potvrzení",
  },
]

export function initializeDemoMode() {
  // Clear existing data
  localStorage.removeItem("user")
  localStorage.removeItem("users")
  localStorage.removeItem("organizations")
  localStorage.removeItem("organizationMembers")
  localStorage.removeItem("events")
  localStorage.removeItem("registrations")

  // Set up demo user
  const users = [DEMO_USER]
  localStorage.setItem("users", JSON.stringify(users))
  localStorage.setItem("user", JSON.stringify({ ...DEMO_USER, password: undefined }))

  // Set up organization
  const organizations = [DEMO_ORGANIZATION]
  localStorage.setItem("organizations", JSON.stringify(organizations))

  // Set up membership
  const members = [DEMO_MEMBER]
  localStorage.setItem("organizationMembers", JSON.stringify(members))
  localStorage.setItem("currentOrganizationId", DEMO_ORGANIZATION.id)

  // Set up events
  localStorage.setItem("events", JSON.stringify(DEMO_EVENTS))

  // Set up registrations
  localStorage.setItem("registrations", JSON.stringify(DEMO_REGISTRATIONS))
}
