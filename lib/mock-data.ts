import type {
  User,
  Organization,
  OrganizationMember,
  Event,
  Registration,
  Message,
  MessageRecipient,
  OrganizationBranding
} from "./types"

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

// Communication Domain Mock Data

export const DEMO_BRANDING: OrganizationBranding = {
  organizationId: DEMO_ORGANIZATION.id,
  name: DEMO_ORGANIZATION.name,
  logoUrl: undefined,
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
  contactEmail: "info@letnítabory2025.cz",
  emailFrom: "org-letnítabory@campeek.app",
}

export const DEMO_MESSAGES: Message[] = [
  {
    id: "msg-1",
    organizationId: DEMO_ORGANIZATION.id,
    subject: "Důležité informace před začátkem tábora",
    content: `Milí rodiče,

blíží se začátek letního tábora a rádi bychom vás informovali o několika důležitých věcech:

1. **Sraz:** V neděli 15.7. v 9:00 na parkovišti u školy v Borovanech
2. **Co s sebou:** Seznam najdete v příloze
3. **Kontakt:** V případě nouze volejte +420 603 123 456

Těšíme se na vaše děti!

S pozdravem,
Tým Letních táborů 2025`,
    status: "sent",
    sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    recipientFilter: {
      type: "event",
      eventId: "event-1",
    },
    recipientIds: ["reg-1", "reg-2", "reg-3"],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: DEMO_USER.id,
  },
  {
    id: "msg-2",
    organizationId: DEMO_ORGANIZATION.id,
    subject: "Připomenutí platby",
    content: `Dobrý den,

rádi bychom vás upozornili, že zbývá doplatit zálohu za letní tábor ve výši 4250 Kč.

Termín splatnosti: 30.6.2025

Platební údaje:
Číslo účtu: 123456789/0100
Variabilní symbol: 2025001

Děkujeme!`,
    status: "sent",
    sentAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    recipientFilter: {
      type: "event",
      eventId: "event-1",
    },
    recipientIds: ["reg-3"],
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: DEMO_USER.id,
  },
  {
    id: "msg-3",
    organizationId: DEMO_ORGANIZATION.id,
    subject: "Výzva k doplnění zdravotních informací",
    content: `Vážení rodiče,

pro zajištění bezpečnosti vašich dětí během tábora prosíme o doplnění zdravotních informací v systému.

Přihlaste se prosím do vašeho účtu a doplňte:
- Alergie
- Pravidelné medikace
- Zvláštní zdravotní potřeby

Děkujeme za spolupráci!`,
    status: "scheduled",
    scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    recipientFilter: {
      type: "event",
      eventId: "event-1",
    },
    recipientIds: ["reg-1", "reg-2", "reg-3"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: DEMO_USER.id,
  },
  {
    id: "msg-4",
    organizationId: DEMO_ORGANIZATION.id,
    subject: "Informace o programovacím kempu",
    content: `Ahoj rodiče!

Už za týden startuje náš programovací kemp! 🚀

Co s sebou:
- Vlastní notebook (pokud máte)
- Dobrou náladu
- Svačinu a pití

Těšíme se na vaše budoucí programátory!`,
    status: "sent",
    sentAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    recipientFilter: {
      type: "event",
      eventId: "event-2",
    },
    recipientIds: ["reg-4", "reg-5", "reg-6", "reg-7"],
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: DEMO_USER.id,
  },
]

export const DEMO_MESSAGE_RECIPIENTS: MessageRecipient[] = [
  // Message 1 recipients
  {
    id: "recipient-1",
    messageId: "msg-1",
    registrationId: "reg-1",
    parentName: "Jana Nováková",
    parentEmail: "jana.novakova@email.com",
    status: "delivered",
    deliveredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "recipient-2",
    messageId: "msg-1",
    registrationId: "reg-2",
    parentName: "Petr Svoboda",
    parentEmail: "petr.svoboda@email.com",
    status: "delivered",
    deliveredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "recipient-3",
    messageId: "msg-1",
    registrationId: "reg-3",
    parentName: "Martina Veselá",
    parentEmail: "martina.vesela@email.com",
    status: "delivered",
    deliveredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // Message 2 recipients
  {
    id: "recipient-4",
    messageId: "msg-2",
    registrationId: "reg-3",
    parentName: "Martina Veselá",
    parentEmail: "martina.vesela@email.com",
    status: "delivered",
    deliveredAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // Message 3 recipients (scheduled - pending)
  {
    id: "recipient-5",
    messageId: "msg-3",
    registrationId: "reg-1",
    parentName: "Jana Nováková",
    parentEmail: "jana.novakova@email.com",
    status: "pending",
  },
  {
    id: "recipient-6",
    messageId: "msg-3",
    registrationId: "reg-2",
    parentName: "Petr Svoboda",
    parentEmail: "petr.svoboda@email.com",
    status: "pending",
  },
  {
    id: "recipient-7",
    messageId: "msg-3",
    registrationId: "reg-3",
    parentName: "Martina Veselá",
    parentEmail: "martina.vesela@email.com",
    status: "pending",
  },
  // Message 4 recipients
  {
    id: "recipient-8",
    messageId: "msg-4",
    registrationId: "reg-4",
    parentName: "David Kučera",
    parentEmail: "david.kucera@email.com",
    status: "delivered",
    deliveredAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "recipient-9",
    messageId: "msg-4",
    registrationId: "reg-5",
    parentName: "Klára Černá",
    parentEmail: "klara.cerna@email.com",
    status: "delivered",
    deliveredAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "recipient-10",
    messageId: "msg-4",
    registrationId: "reg-6",
    parentName: "Pavel Horák",
    parentEmail: "pavel.horak@email.com",
    status: "failed",
    failedReason: "Invalid email address",
  },
  {
    id: "recipient-11",
    messageId: "msg-4",
    registrationId: "reg-7",
    parentName: "Eva Bílá",
    parentEmail: "eva.bila@email.com",
    status: "delivered",
    deliveredAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
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
  localStorage.removeItem("messages")
  localStorage.removeItem("messageRecipients")
  localStorage.removeItem("organizationBranding")

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

  // Set up communication data
  localStorage.setItem("messages", JSON.stringify(DEMO_MESSAGES))
  localStorage.setItem("messageRecipients", JSON.stringify(DEMO_MESSAGE_RECIPIENTS))
  localStorage.setItem("organizationBranding", JSON.stringify(DEMO_BRANDING))
}
