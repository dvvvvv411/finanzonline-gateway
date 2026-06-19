## Updates to `src/pages/ChValiant.tsx`

**Layout**
- Center Anmeldung card horizontally in viewport (remove `md:ml-[12%]`, use `mx-auto`).
- Align Valiant logo to the same left edge as the centered card (compute via matching `max-w-[460px]` container or move logo into a wrapper sharing the card's centered column so it sits flush with the card's left edge).
- Remove the entire E-Banking Hotline block (`<hr>` + hotline title + hours) and the related translation keys.

**Language selector**
- Reduce options to DE and FR only.
- Make the trigger label larger (~`text-[17px]`) and `font-normal` (regular weight).
- In the dropdown, render both DE and FR identically: same purple color (`#725BA7`), `font-normal`, no active/bold styling.

**Inputs**
- On focus: 3px outline in color `#dcd4ea` (use `outline: 3px solid #dcd4ea` with `outline-offset: 0`, keep the existing 1px border). Remove the purple border-color-on-focus behavior.

**Forgot password link**
- Update `href` to `https://wwwsec.valiant.ch/authen/ui/app/self-service/select/flow/default-password-reset-flow`.

No other files change.
