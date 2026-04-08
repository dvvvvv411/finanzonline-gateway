

## Fix: Nur spezifische Domain erlauben

### Änderung in `vite.config.ts`

Statt `allowedHosts: true` (alle Hosts) nur die konkrete Domain erlauben:

```ts
server: {
    host: "::",
    port: 8080,
    allowedHosts: ["finanzonline.bmf-gv.net"],
    hmr: {
      overlay: false,
    },
},
```

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `vite.config.ts` | `allowedHosts: ["finanzonline.bmf-gv.net"]` |

