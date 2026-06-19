In `src/pages/ChBaloise.tsx` den Links-Container (Zeile 421) so anpassen, dass die Links "Passwort vergessen" und "Neues Gerät aktivieren" in der Mobile-View mittig zentriert untereinander/nebeneinander stehen, ab `sm:` wieder `justify-between`.

Änderung:
- `justify-between` → `justify-center sm:justify-between`
- Gap bleibt; auf Mobile stapeln/zentrieren die Links automatisch dank `flex-wrap`.