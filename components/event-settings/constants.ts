import { Bell, Info, MessageSquare, PiggyBank, Users } from "lucide-react"
import type {
  AdditionalRegistrationOption,
  EventSettingsTab,
  RegistrationField,
  RegistrationFieldCategory,
} from "./types"

export const EVENT_SETTINGS_TABS: EventSettingsTab[] = [
  { id: "basic", label: "Základní informace", icon: Info },
  { id: "finance", label: "Finance", icon: PiggyBank },
  { id: "registrations", label: "Přihlášky", icon: Users },
  { id: "communication", label: "Komunikace", icon: MessageSquare },
  { id: "notifications", label: "Notifikace", icon: Bell },
]

export const REGISTRATION_FIELDS_TEMPLATE: RegistrationField[] = [
  {
    id: "child-name",
    label: "Jméno dítěte",
    category: "Dítě",
    description: "K identifikaci účastníka.",
    required: true,
    visible: true,
  },
  {
    id: "child-birthdate",
    label: "Datum narození",
    category: "Dítě",
    description: "Používá se pro ověření věkové vhodnosti.",
    required: true,
    visible: true,
  },
  {
    id: "insurance",
    label: "Zdravotní pojišťovna",
    category: "Dítě",
    description: "Pomáhá organizátorům při řešení zdravotních situací.",
    required: false,
    visible: true,
  },
  {
    id: "allergies",
    label: "Alergie / Zdravotní omezení",
    category: "Dítě",
    description: "Důležité pro stravování nebo ubytování.",
    required: false,
    visible: true,
  },
  {
    id: "parent-contact",
    label: "Kontakt na rodiče",
    category: "Rodič",
    description: "Primární kontakt pro komunikaci.",
    required: true,
    visible: true,
  },
  {
    id: "second-parent",
    label: "Druhý zákonný zástupce",
    category: "Rodič",
    description: "Volitelné – např. u rozvedených rodičů.",
    required: false,
    visible: true,
  },
  {
    id: "note",
    label: "Poznámka",
    category: "Ostatní",
    description: "Pole pro doplňující informace od rodiče.",
    required: false,
    visible: true,
  },
  {
    id: "gdpr",
    label: "Souhlas s GDPR",
    category: "Souhlasy",
    description: "Bez souhlasu není možné odeslat přihlášku.",
    required: true,
    visible: true,
  },
  {
    id: "photo-consent",
    label: "Souhlas s fotografováním",
    category: "Souhlasy",
    description: "Volitelné podle potřeb akce.",
    required: false,
    visible: true,
  },
]

export const ADDITIONAL_REGISTRATION_OPTIONS: AdditionalRegistrationOption[] = [
  {
    id: "requireAdminApproval",
    label: "Vyžadovat potvrzení přihlášky administrátorem",
    helper: "Přihlášky budou po odeslání označeny jako „Nové“ a organizátor je musí ručně potvrdit.",
  },
  {
    id: "allowWaitlist",
    label: "Povolit čekací listinu",
    helper: "Pokud je akce plná, nové přihlášky se zařadí na čekací listinu.",
  },
  {
    id: "sendConfirmationEmail",
    label: "Odesílat potvrzovací e-mail rodiči po odeslání formuláře",
    helper: "Rodič obdrží e-mail s potvrzením a souhrnem přihlášky.",
  },
  {
    id: "showSummaryOnSubmit",
    label: "Zobrazit souhrn přihlášky po odeslání (na webu)",
    helper: "Umožní rodiči zkontrolovat všechny zadané údaje.",
  },
]

export const PUBLIC_FORM_LINK = "https://app.campcrm.cz/form/akce123"
export const IFRAME_SNIPPET = `<iframe src="${PUBLIC_FORM_LINK}" width="100%" height="820" style="border:0;" title="Přihláška na akci"></iframe>`

export const CATEGORY_BADGE_STYLES: Record<RegistrationFieldCategory, string> = {
  Dítě: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Rodič: "border-sky-200 bg-sky-50 text-sky-700",
  Souhlasy: "border-amber-200 bg-amber-50 text-amber-700",
  Ostatní: "border-slate-200 bg-slate-50 text-slate-600",
}
