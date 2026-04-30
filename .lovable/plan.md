## Änderungen in `src/pages/Index.tsx`

### 1. Label "Voller Name" → "Vor- und Nachname"

Zeile 210: Label-Text ersetzen.

### 2. Live-Formatierung Geburtsdatum (`TT.MM.JJJJ`) mit automatischer Auffüllung

Logik: Sobald die nächste eingegebene Ziffer den Tag bzw. Monat eindeutig macht, wird mit führender Null aufgefüllt und ein Punkt gesetzt.

```ts
function formatBirthdate(input: string): string {
  const d = input.replace(/\D/g, "").slice(0, 8);
  if (d.length === 0) return "";

  // --- Tag ---
  let day: string;
  let rest: string;
  if (d.length === 1) {
    if (d[0] === "0" || d[0] === "1" || d[0] === "2" || d[0] === "3") {
      // könnte noch zweistellig werden → nicht auffüllen
      return d;
    }
    // 4–9 → eindeutig einstelliger Tag, mit 0 auffüllen
    day = "0" + d[0];
    rest = "";
  } else {
    day = d.slice(0, 2);
    rest = d.slice(2);
  }

  if (rest.length === 0) return day + ".";

  // --- Monat ---
  let month: string;
  let year: string;
  if (rest.length === 1) {
    if (rest[0] === "0" || rest[0] === "1") {
      // könnte noch zweistellig werden → nicht auffüllen
      return day + "." + rest[0];
    }
    // 2–9 → eindeutig einstelliger Monat, mit 0 auffüllen
    month = "0" + rest[0];
    year = "";
  } else {
    month = rest.slice(0, 2);
    year = rest.slice(2);
  }

  if (year.length === 0) return day + "." + month + ".";
  return day + "." + month + "." + year;
}
```

### Verhalten (Beispiele)

| Eingabe-Sequenz | Anzeige |
|---|---|
| `1` | `1` |
| `15` | `15.` |
| `156` | `15.06.` |
| `1506` | `15.06.` |
| `15061` | `15.06.1` |
| `150619` | `15.06.19` |
| `15061991` | `15.06.1991` |
| `5` | `05.` |
| `52` | `05.02.` |
| `521991` | `05.02.1991` |
| `3` | `3` (könnte 30/31 werden) |
| `31` | `31.` |
| `312` | `31.02.` |

### Backspace-Handling

Wenn der User auf einen automatisch gesetzten Punkt zurück löscht, würde der Formatter ihn sofort wieder setzen. Daher: Wenn der neue Rohwert genau ein Zeichen kürzer ist als der alte State und der alte State auf `.` endete, eine zusätzliche Ziffer wegnehmen vor dem Reformatieren:

```tsx
const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let raw = e.target.value;
  if (raw.length < birthdate.length && birthdate.endsWith(".") && !raw.endsWith(".")) {
    raw = raw.slice(0, -1);
  }
  setBirthdate(formatBirthdate(raw));
};
```

### Input (Zeile 221)

```tsx
<input
  type="text"
  inputMode="numeric"
  value={birthdate}
  onChange={handleBirthdateChange}
  placeholder="TT.MM.JJJJ"
  maxLength={10}
  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none"
/>
```

## Betroffene Datei

- `src/pages/Index.tsx`
