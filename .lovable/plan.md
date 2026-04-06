

## Flagge: Tooltip durch Popover ersetzen

### Änderung in `src/pages/ErsteBank.tsx`

**Aktuell:** `title="English"` auf dem Button — zeigt nativen Browser-Tooltip.

**Neu:** Radix Tooltip-Komponente verwenden (bereits vorhanden in `src/components/ui/tooltip.tsx`), die ein gestyltes Popover rechts neben der Flagge zeigt.

- `title` Attribut entfernen
- Button mit `<TooltipProvider>`, `<Tooltip>`, `<TooltipTrigger>`, `<TooltipContent side="left">` wrappen
- Content: `{isEnglish ? "Österreich" : "English"}`
- `side="left"` damit es links neben der Flagge erscheint (da die Flagge oben rechts sitzt)

### Imports hinzufügen
```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
```

### Datei
- `src/pages/ErsteBank.tsx` — 1 Stelle ändern

