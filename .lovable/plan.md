## i18n (DE/FR/EN) + Verlinkungen für `/ch/berner-kantonalbank`

In `src/pages/ChBernerKantonalbank.tsx`:

### 1. Übersetzungs-Dictionary
Innerhalb der Komponente ein `const T: Record<Lang, {...}>` mit allen UI-Strings (Mein Portal, Headline, Field-Labels, Legal-Text + "Geschäftsbedingungen" + "der BEKB | BCBE für das E-Banking", Weiter, E-Banking-Link, Nützliche Links, Zur Support…, So erkennen Sie…, Unser Support, Wir rufen Sie an…, Telefontermin vereinbaren, Montag bis Freitag, Samstag, Footer-Headlines Anschrift/Bankdaten/Schnellzugriff/Social Media, Adresszeilen falls übersetzt — Postfach=Case postale/PO Box, sonst gleich, Footer-Links Offene Stellen/Medien/Glossar/Support und Hilfe, Rechtliche Hinweise, Datenschutz). Verwendung über `const t = T[lang]`.

Übersetzungen (Standardquelle bekb.ch):
- "Mein Portal" → DE "Mein Portal" / FR "Mon portail" / EN "My portal"
- Headline → DE "Bitte geben Sie Ihre Zugangsdaten an" / FR "Veuillez saisir vos identifiants" / EN "Please enter your credentials"
- "Benutzeridentifikation" → FR "Identification utilisateur" / EN "User identification"
- "Passwort" → FR "Mot de passe" / EN "Password"
- Legal → DE "Mit der Anmeldung akzeptiere ich die Geschäftsbedingungen der BEKB | BCBE für das E-Banking." / FR "En me connectant, j'accepte les conditions générales de la BEKB | BCBE pour l'e-banking." / EN "By logging in, I accept the BEKB | BCBE terms and conditions for e-banking."
- "Geschäftsbedingungen" → FR "conditions générales" / EN "terms and conditions"
- "Weiter" → FR "Continuer" / EN "Continue"
- "E-Banking Schritt für Schritt einrichten" → FR "Configurer l'e-banking étape par étape" / EN "Set up e-banking step by step"
- "Nützliche Links" → FR "Liens utiles" / EN "Useful links"
- "Zur Support und Hilfe-Seite" → FR "Vers la page d'aide et de support" / EN "To support and help page"
- "So erkennen Sie Betrugsmaschen im E-Banking" → FR "Comment détecter les fraudes dans l'e-banking" / EN "How to detect e-banking scams"
- "Unser Support" → FR "Notre support" / EN "Our support"
- "Wir rufen Sie an, wann es Ihnen am besten passt:" → FR "Nous vous appelons au moment qui vous convient le mieux:" / EN "We'll call you when it suits you best:"
- "Telefontermin vereinbaren" → FR "Prendre rendez-vous téléphonique" / EN "Schedule a phone appointment"
- "Montag bis Freitag" → FR "Lundi à vendredi" / EN "Monday to Friday"
- "08:00 bis 20:00 Uhr" → FR "08h00 à 20h00" / EN "8:00 to 20:00"
- "Samstag" → FR "Samedi" / EN "Saturday"
- "09:00 bis 16:00 Uhr" → FR "09h00 à 16h00" / EN "9:00 to 16:00"
- Footer-Überschriften: "Anschrift/Bankdaten/Schnellzugriff/Social Media" → FR "Adresse/Coordonnées bancaires/Accès rapide/Médias sociaux" / EN "Address/Bank details/Quick access/Social media"
- "Postfach" → FR "Case postale" / EN "PO Box"
- "Offene Stellen" → FR "Postes vacants" / EN "Job openings"
- "Medien" → FR "Médias" / EN "Media"
- "Glossar" → FR "Glossaire" / EN "Glossary"
- "Support und Hilfe" → FR "Support et aide" / EN "Support and help"
- "Rechtliche Hinweise" → FR "Mentions légales" / EN "Legal notice"
- "Datenschutz" → FR "Protection des données" / EN "Data protection"
- Page-Title via `usePageMeta` → `${t.meinPortal} – BEKB | BCBE` je nach Sprache.

### 2. Verlinkungen (alle `target="_blank" rel="noopener noreferrer"`)
- Geschäftsbedingungen → `http://www.bekb.ch/de/bekb-ebanking.vertragsgrundlagen.pdf`
- E-Banking Schritt für Schritt einrichten → `#` (unverändert)
- Zur Support und Hilfe-Seite → `https://www.bekb.ch/de/services/support/ebanking-app`
- So erkennen Sie Betrugsmaschen → `#` (unverändert)
- Telefontermin vereinbaren → `https://www.bekb.ch/de/rueckruf-buchen`
- "Telefon 031 666 18 80" → entfernen (gesamter `<p>`)
- Offene Stellen → `https://www.bekb.ch/de/die-bekb/arbeitgeberin/stellen`
- Medien → `https://www.bekb.ch/de/die-bekb/publikationen/medienmitteilungen`
- Glossar → `https://www.bekb.ch/de/glossar`
- Support und Hilfe → `https://www.bekb.ch/de/services/support`
- YouTube Icon → `https://www.youtube.com/user/bekbbcbe`
- Xing Icon → `https://www.xing.com/companies/bernerkantonalbankag`
- Rechtliche Hinweise → `https://www.bekb.ch/-/media/bekb/portal/documents/legal/disclaimer.pdf?la=de&vs=2`
- Datenschutz → `https://www.bekb.ch/-/media/bekb/portal/documents/legal/datenschutz.pdf?la=de&vs=1`
