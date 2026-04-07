

## Bank99 — PostSans Font einbinden

### 1. Asset kopieren
- `user-uploads://PostSans_Medium.otf` → `src/assets/fonts/PostSans_Medium.otf`

### 2. `src/index.css` — @font-face hinzufügen
```css
@font-face {
  font-family: 'PostSans';
  src: url('/src/assets/fonts/PostSans_Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
}
```

### 3. `src/pages/Bank99.tsx` — Font anwenden
- Auf dem äußersten Container `style={{ fontFamily: "'PostSans', sans-serif" }}` setzen, damit die gesamte Seite PostSans verwendet.

