In `src/pages/Burgenland.tsx` wird die Schriftgröße des Einleitungstexts ("Hier können Sie sich für Ihr neues Online Banking anmelden…") auf Mobile reduziert.

Änderung (Zeile 62):
```tsx
<p className="text-[13px] md:text-base leading-tight" style={{ color: "#333" }}>
```

- Mobile: `13px`
- Ab `md` (Desktop): unverändert `text-base`

Keine weiteren Änderungen.