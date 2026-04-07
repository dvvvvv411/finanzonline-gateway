

## HYPO NOE — Abstand zwischen Labels und Inputs reduzieren

### Änderungen in `src/pages/HypoNoe.tsx`

Die Label-Divs ("Benutzername" und "Passwort") und die darunterliegenden Input-Divs sind aktuell durch `space-y-4` (16px) im Card-Body getrennt.

**Fix**: Die Labels und Inputs jeweils direkt zusammenrücken, indem nach den Label-Zeilen ein kleinerer Abstand gesetzt wird. Konkret: `space-y-4` bleibt global, aber die Label-Divs bekommen `mb-[-8px]` oder alternativ wird `space-y-4` auf `space-y-3` reduziert und die Labels bekommen eine Klasse wie `mt-1 mb-[-4px]` bzw. einfacher: die `space-y-4` Klasse im Card-Body durch individuelle Margins ersetzen.

**Einfachster Ansatz**: Auf den Label-Zeilen (Zeilen ~65 und ~92) jeweils `className="flex items-center -mb-2"` setzen, damit der Abstand zum darunter liegenden Input auf ~8px reduziert wird.

| Nr | Was | Aktuell | Neu |
|----|-----|---------|-----|
| 1 | Benutzername Label | `className="flex items-center"` | `className="flex items-center -mb-2"` |
| 2 | Passwort Label | `className="flex items-center"` | `className="flex items-center -mb-2"` |

### Datei
- `src/pages/HypoNoe.tsx`

