In `src/pages/ChGraubuendnerKantonalbank.tsx` die beiden Input-Felder umstellen: statt zusätzlicher `outline` nur die bestehende Border umfärben.

Bei beiden Inputs (Vertragsnummer + Passwort) die Klassen
`outline-none focus:outline focus:outline-2 focus:outline-black hover:outline hover:outline-1 hover:outline-black`
ersetzen durch
`outline-none hover:border-black focus:border-black`.

Border bleibt 1px, Default `#cfd4dc`, Hover/Focus → schwarz. Keine doppelte Outline mehr.