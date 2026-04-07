

## Easybank — Englische Übersetzung korrigieren

### Änderungen in `src/pages/Easybank.tsx`

**1. EN Translations aktualisieren (Zeilen 62-88)**

| Key | Aktuell | Neu |
|-----|---------|-----|
| `loginTitle` | "Login with access data" | "Login with credentials" |
| `loginHilfe` | "Help" | "Help" (bleibt) |
| `unlockLink` | "Unlock eBanking access" | "Reset eBanking access" |
| `hilfePin` | "Forgot PIN or disposer locked?" | "Forgot PIN or disposer locked?" (bleibt) |
| `hilfeFaq` | "FAQ" | Ersetzen durch mehrzeiligen Hotline-Text (siehe unten) |
| `infoDebit` | "Order PIN code for debit card" | "Order PIN-Code for debit cards" |
| `infoApp` | "All info about the\neasybank App" | "All information about the\neasybank app" |
| `footer` | `["Imprint", "Terms and Conditions", "Data Protection", "Terms of Use", "Barrier Free"]` | `["Imprint", "Terms and Conditions", "Data Protection", "Terms of Use", "Barrier-Free"]` |

**2. Hilfe/Hotline Card — FAQ durch Hotline-Nummer ersetzen (EN)**

Neues Translation-Feld `hilfeHotline` hinzufügen für die EN-Version. Der zweite Eintrag in der Hilfe-Card zeigt bei EN statt "FAQ" den Hotline-Block:

```
05 70 05-500
Mo-Fr 07:00am-10:00pm
Sa 08:00am-01:00pm
```

- Neues Feld im Type: `hilfeHotline: string`
- DE: `hilfeHotline: ""` (leer, wird nicht gezeigt — FAQ bleibt)
- EN: `hilfeHotline: "05 70 05-500"` + zusätzliche Felder für Zeiten
- Im JSX: Sprachweiche — bei DE den FAQ-Link zeigen, bei EN den Hotline-Block (kein Link, nur Text)

Alternativ einfacher: `hilfeFaq` bei EN auf den mehrzeiligen Hotline-Text setzen und den Link entfernen wenn EN aktiv.

**3. Warnung Card — NICHT übersetzen**

Die Warnung-Card hat bereits eine `lang === "DE"` Weiche (Zeilen 297-316). Bei EN wird aktuell der übersetzte Text gezeigt. Fix: Bei EN den gleichen deutschen Hardcoded-Text zeigen wie bei DE. Die gesamte Warnung bleibt immer deutsch.

- Zeilen 297-319: Die `lang === "DE"` Bedingung entfernen oder den else-Branch auch auf den deutschen Text setzen. Warnung bleibt immer deutsch inkl. "Weiterlesen".

**4. Wochentage**
Bereits korrekt übersetzt in EN translations (Zeile 63).

### Zusammenfassung
- Translation-Objekt EN anpassen
- Hilfe-Card: Sprachweiche für FAQ (DE) vs Hotline-Nummer (EN)
- Warnung-Card: Immer deutsch, egal welche Sprache
- Keine Layout-Änderungen

### Datei
- `src/pages/Easybank.tsx`

