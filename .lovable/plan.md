

## Oberbank — Links, Redirects, Carousel-Links, "Wichtige Meldungen" entfernen

### Datei: `src/pages/Oberbank.tsx`

#### 1. Cookie-Banner: "hier" Text anpassen (Zeile 89)
- Underline entfernen, stattdessen **bold** (`fontWeight: 700`)
- `<span>` wird zu `<a>` mit `href="https://www.oberbank.at/cookies-kundenportal"`, `target="_blank"`, `textDecoration: "none"`, `fontWeight: 700`

#### 2. Links-Array mit URLs versehen (Zeilen 10-18)
Links-Array von `string[]` zu `{ label: string, href: string }[]` umbauen:
- Funktionsübersicht / Video → `https://www.oberbank.at/kundenportal`
- FAQs → `https://www.oberbank.at/kundenportal-faqs`
- Wertpapier-Infos → `https://www.oberbank.at/wertpapier-infos`
- Sicherheit → `https://www.oberbank.at/kundenportal-sicherheit`
- Security-App → `https://www.oberbank.at/security-app`
- Servicenummern → `https://www.oberbank.at/kontakt`
- Support-Tool (Fernwartung) → `https://www.oberbank.at/fastviewer-support`

Alle Links mit `target="_blank"`. Rendering anpassen (Zeilen 389-411): `link` → `link.label`, `href="#"` → `href={link.href}`.

#### 3. Erstanmeldung: kein Redirect (Zeile 356)
`href="#"` ändern zu kein Link — entweder `href="javascript:void(0)"` oder `onClick={(e) => e.preventDefault()}` damit nichts passiert.

#### 4. Carousel-Slides mit URLs versehen (Zeile 8)
`slides`-Array von `string[]` zu `{ src: string, href: string }[]` umbauen mit den 3 URLs. Jedes `<img>` in ein `<a>` wrappen mit `target="_blank"`. Rendering (Zeilen 439-453) anpassen.

#### 5. Footer-Links mit URLs (Zeilen 578-589)
Array von `string[]` zu `{ label: string, href: string }[]`:
- Impressum → `https://www.oberbank.at/impressum`
- AGB → `https://www.oberbank.at/agb`
- Filialfinder → `https://www.oberbank.at/filialfinder`
- Fernwartung → `https://www.oberbank.at/fastviewer-support`

Alle `target="_blank"`.

#### 6. "Wichtige Meldungen" komplett entfernen (Zeilen 518-562)
Gesamten Block löschen inkl. `meldungenOpen` State (Zeile 29).

