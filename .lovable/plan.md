## Weitere Mobile-Anpassungen `/ch/migros`

In `src/pages/ChMigros.tsx`:

1. **Abstand zwischen den beiden Card-Footer-Links weiter verkleinern** (mobil)
   - `gap-2` → `gap-1` im Container für "Probleme bei der Anmeldung?" / "Wo finde ich meine Vertragsnummer?"
   - Desktop bleibt unverändert (`md:gap-4`).

2. **Mobile-Logo weiter verkleinern**
   - `MigrosLogoMobile`: `width="26" height="32"` → `width="22" height="27"`.

Keine weiteren Änderungen.