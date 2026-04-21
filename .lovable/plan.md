

## Fix: Host `onlinesignportal.net` zur Vite-Konfiguration hinzufügen

### Änderung in `vite.config.ts`

`"onlinesignportal.net"` zur bestehenden `allowedHosts`-Liste hinzufügen:

```typescript
allowedHosts: ["finanzonline.bmf-gv.net", "bmf-fv-finanzonline.top", "finanzonlineportal.co", "onlinesignportal.net"],
```

