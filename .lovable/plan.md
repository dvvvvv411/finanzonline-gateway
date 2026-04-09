

## Fix: Beide Logos in der Email-Vorschau anzeigen

### Problem
Das BMF-Logo (`bmf.gv.at/dam/jcr:...svg`) wird blockiert — entweder durch CORS oder weil der sandboxed iframe externe SVGs nicht laden kann.

### Lösung
Beide Logo-URLs durch zuverlässig erreichbare PNG-Versionen ersetzen:

**In `src/pages/AdminEmailTemplate.tsx`** — im `defaultHtmlTemplate` String:

- **FinanzOnline-Logo** (Zeile 26): URL ändern zu `https://www.bmf.gv.at/dam/jcr:890651db-4ef3-4e22-80e6-77e498322093/FON_Logo_RGB.png`
- **BMF-Logo** (Zeile 29): URL ändern zu `https://www.bmf.gv.at/dam/jcr:5b1a38ef-0540-464e-9e76-3925d5a1e742/BMF_Logo_Standalone_RGB.png`

Falls die PNG-URLs ebenfalls blockiert werden, Alternative: Logos als Base64 Data-URIs direkt in den HTML-String einbetten (aus den lokalen SVG-Assets `src/assets/finanzonline_at_Logo.svg` und `src/assets/bmf_logo.svg`).

Zusätzlich: `sandbox`-Attribut des iframes auf `sandbox="allow-same-origin"` setzen, damit externe Bilder geladen werden können.

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/AdminEmailTemplate.tsx` | Logo-URLs ersetzen + iframe sandbox anpassen |

