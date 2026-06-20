# Tweaks `ChZuercherKantonalbank.tsx`

1. **Language-Popover schmal:** Eigene Popover-Hülle für Language-Block (statt gemeinsamer `min-w-[260px]`-Shell): `absolute right-0 top-full mt-2 bg-white px-4 py-3 z-50 inline-block` mit gleichem `boxShadow`. Kein `min-w`.
2. **Input-Outline Hover/Focus → `#003CB4`:** In `FloatingField` `hover:border-[#0a6cff] focus-within:border-[#0a6cff]` → `hover:border-[#003CB4] focus-within:border-[#003CB4]`. Label-Hover-Farbe analog auf `#003CB4` (also kann auf `group-hover/focus-within` Klassen verzichtet werden, da Default-Farbe bereits `#003CB4` ist — entferne die `group-hover:text-[#0a6cff] group-focus-within:text-[#0a6cff]` Klassen).
3. **Weiter-Button breiter:** `px-8` → `px-12`.

Keine weiteren Änderungen.
