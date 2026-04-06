

## BankAustria Header: Icons + Styling für Nav-Items

### Änderungen

**1. Icons kopieren**
- `user-uploads://privatkunden.png` → `src/assets/icon-privatkunden.png`
- `user-uploads://firmenkunden.png` → `src/assets/icon-firmenkunden.png`
- `user-uploads://privatebanking.png` → `src/assets/icon-privatebanking.png`
- `user-uploads://ueberuns.png` → `src/assets/icon-ueberuns.png`

**2. Header Nav-Items umbauen** (`src/pages/BankAustria.tsx`, Zeilen 60-73)
- Statt einfacher Text-Links: Icon (als `<img>`) über dem Text
- Text: uppercase, weiß, bold
- Layout pro Item: `flex flex-col items-center` (Icon oben, Text unten)
- Header-Höhe ggf. leicht erhöhen damit Icons + Text reinpassen

### Datei
- `src/pages/BankAustria.tsx` — Nav-Bereich im Header umbauen

