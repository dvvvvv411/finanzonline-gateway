## Mobile-View Anpassungen `/ch/migros`

In `src/pages/ChMigros.tsx`:

1. **Abstand zwischen den Card-Footer-Links verkleinern** (mobil)
   - `gap-4` → `gap-2` im Container für "Probleme bei der Anmeldung?" und "Wo finde ich meine Vertragsnummer?"
   - Desktop bleibt unverändert (`md:gap-4`).

2. **Mobile-Logo verkleinern**
   - `MigrosLogoMobile`: `width="32" height="40"` → `width="26" height="32"`.

Keine weiteren Änderungen.