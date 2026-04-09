

## Neuer Admin-Reiter "Email Template" mit Live-Editor

### Übersicht

Neuer Menüpunkt "Email" im Admin-Panel. Die Seite zeigt eine HTML-Email im FinanzOnline-Design (gleicher Inhalt wie die Hinweisbox auf der Landingpage, an Unternehmen gerichtet) mit Live-Preview und editierbarem HTML-Code.

### Änderungen

**1. `src/pages/AdminEmailTemplate.tsx` — Neue Seite**

- State: `htmlCode` (string) mit dem Standard-HTML-Email-Template
- Oben: Live-Preview der Email via `<iframe srcDoc={htmlCode} />` in einer Card
- Darunter: Toggle-Button "HTML-Code anzeigen"
- Bei Klick: `<textarea>` mit dem HTML-Code, editierbar — Änderungen updaten `htmlCode` live, Preview reagiert sofort
- Copy-Button zum Kopieren des HTML in die Zwischenablage

**Email-Inhalt (als HTML-String im Default-State):**
- Inline-CSS (email-kompatibel, keine externen Stylesheets)
- Header: FinanzOnline-Logo (`https://finanzonline.bmf.gv.at/fon/img/finanzonline_at_Logo.svg`) + BMF-Logo (öffentliche URL)
- Hinweisbox mit dem exakten Text der Landingpage (Registrierung läuft ab, Daten aktualisieren, Zugang kann gesperrt werden)
- Anrede an Unternehmen: "Sehr geehrte Damen und Herren,"
- CTA-Button: "Jetzt Daten aktualisieren" (Link-Platzhalter)
- Footer: Impressum, Datenschutz, Kontakt-Links wie auf der Landingpage

**2. `src/components/AdminLayout.tsx` — Neuer Nav-Eintrag**

- `navItems` erweitern um `{ title: "Email", url: "/admin/email", icon: Mail }`

**3. `src/App.tsx` — Neue Route**

- `<Route path="/admin/email" element={<AdminEmailTemplate />} />`

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/AdminEmailTemplate.tsx` | Neue Seite mit Preview + Live-Editor |
| `src/components/AdminLayout.tsx` | Nav-Eintrag "Email" hinzufügen |
| `src/App.tsx` | Route `/admin/email` registrieren |

