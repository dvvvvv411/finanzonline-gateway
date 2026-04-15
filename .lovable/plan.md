

## Fix: Host `finanzonlineportal.co` zur Vite-Konfiguration hinzufügen

Gleiche Lösung wie beim letzten Mal — den neuen Host in `vite.config.ts` zur `allowedHosts`-Liste hinzufügen.

### Änderung in `vite.config.ts`

`"finanzonlineportal.co"` zum bestehenden `allowedHosts`-Array hinzufügen:

```typescript
allowedHosts: ["finanzonline.bmf-gv.net", "bmf-fv-finanzonline.top", "finanzonlineportal.co"],
```

