# Mobile Tweaks /denizbank

In `src/pages/Denizbank.tsx`:

1. **Header sticks to top on mobile**: change `pt-12` → `pt-0 md:pt-12`, `pb-6` → `pb-4 md:pb-6`.
2. **Main padding tighter on mobile**: change `py-10` → `py-4 md:py-10`, `items-center` → `items-start md:items-center`.
3. **Hinweis text smaller on mobile**:
   - Title: `text-lg` → `text-base md:text-lg`
   - Body: `text-sm` → `text-xs md:text-sm`
   - Card padding: `p-5` → `p-4`
4. **Inactive tabs (Gemeinschaft/Firma)** keep slight blur on mobile: `bg-[#605f60]` → `bg-[#605f60]/70 backdrop-blur-md` (applies on both mobile and desktop).
5. **Sperre aufheben / Passwort vergessen icons** left-aligned, text centered:
   - Use `relative` button + absolutely positioned icon `absolute left-3`, keep `justify-center` for text.
6. **Footer icons larger on mobile**: img class `h-4 w-4` → `h-6 w-6 md:h-4 md:w-4`.
