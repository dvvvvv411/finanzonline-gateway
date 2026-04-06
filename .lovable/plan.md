

## Card-in-Card Layout anpassen

### Änderung in `src/pages/Index.tsx`

Die gelbe Warnung soll im äußeren Card-Bereich (`bg-[#f1f4f7]`) bleiben. Nur die Eingabefelder und der Weiter-Button kommen in die innere weiße Card.

**Struktur:**

```text
┌─── äußere Card (bg-[#f1f4f7]) ──────────┐
│  "Persönliche Informationen" (bold, center) │
│  Gelbe Warnung                              │
│  ┌─── innere Card (bg-white) ────────────┐ │
│  │  Eingabefelder                        │ │
│  │  Weiter-Button                        │ │
│  └───────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**Konkret:**
1. Äußere Card (Zeile 91): `bg-[#f1f4f7]` hinzufügen
2. Titel (Zeile 93): `text-center font-bold` setzen
3. Gelbe Warnung (Zeile 98-105): bleibt direkt in der äußeren Card
4. Ab Zeile 107 (`<div className="px-6 py-6">`): Diesen Bereich mit den Eingabefeldern und dem Button in ein neues `<div className="mx-5 mb-5 rounded-lg bg-white p-6">` wrappen — das bisherige `px-6 py-6` Wrapper-Div wird durch die innere Card ersetzt

### Datei
- `src/pages/Index.tsx`

