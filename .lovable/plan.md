## Terminbestätigung im Email-Template ergänzen

In `src/pages/AdminEmailSpoof.tsx` im `defaultHtmlTemplate` direkt nach der Hinweisbox (vor dem "Ihr Guthaben…"-Absatz) eine neue Termin-Card einfügen:

- Weißer Kasten mit grünem Rand links (`#2e7d32`), heller Hintergrund (`#f3f8f4`)
- Überschrift "Ihr Termin zur Legitimierung"
- Datum/Uhrzeit fett: **17.10.2026, 10:30 Uhr**
- Filiale: **UniCredit Bank Austria – Filiale Wels**, Dr.-Salzmann-Straße 9, 4600 Wels, Österreich
- Hinweis: Bitte amtlichen Lichtbildausweis mitbringen.

Inline-styled, Tabellen-basiert, gleicher Stil wie die bestehende Hinweisbox. Da `STORAGE_KEY` (`admin_email_spoof_html_v4`) beim bestehenden Wert hängt, bekommen aktuelle Nutzer das neue Default nur nach Reset — daher zusätzlich `STORAGE_KEY` auf `_v5` hochziehen, damit alle die neue Vorlage sehen.

Keine weiteren Änderungen.
