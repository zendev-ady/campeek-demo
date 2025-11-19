import type {
  User,
  Organization,
  OrganizationMember,
  Event,
  Registration,
  Message,
  MessageRecipient,
  OrganizationBranding,
  Parent,
  Participant
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

// Contacts Domain Mock Data

export const DEMO_PARTICIPANTS: Participant[] = [
  {
    id: "participant-1",
    name: "Tomáš",
    surname: "Novák",
    birthDate: "2012-05-15",
    address: {
      street: "Dlouhá 123",
      city: "Praha 1",
      zip: "11000"
    },
    rodneCislo: undefined,
    email: undefined,
    phone: undefined,
    healthInfo: {
      allergies: "Arašídy",
      healthRestrictions: "Bez zvláštních opatření",
      healthInsurance: "Všeobecná zdravotní pojišťovna",
      swimmer: true
    },
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    parents: ["parent-1"],
    registrations: ["reg-1"],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "participant-2",
    name: "Matěj",
    surname: "Svoboda",
    birthDate: "2011-08-22",
    address: {
      street: "Krátká 45",
      city: "Brno",
      zip: "60200"
    },
    healthInfo: {
      allergies: "",
      healthRestrictions: "Astma - má s sebou inhalátor",
      healthInsurance: "Zdravotní pojišťovna ministerstva vnitra",
      swimmer: true
    },
    internalNote: "Bojí se psů",
    organizationId: DEMO_ORGANIZATION.id,
    parents: ["parent-2"],
    registrations: ["reg-2"],
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "participant-3",
    name: "Lukáš",
    surname: "Svoboda",
    birthDate: "2014-03-10",
    address: {
      street: "Krátká 45",
      city: "Brno",
      zip: "60200"
    },
    healthInfo: {
      allergies: "",
      healthRestrictions: "",
      healthInsurance: "Zdravotní pojišťovna ministerstva vnitra",
      swimmer: false
    },
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    parents: ["parent-2"],
    registrations: ["reg-2"],
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "participant-4",
    name: "Kateřina",
    surname: "Veselá",
    birthDate: "2013-11-07",
    address: {
      street: "Hlavní 78",
      city: "Ostrava",
      zip: "70200"
    },
    healthInfo: {
      allergies: "Laktóza",
      healthRestrictions: "",
      healthInsurance: "Česká průmyslová zdravotní pojišťovna",
      swimmer: true
    },
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    parents: ["parent-3"],
    registrations: ["reg-3"],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "participant-5",
    name: "Filip",
    surname: "Kučera",
    birthDate: "2010-02-14",
    address: {
      street: "Nová 234",
      city: "Plzeň",
      zip: "30100"
    },
    healthInfo: {
      allergies: "",
      healthRestrictions: "",
      healthInsurance: "Oborová zdravotní pojišťovna",
      swimmer: true
    },
    internalNote: "Programátor nadšenec - donést složitější úkoly",
    organizationId: DEMO_ORGANIZATION.id,
    parents: ["parent-4"],
    registrations: ["reg-4"],
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "participant-6",
    name: "Daniel",
    surname: "Černý",
    birthDate: "2009-09-05",
    address: {
      street: "Zahradní 12",
      city: "Liberec",
      zip: "46001"
    },
    healthInfo: {
      allergies: "",
      healthRestrictions: "",
      healthInsurance: "Zaměstnanecká pojišťovna Škoda",
      swimmer: true
    },
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    parents: ["parent-5"],
    registrations: ["reg-5"],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "participant-7",
    name: "Michaela",
    surname: "Horáková",
    birthDate: "2010-12-20",
    address: {
      street: "Školní 89",
      city: "Olomouc",
      zip: "77900"
    },
    healthInfo: {
      allergies: "",
      healthRestrictions: "",
      healthInsurance: "Revírní bratrská pokladna",
      swimmer: false
    },
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    parents: ["parent-6"],
    registrations: ["reg-6"],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "participant-8",
    name: "Vojtěch",
    surname: "Bílý",
    birthDate: "2011-04-15",
    address: {
      street: "Kostelní 56",
      city: "České Budějovice",
      zip: "37001"
    },
    healthInfo: {
      allergies: "Kočky",
      healthRestrictions: "",
      healthInsurance: "Vojenská zdravotní pojišťovna",
      swimmer: true
    },
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    parents: ["parent-7"],
    registrations: ["reg-7"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const DEMO_PARENTS: Parent[] = [
  {
    id: "parent-1",
    name: "Jana",
    surname: "Nováková",
    email: "jana.novakova@email.com",
    phone: "+420 723 456 789",
    address: {
      street: "Dlouhá 123",
      city: "Praha 1",
      zip: "11000"
    },
    billingInfo: undefined,
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    children: ["participant-1"],
    registrations: ["reg-1"],
    status: "active",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "parent-2",
    name: "Petr",
    surname: "Svoboda",
    email: "petr.svoboda@email.com",
    phone: "+420 607 123 456",
    address: {
      street: "Krátká 45",
      city: "Brno",
      zip: "60200"
    },
    billingInfo: {
      companyName: "Svoboda s.r.o.",
      ico: "12345678",
      dic: "CZ12345678",
      billingAddress: {
        street: "Firemní 1",
        city: "Brno",
        zip: "60200"
      }
    },
    internalNote: "Firma - vystavovat faktury na firmu",
    organizationId: DEMO_ORGANIZATION.id,
    children: ["participant-2", "participant-3"],
    registrations: ["reg-2"],
    status: "active",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "parent-3",
    name: "Martina",
    surname: "Veselá",
    email: "martina.vesela@email.com",
    phone: "+420 731 222 333",
    address: {
      street: "Hlavní 78",
      city: "Ostrava",
      zip: "70200"
    },
    billingInfo: undefined,
    internalNote: "Čeká na zaplacení - reminder poslán",
    organizationId: DEMO_ORGANIZATION.id,
    children: ["participant-4"],
    registrations: ["reg-3"],
    status: "active",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "parent-4",
    name: "David",
    surname: "Kučera",
    email: "david.kucera@email.com",
    phone: "+420 776 555 666",
    address: {
      street: "Nová 234",
      city: "Plzeň",
      zip: "30100"
    },
    billingInfo: undefined,
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    children: ["participant-5"],
    registrations: ["reg-4"],
    status: "active",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "parent-5",
    name: "Klára",
    surname: "Černá",
    email: "klara.cerna@email.com",
    phone: "+420 724 111 222",
    address: {
      street: "Zahradní 12",
      city: "Liberec",
      zip: "46001"
    },
    billingInfo: undefined,
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    children: ["participant-6"],
    registrations: ["reg-5"],
    status: "active",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "parent-6",
    name: "Pavel",
    surname: "Horák",
    email: "pavel.horak@email.com",
    phone: "+420 737 333 444",
    address: {
      street: "Školní 89",
      city: "Olomouc",
      zip: "77900"
    },
    billingInfo: undefined,
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    children: ["participant-7"],
    registrations: ["reg-6"],
    status: "active",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "parent-7",
    name: "Eva",
    surname: "Bílá",
    email: "eva.bila@email.com",
    phone: "+420 771 555 666",
    address: {
      street: "Kostelní 56",
      city: "České Budějovice",
      zip: "37001"
    },
    billingInfo: undefined,
    internalNote: "",
    organizationId: DEMO_ORGANIZATION.id,
    children: ["participant-8"],
    registrations: ["reg-7"],
    status: "active",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
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
  localStorage.removeItem("parents")
  localStorage.removeItem("participants")

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

  // Set up contacts data
  localStorage.setItem("parents", JSON.stringify(DEMO_PARENTS))
  localStorage.setItem("participants", JSON.stringify(DEMO_PARTICIPANTS))
}
