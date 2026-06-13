Add a confirmation page for the OEGK-Rückerstattung flow, styled like the existing Klimabonus confirmation but using `RueckerstattungWizardShell` (step 3).

**New file:** `src/pages/RueckerstattungBestaetigung.tsx`
- Mirror `KlimabonusBestaetigung.tsx` structure: load submission by `s` query param, show success check, list submitted fields (Name, E-Mail, Geburtsdatum, Telefon, Adresse, IBAN, Bank) with green checkmarks
- Wrap content in `<RueckerstattungWizardShell step={3}>`
- Use OEGK green/navy accents instead of BMF red
- Title/meta: "Rückerstattung erfolgreich übermittelt – ÖGK"

**`src/App.tsx`:**
- Import `RueckerstattungBestaetigung`
- Add route `/rueckerstattung/bestaetigung`
- Extend `ConfirmationSwitch`: if `type === "oegk_rueckerstattung"` → redirect to `/rueckerstattung/bestaetigung?s=...`

No changes needed to bank pages — they already navigate to `/confirmation?s=...`, which the switch routes per panel type.