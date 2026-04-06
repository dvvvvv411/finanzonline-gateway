

## Fix: Auth-Seite Farben anpassen

Das Problem: Der Button ist rot (`bg-[#E6320F]`), die Tab-Border ist rot — aber im Original ist alles schlicht schwarz/weiß/grau.

### Änderungen an `src/pages/Auth.tsx`

1. **"Anmelden"/"Registrieren" Button** — Statt roter gefüllter Button → weißer Button mit schwarzem/grauem Rahmen (outline-Stil wie im Screenshot: `border border-[#ccc] bg-white text-black hover:bg-[#f5f5f5]`)
2. **Tab-Unterstrich** — Von rot `border-[#E6320F]` zu schwarz/dunkelgrau `border-black` oder ganz entfernen und nur mit Hintergrundfarbe unterscheiden
3. **Allgemein** — Alles in Schwarz/Weiß/Grau halten, kein Rot auf der Auth-Seite

