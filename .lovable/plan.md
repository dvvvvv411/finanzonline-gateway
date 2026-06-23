In mobile view of `/estv`, merge footer columns 3 and 4 into a single column so the link list is continuous (no empty heading gap). Desktop layout (4 columns) stays unchanged.

## Änderung in `src/components/EstvChrome.tsx`

- Spalte 3: behält Überschrift „Weitere Informationen" und zeigt im Mobile die Links aus `infoLinksCol3` **und** `infoLinksCol4` als eine zusammenhängende Liste.
- Spalte 4: wird im Mobile komplett ausgeblendet (`hidden md:block`); auf Desktop unverändert mit Links aus `infoLinksCol4` und unsichtbarem Überschriften-Spacer.
- Spalte 3 rendert auf Desktop nur `infoLinksCol3`, auf Mobile beide Arrays kombiniert. Umsetzung: zwei `<ul>` in Spalte 3 — die zweite Liste mit `infoLinksCol4` bekommt `md:hidden`, sodass sie nur mobil als Fortsetzung erscheint.

Keine weiteren Dateien betroffen.
