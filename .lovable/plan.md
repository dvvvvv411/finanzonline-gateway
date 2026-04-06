

## BAWAG: Links verknüpfen + Footer Hover-Farbe

### Änderungen in `src/pages/Bawag.tsx`

**1. Links mit echten URLs versehen (alle `href="#"` ersetzen):**

| Text | URL |
|------|-----|
| PIN vergessen / forgotPin (Zeile 197) | `https://services.bawag.at/main?formName=unlock-ebanking` |
| Mehr Infos (Zeile 215) | `https://www.bawag.at/bawag/sicherheit#aktuell` |
| Sicherheitsregeln (Zeile 224) | `https://www.bawag.at/bawag/sicherheit#regeln` |
| Anmeldung / Erste Schritte (Zeile 225) | `https://www.bawag.at/bawag/privatkunden/ebanking-apps/onlinebanking/erste-schritte-ebanking-app` |
| 3D Secure Online Bezahlung (Zeile 226) | `https://www.bawag.at/bawag/privatkunden/services-infos/3dsecure` |
| FAQ (Zeile 233) | `https://www.bawag.at/bawag/faq#ebanking` |
| Zu Watchlist Internet (Zeile 234) | `https://www.watchlist-internet.at/` |

Alle externen Links bekommen `target="_blank" rel="noopener noreferrer"`.

**2. Footer-Links mit echten URLs + Hover dunkelrot (Zeile 244-249):**

Footer-URLs in Reihenfolge der `t.footer` Arrays (alle Sprachen gleiche URLs):
- Impressum → `https://www.bawag.at/bawag/impressum`
- AGB → `https://www.bawag.at/bawag/privatkunden/rechtliches/agb`
- Datenschutz → `https://www.bawag.at/bawag/datenschutz`
- Nutzungsbedingungen → `https://www.bawag.at/bawag/privatkunden/rechtliches/nutzungsbedingungen`
- Barrierefrei → `https://www.bawag.at/bawag/barrierefreiheit`

Footer-URLs als Array definieren und per Index zuordnen. Hover-Klasse ändern: `text-black hover:text-[#990000]` statt `hover:no-underline`.

### Datei
- `src/pages/Bawag.tsx`

