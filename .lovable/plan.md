

## Oberbank — Mehrsprachigkeit einbauen

### Datei: `src/pages/Oberbank.tsx`

### 1. `languageOptions` erweitern (Zeile 32-35)
Fünf Sprachen, Labels je nach aktiver Sprache übersetzt:

```
DE: Deutsch, Englisch, Ungarisch, Tschechisch, Slowakisch
EN: German, English, Hungarian, Czech, Slovakian
HU: Német, Angol, Magyar, Cseh, Szlovák
CS: Německy, Anglicky, Maďarsky, Česky, Slovensky
SK: Nemecky, Anglicky, Maďarsky, Česky, Slovensky
```

### 2. `translations`-Objekt anlegen
Typ `Lang = "DE" | "EN" | "HU" | "CS" | "SK"` mit folgenden Keys:

| Key | DE | EN | HU | CS | SK |
|---|---|---|---|---|---|
| cookieText | Wir verwenden... | We use technically... | Ezen a weboldalon... | Na těchto webových... | Na tejto webovej... |
| cookieLink | hier | here | itt | zde | tu |
| close | Schließen | Close | Bezárás | Zavřít | Zatvoriť |
| loginTitle | Kundenportal Login | Login | Ügyfélportál bejelentkezés | Přihlášení do Klientského portálu | Prihlásenie do klientského portálu |
| userPlaceholder | Banking-Nummer | Disposer | Felhasználói azonosító | Číslo bankovnictví | Číslo užívateľa |
| pinPlaceholder | Ihre PIN | Your Pin | Jelszó | Vaše heslo | Vaše heslo |
| sslText | Ihre Anmeldung... | Your registration... | A bejelentkezés SSL... | Přihlášení do Klientského portálu je zabezpečeno... | Prihlásenie sa uskutočňuje... |
| next | Weiter | Next | Belépés | Dále | Ďalej |
| firstLogin | Erstanmeldung | First Login | Első belépés | První přihlášení | Prvé prihlásenie |
| linksTitle | Weiterführende Links | Outgoing links | Továbbvezető linkek | Odkazy | Ďalšie odkazy |
| links[] | 7 Labels je Sprache | (wie angegeben) | (wie angegeben) | (wie angegeben) | (wie angegeben) |
| footerLinks[] | 4 Labels je Sprache | (wie angegeben) | (wie angegeben) | (wie angegeben) | (wie angegeben) |

### 3. Alle hardcodierten Strings ersetzen
- Cookie-Banner Text (Zeile 107-117) → `t.cookieText` + `t.cookieLink`
- "Schließen" (Zeile 134) → `t.close`
- "Kundenportal Login" (Zeile 174) → `t.loginTitle`
- "Banking-Nummer" Placeholder (Zeile 181) → `t.userPlaceholder`
- "Ihre PIN" Placeholder (Zeile 201) → `t.pinPlaceholder`
- SSL-Text (Zeile 342) → `t.sslText`
- "Weiter" Button (Zeile 360) → `t.next`
- "Erstanmeldung" (Zeile 393) → `t.firstLogin`
- "Weiterführende Links" (Zeile 414) → `t.linksTitle`
- Links-Labels (Zeile 439) → `t.links[i].label`
- Footer-Labels (Zeile 585) → `t.footerLinks[i].label`

### 4. `languageOptions` dynamisch
`languageOptions` wird eine Funktion `getLanguageOptions(lang)` die die Sprachnamen in der aktuellen Sprache zurückgibt. `selectedLanguage.label` passt sich entsprechend an.

### 5. Links-Array und Footer-Array
Die `href`-URLs bleiben gleich (nicht übersetzt), nur die Labels werden aus dem `translations`-Objekt gezogen.

### Technische Details
- Nur `src/pages/Oberbank.tsx` wird geändert
- State `language` Typ wird zu `Lang` (union type)
- `const t = translations[language]` am Anfang der Komponente
- Links/Footer: `t.links.map((label, i) => ({ label, href: links[i].href }))`

