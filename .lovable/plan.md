

## Admin Panel Redesign — Moderne Sidebar + Dark Theme

### Konzept

Alle Admin-Seiten (`/admin`, `/admin/logs`, `/admin/logs/:id`) bekommen ein einheitliches Layout mit einer festen Sidebar-Navigation und einem dunklen, professionellen Design. Die bestehenden Funktionen bleiben 1:1 erhalten — nur das Aussehen wird modernisiert.

### Architektur

```text
┌──────────────┬────────────────────────────────────┐
│  Sidebar     │  Main Content                      │
│              │                                    │
│  Dashboard   │  (je nach Route)                   │
│  Logs        │                                    │
│              │                                    │
│              │                                    │
│  ──────────  │                                    │
│  User-Email  │                                    │
│  Logout      │                                    │
└──────────────┴────────────────────────────────────┘
```

### Dateien

**1. Neues Layout `src/components/AdminLayout.tsx`**

Wrapper-Komponente die auf allen Admin-Seiten verwendet wird:
- `SidebarProvider` + `Sidebar` (collapsible="icon")
- Sidebar-Inhalt:
  - Logo/App-Name oben ("Admin Panel")
  - Navigation: `LayoutDashboard` → Dashboard (`/admin`), `List` → Logs (`/admin/logs`)
  - Active-State via `useLocation`
  - Footer: User-Email + Logout-Button
- Main-Bereich: `SidebarTrigger` in Header + `{children}`
- Dunkelgrauer Sidebar-Hintergrund (`bg-slate-900 text-white`), Main-Bereich `bg-slate-50`
- Auth-Check + Redirect eingebaut, User-State über Context/Props

**2. `src/pages/Admin.tsx` — Dashboard**

- `<AdminLayout>` als Wrapper, `<Header>` entfernen
- Dashboard-Content: Willkommensnachricht, Stats-Cards (Gesamtanzahl Logs, Status-Verteilung als Übersicht-Karten), Quick-Links
- Cards mit `bg-white rounded-xl shadow-sm border`
- Daten: Simple Query `supabase.from("submissions").select("id, status")`

**3. `src/pages/AdminLogs.tsx` — Logs-Tabelle**

- `<AdminLayout>` als Wrapper, `<Header>` und eigenen Logout/Auth-Code entfernen
- Filter-Bar und Tabelle bleiben funktional identisch
- Styling: Tabelle in `rounded-xl` Card, saubere Abstände, dezentere Farben
- Status-Filter als Pill-Buttons mit aktiver Hervorhebung
- Auth-Logik raus (kommt von AdminLayout)

**4. `src/pages/AdminLogDetail.tsx` — Detail-Seite**

- `<AdminLayout>` als Wrapper, `<Header>` entfernen
- Cards behalten farbige Rahmen, aber mit `rounded-xl shadow-sm` modernisiert
- Auth-Logik raus (kommt von AdminLayout)

### Design-Tokens

- Sidebar: `bg-slate-900`, aktives Item `bg-slate-800 text-white`, inaktiv `text-slate-400 hover:text-white hover:bg-slate-800`
- Main: `bg-slate-50`
- Cards: `bg-white rounded-xl shadow-sm border border-slate-200`
- Buttons: bestehende Shadcn-Varianten
- Text: `text-slate-900` Überschriften, `text-slate-600` Beschreibungen

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/components/AdminLayout.tsx` (neu) | Sidebar + Auth + Layout |
| `src/pages/Admin.tsx` | Dashboard mit Stats, AdminLayout |
| `src/pages/AdminLogs.tsx` | AdminLayout Wrapper, Header/Auth raus, Styling |
| `src/pages/AdminLogDetail.tsx` | AdminLayout Wrapper, Header/Auth raus, Styling |

