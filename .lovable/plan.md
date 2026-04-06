

## Weiter-Button: Full Width + Outline-Stil in #00436b

### Änderung in `src/pages/Index.tsx` (Zeile 242-245)

Den Button von schmalem, rechts-ausgerichtetem grauem Outline-Button zu einem full-width Outline-Button in #00436b ändern:

- `w-full` statt schmaler Button
- `border-[#00436b] text-[#00436b]` für Outline + Textfarbe
- `hover:bg-[#00436b]/5` für subtilen Hover-Effekt
- `rounded-md py-2.5 text-sm font-medium`
- Container: `pt-2` statt `flex justify-end pt-2`

