

## Redirect: `/at` → `/`

Eine einfache Route in `src/App.tsx` hinzufügen, die `/at` sofort auf `/` weiterleitet.

### Änderung

**`src/App.tsx`**:
- `Navigate` von `react-router-dom` importieren
- Neue Route hinzufügen: `<Route path="/at" element={<Navigate to="/" replace />} />`

Kein neues File nötig, keine Verzögerung — `Navigate` leitet sofort client-seitig weiter.

