

## Dolomitenbank — Links, Übersetzungen & "Hier" hervorheben

### Datei: `src/pages/Dolomitenbank.tsx`

1. **"Hier" im Info-Text als Link** (Z.129-133):
   - Deutsch: Text aufsplitten — "...Verfügernummer? - " dann `<a>Hier</a>` in `#637781` mit `hover:underline`, Link zu `https://www.dolomitenbank.at/m010/dolomitenbank/de/produkt/umstellung_dolomitenbanking.jsp`, dann " erfahren Sie..."
   - Englisch: "Here" als Link zum selben Ziel

2. **Englische Übersetzungen anpassen** (Z.38, 46-47, 130-132):
   - Login-Header: `"Login DolomitenBanking"` → `"Login"` (nur EN)
   - Info-Text EN: `"You can register for your new online banking service here. When you log in, a secure connection is established. Please make sure that you do not enter your access details on any other site and keep them secret. We will never ask you for your PIN or a TAN."`
   - Help-Text EN: `"Doesnt getting started work? Do you still have a authorised party number ? - Here you can find out how to get your new username / password. It is no longer possible to start with your previous authorised party number!"`

3. **Link-Redirects aktualisieren** (Z.151-176):
   - Benutzername vergessen: `m=45` → `m=10`
   - Passwort vergessen: `m=45` → `m=10`
   - Mehr über das DolomitenBanking: `href="#"` → `href="https://www.dolomitenbank.at/private/dolomitenbanking-internetbanking/internetbanking-dolomitenbanking"`

4. **"Mehr über das DolomitenBanking" im Englischen ausblenden** (Z.170-176):
   - Nur rendern wenn `lang === "de"`

