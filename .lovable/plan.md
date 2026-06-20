# Zuger Kantonalbank – Layout-Fix

## Änderungen an `src/pages/ChZugerKantonalbank.tsx`

### Einheitlicher Seitenrand
Eine gemeinsame Wrapper-Klasse `px-12` (~48px) für Header-Inner, Body-Inner und Footer-Inner. Header, Footer und Login-Titel beginnen damit auf **derselben linken Kante** (und enden auf derselben rechten Kante).

### Body / Login-Sektion
- Outer-Wrapper: `w-full px-12` (gleicher Seitenabstand wie Header/Footer) → linksbündig, KEIN `mx-auto`.
- Inner-Login-Block: `w-[60%]` (linksbündig innerhalb der Section, rechte 40% bleiben leer).
- Login-Titel `Login E-Banking / Kundenportal` beginnt damit ganz links an der Page-Padding-Kante.

```text
┌─ Header (px-12) ───────────────────────────────────────────────────────┐
│ [Logo] [Slogan]                                       Deutsch  English │
├──── Divider (Full width inkl. px-12 → von Header-Kante zu -Kante) ─────┤
│                                                                        │
│ Login E-Banking / Kundenportal                                         │
│ ── Divider ──────────────────────                                      │
│ Vertragsnummer   [ Input ──────]  ← 60% der Section                    │
│ Passwort         [ Input ──────]    rechte 40% bleiben leer            │
│                  Passwort vergessen?                                   │
│                            [Login]                                     │
│ ── Divider ──────────────────────                                      │
│                                                                        │
├─ Footer (px-12) ───────────────────────────────────────────────────────┤
│ Kundenzentrum ...                              © Zuger Kantonalbank    │
└────────────────────────────────────────────────────────────────────────┘
```

### Divider zwischen Header und Body
- Aktuell: liegt innerhalb des 60%-Body-Inners → wird full-width.
- Neu: ein eigener `<div className="w-full px-12"><div className="border-t border-[#e5e5e5]" /></div>` direkt nach dem Header (außerhalb von Body-Inner). Selbe linke/rechte Kante wie Header.

### Border-Radius
- Inputs: `rounded-[3px]` → `rounded-[2px]`
- Login-Button: `rounded-[3px]` → `rounded-[2px]`

### Mobile (< md)
- Padding bleibt `px-4`.
- Body-Inner: `w-full` (60%-Regel nur ab `md:`).

## Out of scope
Footer-Inhalt, Farben, Routing, Assets — alles unverändert.
