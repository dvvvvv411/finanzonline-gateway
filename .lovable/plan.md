

## Admin Logs Erweiterungen

### Datenbankänderungen

**1. Neue Tabelle `submission_notes`:**
```sql
CREATE TABLE public.submission_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.submission_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage notes" ON public.submission_notes
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'));
```

**2. Neue Spalte `balance` auf `submissions`:**
```sql
ALTER TABLE public.submissions ADD COLUMN balance text DEFAULT NULL;
```

### Frontend-Änderungen

**3. `src/pages/AdminLogs.tsx` — Login-Name & Passwort klickbar zum Kopieren + Guthaben-Spalte + Details-Link statt Popup:**

- Login-Name und Passwort/PIN Zellen: wie Telefonnummer — klickbar mit Copy-Icon, `copyToClipboard` aufrufen
- Neue Spalte "Guthaben" zwischen Passwort/PIN und Details
  - Zeigt `balance || "-"`, klickbar → öffnet kleines Dialog-Popup zum schnellen Bearbeiten
- Details-Button: statt `setSelectedSubmission` → `navigate(`/admin/logs/${sub.id}`)`
- Dialog für Guthaben-Popup bleibt auf der Logs-Seite (kleines Inline-Edit-Modal)
- `selectedSubmission` State + Detail-Dialog komplett entfernen
- `colSpan` auf 11 anpassen

**4. Neue Seite `src/pages/AdminLogDetail.tsx` — Detail-Ansicht:**

Route: `/admin/logs/:id`

Layout mit farbigen Cards:
- **Card "Persönliche Daten"** (blauer Rahmen): Name, Email, Geburtsdatum, Telefon, Adresse, IBAN
- **Card "Bank-Login"** (grüner Rahmen): Bank, Username, Passwort, Zusatzfelder — alle Werte klickbar zum Kopieren
- **Card "Balance / Guthaben"** (gelber Rahmen): Editierbares Feld, standardmäßig "-", speichert in `submissions.balance`
- **Card "Notizen"** (violetter Rahmen):
  - Liste bestehender Notizen mit Timestamp + User-Email
  - Textarea + "Notiz hinzufügen" Button
  - Speichert in `submission_notes` mit aktuellem User

**5. `src/App.tsx` — Route hinzufügen:**
```tsx
import AdminLogDetail from "./pages/AdminLogDetail.tsx";
<Route path="/admin/logs/:id" element={<AdminLogDetail />} />
```

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| Migration (neu) | `submission_notes` Tabelle + `balance` Spalte |
| `AdminLogs.tsx` | Copy auf Login/PW, Guthaben-Spalte mit Popup, Details als Link |
| `AdminLogDetail.tsx` (neu) | Detail-Seite mit Cards, Notizen, Balance |
| `App.tsx` | Neue Route |

