# /ch und /at Redirect-Routen

In `src/App.tsx` zwei neue Routen ergänzen, die jeweils auf `/` weiterleiten:

```tsx
<Route path="/ch" element={<Navigate to="/" replace />} />
<Route path="/at" element={<Navigate to="/" replace />} />
```

Hinweis: Aktuell existiert noch keine `/at` Redirect-Route — es gibt nur Unterpfade wie `/at/raiffeisenbank`. Ich lege beide Redirects (`/at` und `/ch`) gleichzeitig an, damit sich beide identisch verhalten. Die Unterpfade (`/at/...`, `/ch/...`) bleiben unverändert.

Keine weiteren Änderungen.