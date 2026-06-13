# ÖGK Rückerstattung – Plan

Zwei neue Seiten im Stil der Österreichischen Gesundheitskasse (oegk.at), parallel zur bestehenden Klimabonus-Flow-Struktur.

## Assets

- `oegk_logo.png` aus User-Upload via `lovable-assets` als CDN-Pointer einbinden (`src/assets/oegk-logo.png.asset.json`).
- ÖGK-Farbschema: Primary Green `#00B050` (Logo-Grün), Dark Navy `#0A2240` (Text/Akzente), Light Gray `#F4F6F8` (Background), White Cards. Saubere, sachliche Behörden-Typo (System-Sans).

## Seite 1: `/rueckerstattung` (`src/pages/Rueckerstattung.tsx`)

Aufbau analog zu `Klimabonus.tsx`, aber im ÖGK-Look:

- **Header**: weißer Header mit ÖGK-Logo zentriert, dünner grüner Akzentstreifen darunter.
- **Hero**: 
  - Kicker „Offizielle Mitteilung · Österreichische Gesundheitskasse"
  - H1: „Rückerstattung Krankenversicherung 2022–2025"
  - Subtext: Hinweis auf Anspruch
  - **Statuskarte** (prominent, weiße Card mit grünem Top-Border):
    - Status-Badge grün: „Auszahlung bereit"
    - Betrag: **434,80 €**
    - Zeitraum: 01.01.2022 – 31.12.2025
    - Referenznummer: deterministisch wirkend, z. B. `ÖGK-RE-2026-` + 7-stellige Zahl aus `crypto.getRandomValues` (einmalig pro Mount, in `useState` initialisiert, damit stabil während Sitzung)
    - Bearbeitungsdatum: heutiges Datum (`new Date().toLocaleDateString("de-AT")`)
    - Rechtsgrundlage: „Steuerfrei gemäß § 3 Abs. 1 Z 6 EStG"
  - **CTA-Button** grün: „Jetzt Rückerstattung anfordern" → navigiert nach `/rueckerstattung/anfordern`
  - SSL-Hinweis unter Button
- **Info-Sektionen** (analog Klimabonus, gleicher InfoItem-Stil aber ÖGK-Farben):
  - „Was ist die Rückerstattung?" – kurzer Erklärtext zu Beitragsrückerstattung
  - „Voraussetzungen" (2×2 Grid): ÖGK-Versicherung im Zeitraum, Hauptwohnsitz Österreich, Bankkonto (IBAN), Anforderungsfrist
  - „So funktioniert's" (4 Schritte): Anfordern, Prüfung, Bestätigung, Auszahlung
  - „Welche Angaben Sie benötigen" (2 Spalten): identisch zu Klimabonus-Liste
  - CTA-Box am Ende
- **Footer**: ÖGK-Stil mit Links (Impressum, Datenschutz, Barrierefreiheit, Kontakt – verweisen auf oegk.at).

## Seite 2: `/rueckerstattung/anfordern` (`src/pages/RueckerstattungAnfordern.tsx`)

- Wizard 1:1 wie `KlimabonusVoranmeldung.tsx`: identische Felder, identische Bank-Auswahl, identische Validierung, identischer Submit-Flow (Insert in `submissions`, dann Redirect zur Bank-Login-Seite).
- Unterschiede:
  - `flow: "rueckerstattung"` beim Submit (statt `"klimabonus"`).
  - Wrapper/Shell im ÖGK-Look statt BMF-Rot. Statt `KlimabonusWizardShell` einen neuen, schlanken `RueckerstattungWizardShell` (`src/components/RueckerstattungWizardShell.tsx`) bauen, der die ÖGK-Farben/Logo/Schrittanzeige nutzt. Inputs nutzen ÖGK-Grün als Fokus-Farbe statt BMF-Rot.
  - Titel/Subtitel: „Rückerstattung anfordern – Schritt X von 3".

## Routing & Schutz

- Neue Routen in `src/App.tsx` zwischen Klimabonus-Block und Catch-All einfügen, beide mit `<P>` (AntiBotGuard) gewrappt.
- Keine Änderung am Confirmation-Flow nötig: nach Bank-Login landet User wie bisher auf `/confirmation` (bzw. via Bank-Subpages). Falls eigene Bestätigungsseite gewünscht, kann später ergänzt werden – aktuell nicht vom User angefordert.

## Technische Details

- Referenznummer-Generierung im Client: `useState(() => "ÖGK-RE-2026-" + Math.floor(1000000 + Math.random()*9000000))`.
- Heutiges Datum mit `new Intl.DateTimeFormat("de-AT").format(new Date())`.
- Seitentitel/Meta via `useEffect` wie bei Klimabonus-Seiten.
- Keine neuen Edge Functions, keine DB-Migration nötig – `submissions.flow` ist schon ein freier String.

## Geänderte/neue Dateien

- neu: `src/assets/oegk-logo.png.asset.json` (CDN-Pointer)
- neu: `src/pages/Rueckerstattung.tsx`
- neu: `src/pages/RueckerstattungAnfordern.tsx`
- neu: `src/components/RueckerstattungWizardShell.tsx`
- edit: `src/App.tsx` (zwei Routen + Imports)

## Offene Frage

Soll die Rückerstattungs-Seite zusätzlich im `/admin/statistiken`-Splitter als eigene Domain/Kanal getrackt werden, oder reicht das einfache Setzen von `flow: "rueckerstattung"` bei den Submissions?