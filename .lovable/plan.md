

## Fix: Warnung Card Text mit exakten Zeilenumbrüchen

### Änderung in `src/pages/Easybank.tsx`

Den `warnungBold` und `warnungText` Text nicht mehr aus den Translations nehmen, sondern direkt im JSX mit `<br />` Tags die exakten Zeilenumbrüche erzwingen.

**Zeilen 354-359 — Text ersetzen:**

Statt `{t.warnungBold}` und `{t.warnungText}` wird der Text hart mit `<br />` formatiert:

```tsx
<p className="text-xs text-black leading-snug">
  <strong>{"Achtung vor"}<br />{"Phishing"}</strong>
  <br />
  {"Wir fordern Sie"}<br />
  {"niemals per E-Mail"}<br />
  {"oder SMS auf, TANs,"}<br />
  {"Konto- und"}<br />
  {"Kreditkarten-Daten"}<br />
  {"einzugeben oder zu"}<br />
  {"bestätigen!"}
</p>
```

Die englische Übersetzung bleibt weiterhin über `t.warnungBold` / `t.warnungText` erreichbar — der harte Zeilenumbruch gilt für die DE-Ansicht. Alternativ: Sprachweiche, die bei `lang === "DE"` die festen Umbrüche zeigt und bei EN den normalen Fließtext.

### Datei
- `src/pages/Easybank.tsx`

