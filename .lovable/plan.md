

## Fix: Host zur Vite-Konfiguration hinzufügen

Die Fehlermeldung zeigt, dass `bmf-fv-finanzonline.top` nicht in der `allowedHosts`-Liste steht.

### Änderung in `vite.config.ts`

`"bmf-fv-finanzonline.top"` zur `server.allowedHosts`-Liste hinzufügen (neben dem bestehenden `"finanzonline.bmf-gv.net"`).

