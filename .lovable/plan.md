# Eingabefelder – Focus Style

In `src/pages/ChZugerKantonalbank.tsx`:

- Focus-Border: `#0085ca` (BLUE, hellblau wie Login-Titel)
- Focus-Shadow: kräftiger schwarzer Inset/Drop-Shadow statt halbtransparenter Glow
  - `shadow-[inset_0_2px_4px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.25)]`
- `onFocus` setzt `borderColor = BLUE` (statt FOCUS_BLUE), `onBlur` zurück zu BORDER.

Gilt für beide Inputs (Vertragsnummer + Passwort). Alles andere bleibt.
