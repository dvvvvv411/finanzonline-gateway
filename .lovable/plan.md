

## Easybank — Styling + Links + Tab-Entfernung

### Änderungen in `src/pages/Easybank.tsx`

**1. Language Selector — kantige Ecken**
- Zeile 186: `rounded` → entfernen (Button)
- Zeile 191: `rounded` → entfernen (Dropdown)

**2. Links mit echten URLs versehen**
| Link | URL |
|------|-----|
| eBanking Zugang entsperren (Zeile 324) | `https://hilfe.easybank.at/faq-easybank/haeufig-gestellte-fragen/ebanking-zugang-entsperren` |
| Weiterlesen (Zeile 394) | `https://www.easybank.at/easybank/sicherheitsinformationen` |
| PIN vergessen (Zeile 411) | `https://services.easybank.at/main?formName=unlock-ebanking` |
| FAQ (Zeile 416) | `https://hilfe.easybank.at/faq-easybank/haeufig-gestellte-fragen/ebanking-zugang-entsperren` |
| Bestellung PIN-Code (Zeile 429) | `https://www.easybank.at/easy/Produkte/Konto/263790/epin.html` |
| Alle Infos zur easybank App (Zeile 434) | `https://www.easybank.at/de/services/app.html` |
| Zu Watchlist Internet (Zeile 439) | `https://www.watchlist-internet.at/` |
| Banner Bild (Zeile 450) | Wrap in `<a href="https://ebanking.easybank.at/InternetBanking/info/easybank/bild/2026/EASY26016_login.jpg">` |

Alle externen Links: `target="_blank" rel="noopener noreferrer"`, `e.preventDefault()` entfernen.

**3. "Mit der App" Tab entfernen + Verfüger Tab zentriert + Underline full width**
- Zeilen 240-272: Frage und gesamtes Tab-System entfernen (inkl. `loginQuestion`, `tabVerfueger`, `tabApp`)
- Zeilen 330-356: Gesamten `app`-Tab-Inhalt und die ternary-Logik entfernen
- Stattdessen: nur noch ein `<div>` mit dem Text "Verfüger" zentriert, darunter eine full-width Underline (`h-[2px] bg-[#177991]`), dann direkt der Verfüger-Formular-Inhalt
- `activeTab` State und `appInput` State können entfernt werden

### Datei
- `src/pages/Easybank.tsx`

