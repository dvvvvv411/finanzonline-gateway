

## External-Link-Icon bei Footer-Links hinzufügen

### Änderung in `src/pages/Raiffeisenbank.tsx`

Bei den drei Links (Impressum, Nutzungsbedingungen, Barrierefreiheitserklärung) ein `ExternalLink`-Icon von `lucide-react` dahinter setzen. Das `© 2026 Raiffeisen` bekommt kein Icon.

```tsx
import { ExternalLink } from "lucide-react";

// Jeder Link bekommt:
<a ...className="hover:underline inline-flex items-center gap-1">
  Impressum <ExternalLink className="h-3 w-3" />
</a>
```

### Datei
- `src/pages/Raiffeisenbank.tsx` — Import + 3 Links anpassen (Zeilen 1, 161-163)

