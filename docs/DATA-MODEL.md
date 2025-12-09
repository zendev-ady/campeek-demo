# Datový model aplikace Campeek

> Kompletní dokumentace datového modelu pro správu táborů, kroužků a dětských akcí.

---

## Obsah

1. [High-level architektura](#high-level-architektura)
2. [Organizace dat v rámci tenantu](#organizace-dat-v-rámci-tenantu)
3. [Přehled entit](#přehled-entit)
4. [Detailní popis entit](#detailní-popis-entit)
5. [Relace mezi entitami](#relace-mezi-entitami)
6. [ER Diagram](#er-diagram)
7. [Datové toky a Use Cases](#datové-toky-a-use-cases)

---

## High-level architektura

Aplikace Campeek je **multi-tenantní systém** pro správu dětských akcí (táborů, kroužků, příměstských táborů). Architektura je postavena na následujících principech:

### Základní vrstvy

```
┌─────────────────────────────────────────────────────────────┐
│                    UŽIVATELSKÁ VRSTVA                       │
│              (Uživatel, Autentizace, Role)                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   ORGANIZAČNÍ VRSTVA                        │
│        (Organizace, Členství, Branding, Nastavení)          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     KONTAKTNÍ VRSTVA                        │
│              (Rodiče, Účastníci, Vazby)                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    EVENTOVÁ VRSTVA                          │
│        (Akce, Přihlášky, Platby, Čekací listina)            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  KOMUNIKAČNÍ VRSTVA                         │
│         (Zprávy, Notifikace, Hromadná komunikace)           │
└─────────────────────────────────────────────────────────────┘
```

### Klíčové koncepty

| Koncept | Popis |
|---------|-------|
| **Tenant** | Každá organizace je izolovaný tenant s vlastními daty |
| **Hierarchie** | Uživatel → Organizace → Akce → Přihlášky |
| **Kontakty** | Sdílená databáze rodičů a účastníků v rámci organizace |
| **Flexibilita** | Konfigurovatelné formuláře, platby, notifikace |

---

## Organizace dat v rámci tenantu

### Co je tenant (organizace)?

**Organizace** je základní jednotka izolace dat v systému. Může představovat:
- Oddíl skautů
- Táborovou agenturu
- Sportovní klub
- Volnočasové centrum
- Jakoukoli entitu pořádající dětské akce

### Data na úrovni organizace

Tyto entity existují **na úrovni organizace** a jsou sdílené mezi všemi akcemi:

| Entita | Účel |
|--------|------|
| **Rodiče** | Databáze zákonných zástupců |
| **Účastníci** | Databáze dětí/účastníků |
| **Branding** | Logo, barvy, kontakty organizace |
| **Členové týmu** | Uživatelé s přístupem k organizaci |
| **Zprávy** | Historie odeslané komunikace |

### Data na úrovni akce (eventu)

Tyto entity existují **na úrovni konkrétní akce**:

| Entita | Účel |
|--------|------|
| **Přihlášky** | Registrace na konkrétní akci |
| **Platby** | Platby vázané na přihlášku |
| **Slevy** | Cenové slevy pro danou akci |
| **Slevové kódy** | Promo kódy pro akci |
| **Nastavení notifikací** | Konfigurace upozornění |

### Diagram izolace dat

```
┌─────────────────────────────────────────────────────────────┐
│                    ORGANIZACE "Tábory s.r.o."               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  SDÍLENÉ KONTAKTY                                   │    │
│  │  ├── Rodič: Jana Nováková                           │    │
│  │  ├── Rodič: Petr Svoboda                            │    │
│  │  ├── Účastník: Tomáš Novák (syn Jany)               │    │
│  │  └── Účastník: Anna Svobodová (dcera Petra)         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │  AKCE: Letní tábor   │  │  AKCE: Zimní tábor   │         │
│  │  ├── Přihláška #001  │  │  ├── Přihláška #001  │         │
│  │  ├── Přihláška #002  │  │  └── Přihláška #002  │         │
│  │  ├── Platby          │  │                      │         │
│  │  └── Slevy           │  └──────────────────────┘         │
│  └──────────────────────┘                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Přehled entit

### Doménové oblasti

Systém je rozdělen do následujících doménových oblastí:

#### 1. Autentizace a uživatelé
- **User** – Uživatel systému (organizátor)

#### 2. Organizace a správa
- **Organization** – Organizace/tenant
- **OrganizationMember** – Členství uživatele v organizaci
- **OrganizationBranding** – Vizuální identita organizace

#### 3. Kontakty
- **Parent** – Rodič/zákonný zástupce
- **Participant** – Účastník (dítě)
- **Address** – Adresa (vložená entita)

#### 4. Akce a události
- **Event** – Akce (tábor, kroužek, příměstský tábor)
- **NotificationSettings** – Nastavení notifikací akce

#### 5. Registrace a přihlášky
- **Registration** – Přihláška na akci
- **Child** – Dítě v přihlášce (legacy)
- **ChangeHistoryEntry** – Záznam změny přihlášky

#### 6. Finance
- **Payment** – Platba
- **Discount** – Sleva
- **DiscountCode** – Slevový kód

#### 7. Komunikace
- **Message** – Zpráva
- **MessageAttachment** – Příloha zprávy
- **MessageRecipient** – Příjemce zprávy

---

## Detailní popis entit

### User (Uživatel)

**Účel:** Reprezentuje osobu, která má přístup do administrace systému.

**Klíčové vlastnosti:**
- Unikátní e-mailová adresa
- Jméno pro zobrazení
- Stav ověření e-mailu
- Datum registrace

**Business pravidla:**
- Jeden uživatel může být členem více organizací
- Uživatel může mít různé role v různých organizacích
- E-mail slouží jako přihlašovací identifikátor

---

### Organization (Organizace)

**Účel:** Základní tenant systému – reprezentuje subjekt pořádající akce.

**Klíčové vlastnosti:**
- Název organizace
- Volitelný popis
- Odkaz na zakladatele (User)
- Datum založení

**Business pravidla:**
- Organizace je izolovaná jednotka – data jedné organizace nejsou viditelná pro jinou
- Při vytvoření se zakladatel automaticky stává vlastníkem
- Organizace může mít libovolný počet akcí, kontaktů a členů

---

### OrganizationMember (Člen organizace)

**Účel:** Vazební entita určující, kteří uživatelé mají přístup k organizaci a s jakými právy.

**Role:**
| Role | Oprávnění |
|------|-----------|
| **owner** | Plná správa, mazání organizace, správa členů |
| **admin** | Správa akcí, kontaktů, přihlášek |
| **member** | Pouze prohlížení a omezené úpravy |

**Business pravidla:**
- Každá organizace musí mít alespoň jednoho vlastníka
- Uživatel může mít pouze jednu roli v rámci organizace

---

### OrganizationBranding (Vizuální identita)

**Účel:** Definuje vizuální podobu organizace pro veřejné stránky a e-maily.

**Klíčové vlastnosti:**
- Logo organizace
- Primární a sekundární barva
- Kontaktní e-mail
- SMTP nastavení pro vlastní doménu

**Business pravidla:**
- Každá organizace má právě jedno nastavení brandingu
- Branding se aplikuje na registrační formuláře a e-mailové notifikace

---

### Parent (Rodič)

**Účel:** Reprezentuje zákonného zástupce účastníka (rodiče, opatrovníka).

**Klíčové vlastnosti:**
- Jméno a příjmení
- Kontaktní údaje (e-mail, telefon)
- Adresa bydliště
- Fakturační údaje (volitelné – IČO, DIČ, firemní adresa)
- Stav (aktivní/neaktivní)
- Interní poznámka

**Business pravidla:**
- Rodič existuje na úrovni organizace a je sdílen mezi akcemi
- Jeden rodič může mít více dětí (účastníků)
- Rodič může být hlavním i vedlejším kontaktem na přihlášce
- E-mail rodiče je primární kanál pro komunikaci

---

### Participant (Účastník)

**Účel:** Reprezentuje dítě nebo osobu, která se účastní akcí.

**Klíčové vlastnosti:**
- Jméno a příjmení
- Datum narození
- Rodné číslo (volitelné)
- Zdravotní informace (alergie, omezení, pojišťovna, plavec)
- Kontaktní údaje (volitelné – pro starší účastníky)
- Interní poznámka

**Business pravidla:**
- Účastník existuje na úrovni organizace a je sdílen mezi akcemi
- Jeden účastník může mít více rodičů (rozvedení rodiče, prarodiče)
- Zdravotní informace jsou klíčové pro bezpečnost na akcích
- Z data narození se automaticky počítá věk pro kontrolu věkových omezení

---

### Event (Akce)

**Účel:** Reprezentuje konkrétní akci – tábor, kroužek, příměstský tábor, výlet.

**Klíčové vlastnosti:**

*Základní informace:*
- Název a popis
- URL slug pro veřejnou stránku
- Datum a čas konání
- Místo konání
- Kapacita
- Věkové omezení

*Cena a platby:*
- Základní cena
- Možnost splátek (záloha + doplatek)
- Termíny splatnosti
- Platební metody (převod, hotovost)
- Bankovní účet

*Registrace:*
- Datum otevření/uzavření registrace
- Schvalování administrátorem
- Čekací listina

*Slevy:*
- Automatické slevy (sourozenecká, věrnostní)
- Slevové kódy

*Kontakt a sociální sítě:*
- Kontaktní e-mail a telefon
- Odkazy na web, Instagram, Facebook
- Obchodní podmínky

**Business pravidla:**
- Akce patří vždy právě jedné organizaci
- Kapacita určuje maximální počet účastníků (ne přihlášek)
- Při plné kapacitě se nové přihlášky řadí na čekací listinu
- Věkové omezení se kontroluje k datu začátku akce

---

### Registration (Přihláška)

**Účel:** Reprezentuje přihlášku účastníka na konkrétní akci.

**Klíčové vlastnosti:**
- Registrační číslo (např. #2025-042)
- Stav (potvrzeno, čekací listina, zrušeno)
- Celková cena a zaplacená částka
- Hlavní a vedlejší rodič
- Poznámka od rodiče
- Interní poznámka organizátora

**Stavy přihlášky:**
| Stav | Popis |
|------|-------|
| **confirmed** | Přihláška je potvrzena, místo je rezervováno |
| **waitlist** | Přihláška je na čekací listině |
| **cancelled** | Přihláška byla zrušena |

**Business pravidla:**
- Přihláška propojuje účastníka, rodiče a akci
- Jedna přihláška = jeden účastník na jedné akci
- Přihláška obsahuje historii všech změn
- Při uvolnění místa se automaticky osloví první z čekací listiny

---

### Payment (Platba)

**Účel:** Reprezentuje jednotlivou platbu v rámci přihlášky.

**Typy plateb:**
| Typ | Popis |
|-----|-------|
| **deposit** | Záloha |
| **final** | Doplatek |
| **other** | Jiná platba (např. storno poplatek) |

**Stavy:**
- **paid** – Zaplaceno
- **unpaid** – Nezaplaceno (čeká na platbu)

**Business pravidla:**
- Platba je vždy vázána na přihlášku
- Součet všech plateb = celková cena přihlášky
- Systém sleduje datum splatnosti a datum zaplacení
- Automatické upomínky při blížící se splatnosti

---

### ChangeHistoryEntry (Historie změn)

**Účel:** Auditní záznam o změnách přihlášky.

**Typické akce:**
- Přihláška vytvořena
- Záloha zaplacena
- Přesun z čekací listiny
- Změna kontaktních údajů
- Přihláška zrušena

**Business pravidla:**
- Každá změna přihlášky vytváří nový záznam
- Zaznamenává se kdo změnu provedl (uživatel nebo systém)
- Historie je neměnná – nelze ji upravovat ani mazat

---

### Message (Zpráva)

**Účel:** Reprezentuje hromadnou komunikaci směrem k rodičům.

**Klíčové vlastnosti:**
- Předmět a obsah
- Stav (naplánováno, odesláno, zrušeno)
- Filtr příjemců (všichni nebo konkrétní akce)
- Přílohy

**Stavy zprávy:**
| Stav | Popis |
|------|-------|
| **scheduled** | Zpráva je naplánována k odeslání |
| **sent** | Zpráva byla odeslána |
| **cancelled** | Odeslání bylo zrušeno |

**Business pravidla:**
- Zpráva může být odeslána okamžitě nebo naplánována
- Příjemci se určují podle filtru (všechny přihlášky nebo přihlášky konkrétní akce)
- Sleduje se doručení každému příjemci

---

### NotificationSettings (Nastavení notifikací)

**Účel:** Konfigurace automatických upozornění pro akci.

**Notifikace pro rodiče:**
- Potvrzení/zrušení přihlášky
- Potvrzení platby, upomínka na platbu
- Přidání na čekací listinu, uvolnění místa
- Připomínka před akcí
- Změna/zrušení akce

**Notifikace pro organizátory:**
- Nová přihláška
- Zaplacená platba
- Varování při naplnění kapacity
- Připomínka před akcí

---

## Relace mezi entitami

### 1:N (Jeden ku mnoha)

| Vztah | Popis |
|-------|-------|
| User → Organization | Uživatel vytváří organizace |
| Organization → Event | Organizace má mnoho akcí |
| Organization → Parent | Organizace má databázi rodičů |
| Organization → Participant | Organizace má databázi účastníků |
| Organization → Message | Organizace odesílá zprávy |
| Event → Registration | Akce má mnoho přihlášek |
| Event → Discount | Akce má definované slevy |
| Event → DiscountCode | Akce má slevové kódy |
| Registration → Payment | Přihláška má platby |
| Registration → ChangeHistoryEntry | Přihláška má historii změn |
| Message → MessageRecipient | Zpráva má příjemce |

### 1:1 (Jeden ku jednomu)

| Vztah | Popis |
|-------|-------|
| Organization ↔ OrganizationBranding | Organizace má jeden branding |
| Event ↔ NotificationSettings | Akce má jedno nastavení notifikací |

### N:M (Mnoho ku mnoha)

| Vztah | Realizace | Popis |
|-------|-----------|-------|
| User ↔ Organization | OrganizationMember | Uživatel může být v mnoha organizacích |
| Parent ↔ Participant | Pole ID v obou entitách | Rodič může mít více dětí, dítě více rodičů |
| Participant ↔ Registration | Pole ID v Participant | Účastník může mít více přihlášek |
| Parent ↔ Registration | parentId + secondaryParentId | Přihláška má hlavního a vedlejšího rodiče |

### Vazba Participant ↔ Parent (detailně)

Tato vazba je klíčová pro správu rodin:

```
           ┌─────────────────────┐
           │       Parent        │
           │   Jana Nováková     │
           │   children: [P1,P2] │
           └──────────┬──────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ Participant│  │ Participant│  │  Parent   │
  │  Tomáš    │  │  Anička   │  │  (otec)   │
  │parents:[J]│  │parents:[J]│  │children:[]│
  └──────────┘  └──────────┘  └───────────┘
      (P1)          (P2)
```

**Scénáře:**
- **Běžná rodina:** Matka + otec → 2 děti (obě děti mají oba rodiče)
- **Samoživitel:** 1 rodič → N dětí
- **Rozvedení rodiče:** Dítě má 2 rodiče, každý má přístup k přihláškám
- **Prarodiče:** Mohou být vedlejším kontaktem na přihlášce

---

## ER Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USER                                        │
│  id | email | name | createdAt | emailVerified                          │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            │ createdBy                           │ userId
            ▼                                     ▼
┌───────────────────────────┐         ┌────────────────────────────┐
│       ORGANIZATION        │◄────────│   ORGANIZATION_MEMBER      │
│  id | name | description  │         │  userId | organizationId   │
│  createdAt | createdBy    │         │  role | joinedAt           │
└───────────────────────────┘         └────────────────────────────┘
            │
            │ organizationId
            │
            ├────────────────┬────────────────┬────────────────┐
            │                │                │                │
            ▼                ▼                ▼                ▼
┌───────────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────────────┐
│ ORGANIZATION_     │ │   PARENT    │ │ PARTICIPANT │ │     MESSAGE      │
│ BRANDING          │ │  id | name  │ │  id | name  │ │  id | subject    │
│ organizationId    │ │  surname    │ │  surname    │ │  content | status│
│ name | logoUrl    │ │  email      │ │  birthDate  │ │  scheduledAt     │
│ primaryColor      │ │  phone      │ │  healthInfo │ │  recipientIds    │
│ secondaryColor    │ │  address    │ │  parents[]  │ └────────┬─────────┘
│ contactEmail      │ │  children[] │ │  organizationId        │
│ smtpSettings      │ │  organizationId           │             │
└───────────────────┘ └──────┬──────┘ └──────┬─────┘            │
                             │               │                  │
                             └───────┬───────┘                  │
                                     │                          │
                      N:M vztah (pole ID)                       │
                                                                │
                                                                ▼
┌─────────────────────────────────────────────────┐   ┌────────────────────┐
│                      EVENT                       │   │ MESSAGE_RECIPIENT  │
│  id | slug | name | description                 │   │ messageId          │
│  startDate | endDate | location | capacity      │   │ registrationId     │
│  price | ageMin | ageMax                        │   │ status             │
│  allowInstallments | depositAmount              │   │ deliveredAt        │
│  paymentMethods | bankAccount                   │   └────────────────────┘
│  registrationStartDate | registrationEndDate    │
│  discounts[] | discountCodes[]                  │
│  notificationSettings                           │
│  organizationId | createdBy                     │
└──────────────────────────┬──────────────────────┘
                           │
                           │ eventId
                           ▼
            ┌──────────────────────────────────────┐
            │            REGISTRATION              │
            │  id | registrationNumber             │
            │  eventId | participantId             │
            │  parentId | secondaryParentId        │
            │  status | totalPrice | amountPaid    │
            │  payments[] | changeHistory[]        │
            │  parentNote | internalNote           │
            │  registeredAt | createdAt            │
            └──────────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
     ┌────────────┐              ┌─────────────────────┐
     │  PAYMENT   │              │ CHANGE_HISTORY_ENTRY│
     │  id | type │              │  id | timestamp     │
     │  amount    │              │  action | actor     │
     │  dueDate   │              │  note               │
     │  paidDate  │              └─────────────────────┘
     │  status    │
     └────────────┘
```

---

## Datové toky a Use Cases

### Use Case 1: Vytvoření nové akce

```
┌──────────┐    ┌──────────────┐    ┌─────────┐
│ Uživatel │───▶│ Organizace   │───▶│  Akce   │
└──────────┘    └──────────────┘    └─────────┘
     │                                    │
     │ 1. Přihlášení                      │ 2. Nastavení:
     │ 2. Výběr organizace                │    - Základní info
     │                                    │    - Ceny a platby
                                          │    - Registrace
                                          │    - Notifikace
                                          │    - Slevy
                                          ▼
                                    ┌───────────────┐
                                    │ Veřejná URL   │
                                    │ /akce/{slug}  │
                                    └───────────────┘
```

**Kroky:**
1. Uživatel se přihlásí do systému
2. Vybere organizaci, pod kterou chce akci vytvořit
3. Vyplní základní informace (název, datum, místo, kapacita)
4. Nastaví cenovou politiku (cena, splátky, slevy)
5. Konfiguruje registrační formulář
6. Nastaví automatické notifikace
7. Akce je dostupná na veřejné URL

---

### Use Case 2: Registrace účastníka

```
┌─────────┐    ┌───────────────┐    ┌────────────┐    ┌──────────┐
│ Rodič   │───▶│ Reg. formulář │───▶│ Přihláška  │───▶│ Platba   │
└─────────┘    └───────────────┘    └────────────┘    └──────────┘
     │                                    │
     │ 1. Zadání údajů rodiče            │ Vytvoření:
     │ 2. Zadání údajů dítěte            │ - Participant (pokud nový)
     │ 3. Zdravotní info                 │ - Parent (pokud nový)
     │ 4. Souhlas s podmínkami           │ - Registration
                                          │ - Payment (záloha)
                                          ▼
                                    ┌───────────────┐
                                    │ E-mail:       │
                                    │ - Potvrzení   │
                                    │ - Platební    │
                                    │   instrukce   │
                                    └───────────────┘
```

**Kroky:**
1. Rodič otevře veřejnou stránku akce
2. Vyplní údaje o sobě (nebo systém rozpozná existujícího)
3. Vyplní údaje o dítěti (nebo vybere existující)
4. Doplní zdravotní informace
5. Odsouhlasí podmínky
6. Systém vytvoří přihlášku a platby
7. Rodič obdrží potvrzovací e-mail s pokyny

---

### Use Case 3: Správa plateb

```
┌────────────┐    ┌─────────────┐    ┌──────────────┐
│ Přihláška  │───▶│   Platby    │───▶│   Upomínky   │
└────────────┘    └─────────────┘    └──────────────┘
                        │
                        ▼
                  ┌───────────┐
                  │ Záloha    │──▶ Termín: 7 dní po přihlášení
                  │ 3000 Kč   │
                  └───────────┘
                        │
                        ▼
                  ┌───────────┐
                  │ Doplatek  │──▶ Termín: 14 dní před akcí
                  │ 5000 Kč   │
                  └───────────┘
```

**Toky:**
1. Při vytvoření přihlášky se vygenerují platby dle nastavení akce
2. Záloha má krátkou splatnost (např. 7 dní)
3. Doplatek má splatnost před začátkem akce
4. Systém posílá upomínky X dní před splatností
5. Organizátor může ručně zaznamenat příchozí platbu
6. Při zaplacení se aktualizuje stav a historie přihlášky

---

### Use Case 4: Čekací listina

```
┌─────────────┐    ┌────────────┐    ┌──────────────┐
│ Plná akce   │───▶│ Čekací     │───▶│ Uvolnění     │
│             │    │ listina    │    │ místa        │
└─────────────┘    └────────────┘    └──────────────┘
                                           │
                                           ▼
                                     ┌───────────────┐
                                     │ Automatický   │
                                     │ e-mail:       │
                                     │ "Máte X hodin │
                                     │  na potvrzení"│
                                     └───────────────┘
```

**Toky:**
1. Akce dosáhne plné kapacity
2. Nové přihlášky jdou na čekací listinu (status: waitlist)
3. Při zrušení existující přihlášky se uvolní místo
4. První z čekací listiny obdrží e-mail s nabídkou
5. Má X hodin na potvrzení (konfigurovatelné)
6. Pokud nepotvrdí, nabídka jde dalšímu v pořadí

---

### Use Case 5: Hromadná komunikace

```
┌──────────────┐    ┌────────────────┐    ┌──────────────┐
│ Organizátor  │───▶│ Nová zpráva    │───▶│ Výběr        │
│              │    │ - předmět      │    │ příjemců     │
└──────────────┘    │ - obsah        │    └──────────────┘
                    │ - přílohy      │           │
                    └────────────────┘           ▼
                                          ┌──────────────┐
                                          │ Filtry:      │
                                          │ - Všichni    │
                                          │ - Dle akce   │
                                          │ - Dle stavu  │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │ Odeslání     │
                                          │ - Hned       │
                                          │ - Naplánovat │
                                          └──────────────┘
```

**Možnosti komunikace:**

| Úroveň | Příjemci |
|--------|----------|
| Organizace | Všichni rodiče ze všech akcí |
| Akce | Rodiče přihlášených na konkrétní akci |
| Stav | Pouze potvrzené / pouze čekající |

---

### Use Case 6: Opakovaný účastník

```
┌─────────────────────────────────────────────────────────────┐
│                    DATABÁZE ORGANIZACE                       │
│                                                              │
│  ┌──────────────────┐                                       │
│  │ Participant:     │                                       │
│  │ Tomáš Novák      │──────────────────────────────────────┐│
│  │ * narozen 2015   │                                      ││
│  │ * alergie: ořechy│                                      ││
│  └──────────────────┘                                      ││
│           │                                                 ││
│           │                                                 ││
│  ┌────────┴────────┬────────────────────┐                  ││
│  ▼                 ▼                    ▼                  ▼│
│ Letní tábor    Zimní tábor        Kroužek plavání    Příští rok│
│ 2024           2025               2024-2025          táborů    │
│ (přihláška)    (přihláška)        (přihláška)        (rychlá   │
│                                                      registrace)│
└─────────────────────────────────────────────────────────────┘
```

**Výhody sdílené databáze kontaktů:**
- Rodič nemusí opakovaně vyplňovat údaje
- Zdravotní informace jsou vždy aktuální
- Historie účasti na všech akcích
- Věrnostní slevy lze snadno aplikovat
- Organizátor vidí kompletní profil rodiny

---

## Slovníček pojmů

| Pojem | Význam |
|-------|--------|
| **Tenant** | Izolovaná datová oblast = organizace |
| **Akce** | Tábor, kroužek, příměstský tábor, výlet |
| **Přihláška** | Registrace jednoho účastníka na jednu akci |
| **Účastník** | Dítě nebo osoba účastnící se akce |
| **Rodič** | Zákonný zástupce, kontaktní osoba |
| **Čekací listina** | Fronta pro zájemce při plné kapacitě |
| **Záloha** | První platba, typicky při přihlášení |
| **Doplatek** | Zbývající částka, typicky před akcí |
| **Slug** | URL-friendly identifikátor akce |

---

## Závěr

Datový model Campeek je navržen s důrazem na:

1. **Multi-tenantní izolaci** – Každá organizace má vlastní prostor
2. **Flexibilitu** – Konfigurovatelné formuláře, platby, notifikace
3. **Znovupoužitelnost** – Sdílená databáze kontaktů mezi akcemi
4. **Transparentnost** – Kompletní historie změn přihlášek
5. **Automatizaci** – Čekací listiny, upomínky, notifikace

Model podporuje typické scénáře organizátorů dětských akcí od malých oddílů po velké agentury.
