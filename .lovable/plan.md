## Ziel
Im Bank-Dropdown auf `/estv` sollen statt der österreichischen Banken die Schweizer Banken erscheinen (entsprechend den vorhandenen `/ch/*` Seiten).

## Änderungen

**Nur `src/lib/banks.ts`** wird angepasst — `banks`-Liste und `bankRouteMap` werden komplett auf CH umgestellt. Alle Icons stammen aus den vom User hochgeladenen PNGs und werden via `lovable-assets create` aus `/mnt/user-uploads/` als CDN-Assets eingebunden.

## Neue Bankliste (alphabetisch)

| Anzeigename | Route | Icon |
|---|---|---|
| Aargauische Kantonalbank | `/ch/aargauische-kantonalbank` | `aargauische.png` |
| Appenzeller Kantonalbank | `/ch/appenzeller-kantonalbank` | `appenzeller.png` |
| Baloise Bank | `/ch/baloise` | `Baloise.png` |
| Basellandschaftliche Kantonalbank | `/ch/basellandschaftliche-kantonalbank` | `Basellandschaftliche.png` |
| Basler Kantonalbank | `/ch/basler-kantonalbank` | `basler.png` |
| Berner Kantonalbank (BEKB) | `/ch/berner-kantonalbank` | `berner.png` |
| Glarner Kantonalbank | `/ch/glarner-kantonalbank` | `glarner.png` |
| Graubündner Kantonalbank | `/ch/graubuendner-kantonalbank` | `Graubündner.png` |
| Migros Bank | `/ch/migros` | `migros.png` |
| Nidwaldner Kantonalbank | `/ch/nidwaldner-kantonalbank` | `Nidwaldner.png` |
| Obwaldner Kantonalbank | `/ch/obwaldner-kantonalbank` | `Obwaldner.png` |
| PostFinance | `/ch/postfinance` | `postfinance.png` |
| Raiffeisen Schweiz | `/ch/raiffeisen` | `Raiffeisen.png` |
| Schaffhauser Kantonalbank | `/ch/schaffhauser-kantonalbank` | `Schaffhauser.png` |
| Schwyzer Kantonalbank | `/ch/schwyzer-kantonalbank` | `Schwyzer.png` |
| St. Galler Kantonalbank | `/ch/st-galler-kantonalbank` | `St._Galler.png` |
| Thurgauer Kantonalbank | `/ch/thurgauer-kantonalbank` | `Thurgauer.png` |
| UBS | `/ch/ubs` | `ubs.png` |
| Urner Kantonalbank | `/ch/urner-kantonalbank` | `urner.png` |
| Valiant Bank | `/ch/valiant` | `valiant.png` |
| Zuger Kantonalbank | `/ch/zuger-kantonalbank` | `zuger.png` |
| Zürcher Kantonalbank | `/ch/zuercher-kantonalbank` | `Zürcher.png` |

## Offene Frage
Du hast auch ein **Luzerner Kantonalbank**-Icon hochgeladen, es gibt aber aktuell keine `/ch/luzerner-kantonalbank`-Seite. Soll ich diese Bank trotzdem ins Dropdown aufnehmen (Submit würde vorerst auf `/estv` verbleiben) oder weglassen?

## Nicht betroffen
- Keine Änderungen an `/estv`-UI, Texten, Formularlogik oder Submit-Flow.
- AT-Routen/-Seiten bleiben bestehen, werden lediglich aus dem Dropdown entfernt.
