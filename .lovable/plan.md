

## BAWAG Seite: Hintergrundbild als Basis, Elemente darüber

### Problem
Aktuell sind Login-Card, Info-Card und Hintergrundbild nebeneinander/untereinander angeordnet. Auf der echten BAWAG-Seite ist das Hintergrundbild **fullwidth als Hintergrund** und die Cards schweben **darüber** (Z-Ebene).

### Neues Layout

```text
┌──────────────────────────────────────────────────┐
│ Header (weiß, Logo, Datum, Sprachen)             │
├──────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────┐ │
│ │         BACKGROUND IMAGE (100% width)        │ │
│ │                                              │ │
│ │   ┌──────────┐  ┌────────────────────────┐   │ │
│ │   │ Login    │  │ Sicherheit│Service│Sup │   │ │
│ │   │ Card     │  └────────────────────────┘   │ │
│ │   │          │                               │ │
│ │   └──────────┘                               │ │
│ │                                              │ │
│ └──────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────┤
│ Footer                                           │
└──────────────────────────────────────────────────┘
```

### Änderungen in `src/pages/Bawag.tsx`

**Main-Bereich komplett umbauen:**

1. **`<main>` wird ein relativer Container** mit dem Hintergrundbild als `background-image` (CSS `background-size: cover`, `background-position: center`)
2. **Login-Card und Info-Card** liegen als normale Elemente innerhalb dieses Containers, mit Padding/Margin damit sie über dem Bild positioniert sind
3. **Das separate `<img>` für das Hintergrundbild entfernen** — es wird stattdessen als CSS-Background des Main-Containers verwendet
4. **Info-Card** sitzt rechts oben neben der Login-Card (wie bisher mit flex), aber alles innerhalb des Bild-Containers
5. Main bekommt `min-height` damit genug vom Bild sichtbar ist

**Konkret:**
- `<main>` bekommt: `style={{ backgroundImage: url(${bawagBg}), backgroundSize: 'cover', backgroundPosition: 'center top' }}` + `relative` + `min-h-[600px]`
- Die flex-Row mit Login-Card und rechter Spalte bleibt, aber ohne das separate Bild-Banner am Ende
- Info-Card bleibt in der rechten Spalte, aber ohne das `<img>` darunter

### Datei
- `src/pages/Bawag.tsx` — Main-Bereich umstrukturieren

