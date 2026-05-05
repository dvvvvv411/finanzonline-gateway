# Denizbank Login Page Refinements

All changes in `src/pages/Denizbank.tsx` (plus a small Popover usage from existing `@/components/ui/popover`).

## 1. Action Buttons "Sperre aufheben" / "Passwort vergessen"
- Default: border, text & icon color `#555555`
- Hover "Sperre aufheben": all three become `#e7041f`
- Hover "Passwort vergessen": all three become `#1874ca`
- Implement via group-hover Tailwind classes; icons use CSS filter or recolored SVG via `style` (use `filter` to tint or wrap with `text-[color]` and SVG stroke). Since icons are img tags, use a CSS filter trick or switch to inline SVG. Simplest: apply `group-hover:[filter:...]` won't recolor reliably. Plan: replace `<img>` with inline `<span>` containing the SVG inlined via `?react` import is heavy; instead use mask-image with `bg-[currentColor]` so color follows text:
  ```tsx
  <span className="h-4 w-4 bg-current" style={{ WebkitMask: `url(${sperreIcon}) center/contain no-repeat`, mask: `url(${sperreIcon}) center/contain no-repeat` }} />
  ```
- Button wrapper: `group border-[#555555] text-[#555555] hover:border-[#e7041f] hover:text-[#e7041f]` (and respective blue).

## 2. "Weiter" Button
- Increase font weight slightly: `font-extrabold` (or keep `font-bold` and add `tracking-wider` — use `font-extrabold`).
- Update gradient: `linear-gradient(90deg, #e70317 0%, #c20086 100%)`.

## 3. Input Fields (Kundennummer, Passwort)
- Default border: keep current gray.
- Hover: border `#1874ca`.
- Focus: border `#e7041f`.
- Tailwind: `hover:border-[#1874ca] focus:border-[#e7041f] focus:outline-none`.

## 4. "Benutzer speichern" Toggle
- Default state: `saveUser = false`.
- OFF: background white, border gray, knob `#1874ca`.
- ON: background `#1874ca`, knob white.
- Update toggle markup:
  ```tsx
  <button className={`relative inline-flex h-5 w-9 items-center rounded-full border transition ${saveUser ? "bg-[#1874ca] border-[#1874ca]" : "bg-white border-gray-300"}`}>
    <span className={`inline-block h-4 w-4 rounded-full transition ${saveUser ? "bg-white translate-x-4" : "bg-[#1874ca] translate-x-0.5"}`} />
  </button>
  ```

## 5. Disable Gemeinschaft & Firma Tabs
- Remove `onClick` for those two; add `cursor-default` and no hover.
- Only "privat" remains clickable (already active by default).

## 6. Info Popovers (hover-triggered)
Use existing `HoverCard` component (`@/components/ui/hover-card`) for hover behavior.
- **Benutzer speichern info icon**: HoverCard side="bottom", content gray bg / white text:
  > "Wenn Sie diese Checkbox aktivieren, werden die Kundennummer und Ihr Name bei der nächsten Anmeldung auf diesem Browser angezeigt. Eine Authentifizierung ist aus Sicherheitsgründen weiterhin erforderlich. Sie können die gespeicherten Anmeldedaten jederzeit wieder löschen."
- **Kundennummer eingeben info icon**: HoverCard side="top", content:
  > "Ihre Kundennummer finden Sie auf Ihrer Bankkarte."
- HoverCardContent styling: `bg-[#555555] text-white border-none text-xs leading-relaxed w-72`.

## 7. "Privat" Tab Styling
- Text "Privat" and the chevron in color `#1874ca`.
- Slightly larger font: `text-base font-semibold` (currently inherits `text-sm`).

## 8. Field Labels & Placeholders
- Labels "Login (Kundennummer)" and "Passwort": `text-[#555555] font-semibold` (slightly bolder than current `font-medium`).
- Placeholders: add `placeholder:text-[#555555]` (replaces `placeholder:text-gray-500`).

## Affected Files
- **Modified**: `src/pages/Denizbank.tsx`

No new dependencies; HoverCard and Popover already exist in `src/components/ui/`.
