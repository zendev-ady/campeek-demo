import { Bell, Info, PiggyBank, Users } from "lucide-react"
import type {
  AdditionalRegistrationOption,
  EventSettingsTab,
  RegistrationField,
} from "./types"

export const EVENT_SETTINGS_TABS: EventSettingsTab[] = [
  { id: "basic", label: "Základní informace", icon: Info },
  { id: "finance", label: "Finance", icon: PiggyBank },
  { id: "registrations", label: "Přihlášky", icon: Users },
  { id: "notifications", label: "Notifikace", icon: Bell },
]

export const REGISTRATION_FIELDS_TEMPLATE: RegistrationField[] = [
  // Sekce Účastník
  {
    id: "participant-firstname",
    label: "Jméno",
    category: "Účastník",
    state: "required",
    isSystem: true,
  },
  {
    id: "participant-lastname",
    label: "Příjmení",
    category: "Účastník",
    state: "required",
    isSystem: true,
  },
  {
    id: "participant-birthdate",
    label: "Datum narození",
    category: "Účastník",
    state: "required",
  },
  {
    id: "participant-birth-number",
    label: "Rodné číslo",
    category: "Účastník",
    state: "hidden",
  },
  {
    id: "participant-email",
    label: "Email",
    category: "Účastník",
    state: "hidden",
  },
  {
    id: "participant-phone",
    label: "Telefon",
    category: "Účastník",
    state: "hidden",
  },
  {
    id: "participant-address",
    label: "Adresa",
    category: "Účastník",
    state: "required",
  },
  {
    id: "participant-insurance",
    label: "Zdravotní pojišťovna",
    category: "Účastník",
    state: "hidden",
  },
  {
    id: "participant-health-restrictions",
    label: "Zdravotní omezení",
    category: "Účastník",
    state: "optional",
  },
  {
    id: "participant-allergies",
    label: "Alergie, dietní omezení",
    category: "Účastník",
    state: "optional",
  },
  {
    id: "participant-swimmer",
    label: "Plavec / Neplavec",
    category: "Účastník",
    state: "hidden",
  },
  {
    id: "participant-insurance-card",
    label: "Kartička pojišťovny",
    category: "Účastník",
    state: "hidden",
  },
  {
    id: "participant-health-certificate",
    label: "Potvrzení o bezinfekčn.",
    category: "Účastník",
    state: "hidden",
  },
  {
    id: "participant-tshirt-size",
    label: "Velikost trička",
    category: "Účastník",
    state: "hidden",
  },
  {
    id: "participant-note",
    label: "Poznámka k účastníkovi",
    category: "Účastník",
    state: "optional",
  },

  // Sekce Rodič
  {
    id: "parent-firstname",
    label: "Jméno",
    category: "Rodič",
    state: "required",
    isSystem: true,
  },
  {
    id: "parent-lastname",
    label: "Příjmení",
    category: "Rodič",
    state: "required",
    isSystem: true,
  },
  {
    id: "parent-birthdate",
    label: "Datum narození",
    category: "Rodič",
    state: "hidden",
  },
  {
    id: "parent-address",
    label: "Adresa",
    category: "Rodič",
    state: "required",
  },
  {
    id: "parent-email",
    label: "Kontaktní email",
    category: "Rodič",
    state: "required",
    isSystem: true,
  },
  {
    id: "parent-phone",
    label: "Kontaktní telefon",
    category: "Rodič",
    state: "required",
  },
  {
    id: "parent-relation",
    label: "Vztah",
    category: "Rodič",
    state: "required",
  },
  {
    id: "parent-company",
    label: "Název firmy",
    category: "Rodič",
    state: "hidden",
  },
  {
    id: "parent-ico",
    label: "IČO",
    category: "Rodič",
    state: "hidden",
  },
  {
    id: "parent-dic",
    label: "DIČ",
    category: "Rodič",
    state: "hidden",
  },
  {
    id: "parent-billing-address",
    label: "Fakturační adresa",
    category: "Rodič",
    state: "hidden",
  },

  // Sekce Ostatní
  {
    id: "other-note",
    label: "Poznámka k přihlášce",
    category: "Ostatní",
    state: "optional",
  },
  {
    id: "other-terms",
    label: "Potvrzení podmínek akce",
    category: "Ostatní",
    state: "hidden",
  },
  {
    id: "other-gdpr",
    label: "Souhlas s GDPR",
    category: "Ostatní",
    state: "required",
    isSystem: true,
  },
  {
    id: "other-photo-consent",
    label: "Souhlas s fotografováním",
    category: "Ostatní",
    state: "hidden",
  },
]

export const ADDITIONAL_REGISTRATION_OPTIONS: AdditionalRegistrationOption[] = [
  {
    id: "requireAdminApproval",
    label: "Vyžadovat potvrzení přihlášky administrátorem",
    helper: "Přihlášky budou po odeslání označeny jako \"Nové\" a organizátor je musí ručně potvrdit.",
  },
  {
    id: "allowWaitlist",
    label: "Povolit čekací listinu",
    helper: "Pokud je akce plná, nové přihlášky se zařadí na čekací listinu.",
  },
]

export const PARTICIPANT_SECTION_OPTIONS = [
  { value: "Účastník", label: "Účastník" },
  { value: "Dítě", label: "Dítě" },
  { value: "Táborník", label: "Táborník" },
  { value: "Skautík", label: "Skautík" },
  { value: "Sportovec", label: "Sportovec" },
]

export const PARENT_SECTION_OPTIONS = [
  { value: "Rodič", label: "Rodič" },
  { value: "Zákonný zástupce", label: "Zákonný zástupce" },
  { value: "Objednavatel", label: "Objednavatel" },
]
