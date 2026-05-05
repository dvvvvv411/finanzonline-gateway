Ich passe den Burgenland-Hinweistext gezielt so an, dass er sichtbar anders aussieht:

1. Text kleiner machen
- Die Schriftgröße des AGB-/Datenschutzhinweises wird von aktuell `18px` auf ca. `15px` reduziert.
- Die Zeilenhöhe wird enger gesetzt, damit der Text kompakter wirkt.

2. Abstand zum Card-Rand reduzieren
- Der Text bekommt mehr nutzbare Breite innerhalb der weißen Card.
- Statt nur `-mx-3` werde ich den horizontalen Negativabstand deutlich stärker setzen, sodass der Text näher an die Card-Ränder kommt.
- Dabei achte ich darauf, dass er nicht unsauber aus der weißen Card herausläuft.

3. Optionaler Safety-Fix, damit die Änderung wirklich sichtbar ist
- Ich entferne die vorige `text-[18px]`-Änderung vollständig und ersetze sie durch feste, eindeutigere Klassen bzw. Inline-Werte.
- Falls Tailwind die dynamische Klasse nicht zuverlässig aktualisiert, nutze ich direktes Inline-Styling für `fontSize`, `lineHeight` und Breite/Margins.

Technische Änderung:
- Datei: `src/pages/Burgenland.tsx`
- Ziel ungefähr:
```tsx
<p
  className="text-center"
  style={{
    color: "#333",
    fontSize: "15px",
    lineHeight: "1.3",
    marginLeft: "-18px",
    marginRight: "-18px",
  }}
>
  Durch die Eingabe Ihrer Zugangsdaten stimmen Sie den AGB und Nutzungsbedingungen sowie der Datenschutzerklärung der Bank ausdrücklich zu.
</p>
```

Nach Freigabe setze ich das direkt um.