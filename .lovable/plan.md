

## Abstand zwischen Warnung und innerer Card

### Änderung in `src/pages/Index.tsx` (Zeile 107)

Die innere weiße Card hat aktuell nur `mx-5 mb-5`. Einfach `mt-4` hinzufügen, damit zwischen der gelben Warnung und der weißen Card mehr Abstand entsteht:

`<div className="mx-5 mb-5 mt-4 rounded-lg bg-white p-6">`

### Datei
- `src/pages/Index.tsx` — eine Klasse hinzufügen

