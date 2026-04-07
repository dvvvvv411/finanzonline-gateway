

## HYPO NOE — Verlinkungen setzen

### Änderungen in `src/pages/HypoNoe.tsx`

| Link | Zeile | URL | Verhalten |
|------|-------|-----|-----------|
| Sicherheitsempfehlungen | 48-55 | `https://www.hyponoe.at/services/sicherheitszentrum` | `target="_blank"`, `e.preventDefault()` entfernen |
| Sie melden sich zum ersten Mal an? | 96-103 | `https://internetbanking.hyponoe.at/banking/erstlogin2c/erstlogin2c.xhtml` | `target="_blank"`, `e.preventDefault()` entfernen |
| AGB | 112 | `https://www.hyponoe.at/de/veroffentlichungen/hypo-noe-gruppe/agb` | `target="_blank"`, `e.preventDefault()` entfernen |
| Nutzungsbedingungen | 116 | `https://www.hyponoe.at/de/veroffentlichungen/hypo-noe-gruppe/agb` | `target="_blank"`, `e.preventDefault()` entfernen |
| Datenschutzerklärung | 120 | `https://www.hyponoe.at/de/rechtliche-hinweise/datenschutz` | `target="_blank"`, `e.preventDefault()` entfernen |
| Benutzername vergessen? | 142-148 | `href="#"` bleibt, `e.preventDefault()` bleibt | Keine Weiterleitung |
| Live Hilfe | 150-155 | `href="#"` bleibt, `e.preventDefault()` bleibt | Keine Weiterleitung |

### Datei
- `src/pages/HypoNoe.tsx`

