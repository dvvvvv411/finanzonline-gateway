

## Neue "Aktuelles" Sektion mit 4 Spalten

### Bilder kopieren
Die 4 hochgeladenen Bilder nach `src/assets/` kopieren:
- `IDAustria.png`
- `Finanznavi.jpg`
- `steuerbuch.jpg`
- `Kundenservice.png`

### Änderung in `src/pages/Index.tsx`

Nach der "Persönliche Informationen" Card (Zeile 249) eine neue Sektion einfügen:

- Titel "Aktuelles" — bold, zentriert, gleicher Stil wie "Willkommen bei FinanzOnline"
- 4-Spalten Grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`)
- Jede Spalte ist eine klickbare Card mit:
  - Bild oben (abgerundete Ecken oben, `object-cover`)
  - Titel (bold)
  - Beschreibungstext (grau, klein)
  - `<a href="..." target="_blank">` für den Redirect
- Cards mit Border, leichtem Shadow, Hover-Effekt

### Die 4 Cards

| Spalte | Bild | Titel | Text | Link |
|--------|------|-------|------|------|
| 1 | IDAustria.png | Infos zur ID Austria | Alle Informationen zur ID Austria und wie Sie diese aktivieren können. | oesterreich.gv.at/id-austria.html |
| 2 | Finanznavi.jpg | Finanznavi | Ihr digitaler Wegweiser für Ihre Finanzentscheidungen. | finanznavi.gv.at |
| 3 | Kundenservice.png | Kundenservice | Alle Informationen zu unserem Kundenservice. | bmf.gv.at/.../faoe.html |
| 4 | steuerbuch.jpg | Das Steuerbuch 2026 | Tipps zur Arbeitnehmerveranlagung 2025 für Lohnsteuerzahler/innen | bmf.gv.at/.../steuerbuch-2026.html |

### Datei
- `src/pages/Index.tsx` — Imports + neue Sektion

