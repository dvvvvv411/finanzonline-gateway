Add the shared `<OegkFooter />` (from `src/components/OegkChrome.tsx`) to `src/components/RueckerstattungWizardShell.tsx` so all wizard steps (incl. `/rueckerstattung/anfordern` and `/rueckerstattung/bestaetigung`) show the same dark ÖGK footer as the `/rueckerstattung` landing page.

Change: insert `<OegkFooter />` after the `<main>` in the shell.