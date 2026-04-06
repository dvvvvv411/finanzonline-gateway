

## Fix: FinanzOnline Header Layout

### Änderungen an `src/pages/Index.tsx`

1. **Border entfernen** - Kein `border-b` am Header
2. **Titel schwarz** - Statt rot (#E6320F) wird die Überschrift schwarz
3. **BMF Logo kleiner** - Etwas kleiner skalieren (h-10 statt h-16)
4. **Layout anpassen** - Logos oben links/rechts fixiert, mehr Abstand zum Titel
5. **Padding/Spacing** - Dem Original anpassen mit mehr vertikalem Abstand zwischen Logos und Titel

### Technisch
- Entferne `border-b border-gray-200` vom Header
- Ändere `style={{ color: "#E6320F" }}` zu `text-black`
- BMF Logo: `h-8 md:h-10` (kleiner als FinanzOnline Logo)
- FinanzOnline Logo: `h-8 md:h-12`
- Titel bekommt mehr `py-8 md:py-12` für Abstand

