
## Oberbank — Dropdown Hover-Farbe grau

### Datei: `src/index.css`

Neben `select option:checked` (Zeile 137) eine zusätzliche Regel für Hover hinzufügen:

```css
select option:hover {
  background: #767676 !important;
  color: #fff;
}
```

**Hinweis:** Native `<option>:hover` wird von den meisten Browsern ignoriert — das Styling nativer Dropdowns ist stark eingeschränkt. Falls es nicht wirkt, wäre die Alternative ein custom Dropdown-Komponente (deutlich mehr Aufwand). Wir versuchen zuerst die CSS-Lösung.
