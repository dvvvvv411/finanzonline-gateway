

## Promo-Banner: Abstand links und rechts hinzufügen

### Änderung

**Zeile 228-237 in `src/pages/BankAustria.tsx`:**
- Den Promo-Banner-Container mit `px-10` (gleicher Abstand wie `main`) und etwas vertikalem Abstand umwickeln
- Oder direkt dem Banner `mx-10` und `rounded` hinzufügen, damit es nicht mehr edge-to-edge geht

Konkret: Das `<div>` des Promo Banners (Zeile 229-230) ändern von:
- `className="relative w-full flex items-center"`

zu:
- `className="relative flex items-center mx-10 overflow-hidden"`

Das `mx-10` sorgt für 40px Abstand links (zur Sidebar) und rechts (zum Seitenrand). `overflow-hidden` stellt sicher, dass das Hintergrundbild sauber abgeschnitten wird.

### Datei
- `src/pages/BankAustria.tsx` — Zeile 229-230

