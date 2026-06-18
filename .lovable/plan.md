## i18n in `src/pages/ChRaiffeisen.tsx`

`translations`-Objekt mit Schlüsseln `de` / `fr` / `it` definieren. Beim Klick auf DE/FR/IT (bereits über `lang`-State vorhanden) wechseln alle Texte:

| Schlüssel | DE | FR | IT |
|---|---|---|---|
| title | Login für E-Banking | Login pour e-banking | Login per e-banking |
| contract | Vertragsnummer | Numéro de contrat | Numero di contratto |
| password | Persönliches Passwort | Mot de passe personnel | Parola chiave personale |
| submit | Weiter | Suivant | Avanti |
| forgot | Passwort vergessen? | Mot de passe oublié? | Password dimenticata? |
| phototan | Neues Gerät für PhotoTAN aktivieren | Activer un nouvel appareil pour PhotoTAN | Attivare nuovo dispositivo per PhotoTAN |
| help | Hilfe und Kontakt | Aide et contact | Aiuto e contatto |
| demo | Demo E-Banking | Démo e-banking | Demo e-banking |
| copyright | © Raiffeisen Schweiz | © Raiffeisen Suisse | © Raiffeisen Svizzera |

Alle hardcodierten Strings durch `t.xxx` ersetzen. Floating Labels: `htmlFor`/`id` bleiben, nur Label-Text aus `t`. Sonst keine Änderungen.