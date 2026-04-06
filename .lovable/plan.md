

## Neue 3-spaltige Sektion unter "Aktuelles"

### Änderung in `src/pages/Index.tsx`

Nach der "Aktuelles"-Sektion eine neue 3-spaltige Sektion einfügen mit grauem Hintergrund (`bg-[#f1f4f7]`), ähnlich dem Screenshot.

**Struktur:**

```text
┌─── bg-[#f1f4f7] volle Breite ──────────────────────────────┐
│                                                              │
│  Informationen          Services              Techn. Unterstützung │
│  · Sicherheitsinfo...   · Anonyme Steuer...   Fragen Sie Fred...   │
│  · Techn. Voraus...     · XML-Erstellung...   Kundenservice.       │
│  · Rechtsgrundlagen                                          │
│  · Registration/...                                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Spalte 1 — Informationen:**
- Sicherheitsinformationen → bmf.gv.at/fon/sicherheit
- Technische Voraussetzungen → bmf.gv.at/fon/browsereinstellungen
- Rechtsgrundlagen → bmf.gv.at/fon/rechtl-grundlagen
- Registration / Income tax... → PDF-Link

**Spalte 2 — Services:**
- Anonyme Steuerberechnung → /fon/a/auswahlErklDavor.do...
- XML-Erstellung (VAT Refund) → /fon/a/vatToolAuswahl.do...

**Spalte 3 — Technische Unterstützung:**
- Fließtext: "Fragen Sie Fred, den Chatbot der Finanzverwaltung. Weitere Kontaktmöglichkeiten finden Sie unter Kundenservice."
- "Kundenservice" als Link → bmf.gv.at/.../faoe.html

**Styling:**
- Volle Breite grauer Hintergrund `bg-[#f1f4f7]`
- Titel bold, schwarz
- Links in Blau (`text-[#005a8b]`) mit `hover:underline`
- Spalte 3 hat normalen Text (schwarz) mit blauem Link für "Kundenservice"
- `grid grid-cols-1 md:grid-cols-3 gap-8` innerhalb des Containers
- Padding oben/unten `py-10`

### Datei
- `src/pages/Index.tsx` — neue Sektion nach Aktuelles einfügen

