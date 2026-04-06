

## Bank Dropdown Verbesserungen

### 1. Alle 14 Bank-Icons einbinden
Icons nach `src/assets/` kopieren:
- Bereits vorhanden (10): oberbank, bank_austria, bank99, bankhaus_spängler, bawag_psk, dadat_bank, dolomiten_bank, easy_bank, erste_bank, hypo_noe
- Neu (4): volksbank, raiffeisen_bank, schelhammer, sparda_bank

`banks` Array wird zu Objekt-Array mit Icon-Referenz umgebaut. Jede Bank bekommt ihr Icon (h-5 w-5) neben dem Namen.

### 2. Suchleiste in den Trigger integrieren
- Der Trigger wird zu einem editierbaren Input-Feld
- Placeholder "Bank auswählen", beim Tippen filtert sich die Liste
- `CommandInput` aus dem Popover-Body entfernen
- Stattdessen State für Suchbegriff im Trigger, der an `Command` weitergegeben wird

### 3. Minimale Custom Scrollbar
- CSS-basierte dünne Scrollbar auf der `CommandList` via Tailwind-Utilities oder inline styles
- Dünn, grau, abgerundet — statt der breiten nativen Browser-Scrollbar

### Datei
- `src/pages/Index.tsx` — Banks-Array, Dropdown-Logik, Scrollbar-Styling

