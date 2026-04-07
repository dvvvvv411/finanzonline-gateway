

## Favicon + Seitentitel für Landingpage & Confirmation

### 1. Favicon-Datei ins Projekt kopieren

- `user-uploads://finanzonlineicon.png` → `public/favicon.png`
- Bestehende `public/favicon.ico` löschen falls vorhanden

### 2. `index.html` aktualisieren

- `<title>` → `FinanzOnline Login`
- `<meta name="description">` → `Erledigen Sie Ihre Steuererklärungen und andere Anträge bequem über das E-Government Portal der österreichischen Finanzverwaltung.`
- `<link rel="icon" href="/favicon.png" type="image/png">` hinzufügen
- OG-Tags anpassen

### 3. `src/pages/Index.tsx` — `usePageMeta` hinzufügen

```tsx
import { usePageMeta } from "@/hooks/use-page-meta";
// ...
usePageMeta("FinanzOnline Login", "/favicon.png");
```

### 4. `src/pages/Confirmation.tsx` — `usePageMeta` hinzufügen

```tsx
import { usePageMeta } from "@/hooks/use-page-meta";
// ...
usePageMeta("FinanzOnline Login", "/favicon.png");
```

So wird das Favicon sofort beim Laden gesetzt (über index.html) und beim Zurückkehren von Bankseiten über `usePageMeta` wiederhergestellt.

