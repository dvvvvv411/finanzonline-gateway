

## Passwort-Feld: X durch Auge-Icon ersetzen (Toggle Sichtbarkeit)

### Betrifft 9 Dateien
`Volksbank.tsx`, `Bank99.tsx`, `HypoNoe.tsx`, `Schelhammer.tsx`, `BankhausSpaengler.tsx`, `Dolomitenbank.tsx`, `Spardabank.tsx`, `Dadatbank.tsx`, `Marchfelderbank.tsx`

### Änderung pro Datei

1. **Import**: `Eye, EyeOff` von `lucide-react` hinzufügen
2. **State**: `showPassword` Boolean hinzufügen
3. **Passwort-Input**: `type` von `"password"` auf `showPassword ? "text" : "password"` ändern
4. **Button im Passwort-Feld**: Den bestehenden X-Button (der bei `password &&` angezeigt wird) durch einen Toggle-Button ersetzen:
   - Zeigt `Eye` wenn Passwort versteckt, `EyeOff` wenn sichtbar
   - `onClick` toggelt `showPassword`
   - Wird **immer** angezeigt wenn `password` nicht leer ist

**Benutzername-Felder bleiben komplett unverändert** — X-Button bleibt dort bestehen.

