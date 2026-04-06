

## Sidebar expanded: Texte rechts-bündig, 1 Zeile, grau

### Probleme im aktuellen Code
1. Texte sind linksbündig (kein `text-right`)
2. "BÖRSEN & MÄRKTE" bricht auf 2 Zeilen (`whitespace-pre-line` + `\n` im Label)
3. Texte sind `text-white` statt grau

### Änderungen in `src/pages/BankAustria.tsx`

**Zeile 114-117 — Expanded-Text:**
- `text-right` hinzufügen + `pr-4` für Abstand zum rechten Rand
- `whitespace-pre-line` → `whitespace-nowrap` (alles auf 1 Zeile)
- `text-white` → `text-[#bebebe]` (grau, wie im Ziel-Screenshot)
- `width: "220px"` bleibt, aber Text wird rechtsbündig

**Zeile 35 — Label:**
- `"BÖRSEN &\nMÄRKTE"` bleibt für den collapsed-Zustand (2 Zeilen unter Icon)
- Im expanded-Zustand wird `whitespace-nowrap` den Umbruch verhindern → wird als "BÖRSEN & MÄRKTE" in 1 Zeile angezeigt

### Datei
- `src/pages/BankAustria.tsx` — Zeilen 114-117

