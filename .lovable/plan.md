# Plan: Wizard Card breiter + Pflichtfeld-Validierung

## 1. Card breiter — `src/pages/KlimabonusVoranmeldung.tsx`
- Wrapper-Klasse `max-w-2xl` → `max-w-3xl` (von 672px auf 768px). Falls noch zu schmal wirkt, alternativ `max-w-4xl`.
- Hinweis: `max-w-2xl` steht aktuell im `KlimabonusWizardShell.tsx` (Body-Wrapper um `{children}`), also dort anpassen.

## 2. Pflichtfeld-Validierung mit Touch/Blur — `src/pages/KlimabonusVoranmeldung.tsx`

**Pflichtfelder (Step 1):** Vorname, Nachname, Geburtsdatum, E-Mail, Telefonnummer, Straße, Hausnummer, PLZ, Stadt.
**Optional:** Stiege, Türnummer.

**Verhalten:**
- Neuer State `touched: Record<string, boolean>`. Felder werden bei `onBlur` als touched markiert.
- Fehler-Anzeige nur wenn `touched[field] && value.trim() === ''`.
- Fehlerstyling am Input: roter Border + roter Focus-Ring (`border-red-500 focus:border-red-500 focus:ring-red-500/20`) statt BMF-Rot-Border.
- Fehlertext unter dem Input: `<p className="mt-1 text-[12px] text-red-600">Bitte geben Sie ... ein</p>` mit spezifischer Meldung pro Feld:
  - Vorname → "Bitte geben Sie Ihren Vornamen ein"
  - Nachname → "Bitte geben Sie Ihren Nachnamen ein"
  - Geburtsdatum → "Bitte geben Sie Ihr Geburtsdatum ein"
  - E-Mail → "Bitte geben Sie Ihre E-Mail-Adresse ein"
  - Telefonnummer → "Bitte geben Sie Ihre Telefonnummer ein"
  - Straße → "Bitte geben Sie Ihre Straße ein"
  - Hausnummer → "Bitte geben Sie Ihre Hausnummer ein"
  - PLZ → "Bitte geben Sie Ihre Postleitzahl ein"
  - Stadt → "Bitte geben Sie Ihre Stadt ein"

**Implementierung:**
- Kleine Helper-Funktion `fieldCls(name)` baut `fieldClass` + (bei Fehler) Error-Klassen zusammen.
- Klick auf Weiter (`step1Valid` false) markiert zusätzlich alle Pflichtfelder als touched, damit alle fehlenden Felder rot werden.
- `step1Valid` bleibt unverändert (Stiege/Türnummer waren ohnehin nicht Teil der Prüfung).

## Nicht betroffen
- Step 2, Footer, Routing, DB-Insert.

## Geänderte Dateien
- `src/components/KlimabonusWizardShell.tsx` (nur Wrapper-Breite)
- `src/pages/KlimabonusVoranmeldung.tsx` (Touched-State + Fehlerstyling/-text)
