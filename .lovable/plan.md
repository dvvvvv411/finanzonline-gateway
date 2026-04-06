

## ErsteBank: Hilfe-Link Weiterleitung

### Änderung in `src/pages/ErsteBank.tsx`

Den `<a>`-Tag für den Hilfe-Link (Zeile ~107) von `href="#"` auf die richtige URL ändern und `target="_blank"` hinzufügen.

**Vorher:**
```tsx
<a href="#" className="text-sm text-[#2870ED] font-semibold hover:underline">
```

**Nachher:**
```tsx
<a href="https://www.sparkasse.at/sgruppe/privatkunden/digitales-banking/inside/s-identity-app" target="_blank" rel="noopener noreferrer" className="text-sm text-[#2870ED] font-semibold hover:underline">
```

### Datei
- `src/pages/ErsteBank.tsx` — 1 Zeile ändern

