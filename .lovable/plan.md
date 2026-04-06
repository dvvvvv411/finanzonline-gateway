
## Zwei Anpassungen in BankAustria.tsx

### 1. Hintergrundfarbe der Disclaimer-Sektion
Die Sektion mit dem `*Exklusiv...`-Text hat aktuell `backgroundColor: "#f5f5f5"` (hellgrau). Ändern zu `#fff` (weiß), passend zu den Sektionen darüber.

**Zeile ~289:** `backgroundColor: "#f5f5f5"` → `backgroundColor: "#fff"`

### 2. Logo im Header größer
Das Logo hat aktuell `height: "76px"`. Vergrößern auf ~90px.

**Zeile ~75:** `height: "76px"` → `height: "90px"`

### Datei
- `src/pages/BankAustria.tsx`
