

## Auth-Seite + Admin Panel + Supabase Auth

### Übersicht
- `/auth` — Login/Register im FinanzOnline-Stil (Box "Anmeldung mit Benutzername")
- `/admin` — geschütztes Admin-Panel (nur eingeloggte Admins)
- Supabase Auth mit Email/Passwort
- `user_roles` Tabelle für Admin-Rolle
- Redirect nach Login/Register → `/admin`

### 1. Datenbank-Migration
- `app_role` Enum mit Wert `admin`
- `user_roles` Tabelle (user_id, role) mit RLS
- `has_role()` Security-Definer-Funktion
- Trigger: neuer User bekommt automatisch `admin`-Rolle
- RLS-Policy: User kann eigene Rolle lesen

### 2. `/auth` Seite (`src/pages/Auth.tsx`)
Design wie die mittlere Box "Anmeldung mit Benutzername" auf finanzonline.bmf.gv.at:
- Gleicher Header (FinanzOnline + BMF Logo) oben
- Darunter eine Card/Box mit Rahmen
- Titel: "Anmeldung" (Login-Tab) / "Registrierung" (Register-Tab)
- Tabs oder Toggle zwischen Login und Register
- Felder: E-Mail, Passwort (bei Register zusätzlich Passwort bestätigen)
- Button "Anmelden" / "Registrieren" im gleichen Stil wie Original
- Hellgrauer Hintergrund, schwarzer Rahmen, schlicht

### 3. `/admin` Seite (`src/pages/Admin.tsx`)
- Gleicher Header
- Geschützt: wenn nicht eingeloggt → Redirect zu `/auth`
- Einfaches Admin-Dashboard mit Begrüßung
- Logout-Button

### 4. Routing (`src/App.tsx`)
- `/auth` → Auth-Seite
- `/admin` → Admin-Panel (geschützt)
- `/` → Landing Page (bleibt)

### 5. Auth-Logik
- Supabase `signUp` und `signInWithPassword`
- `onAuthStateChange` Listener
- Protected Route Komponente für `/admin`

### Dateien
- **Neu:** `src/pages/Auth.tsx`, `src/pages/Admin.tsx`
- **Bearbeitet:** `src/App.tsx` (neue Routes)
- **Migration:** SQL für `user_roles`, Enum, Trigger, RLS

