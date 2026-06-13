# Rückerstattung Hero – Bild als Background

Hero-Layout von Klimabonus 1:1 übernehmen: zentrierter Text + Statuskarte, das ÖGK-Foto als ganzflächiges Background-Bild mit Opazität und weißem Verlauf darüber.

## Änderungen in `src/pages/Rueckerstattung.tsx`

- Importe `googlePlay`/`appStore`/Footer-Imports bleiben; das zweispaltige Grid-Layout wird entfernt.
- Hero-Section wird auf Klimabonus-Muster umgestellt:
  - `<section class="relative overflow-hidden border-b border-gray-200 bg-white">`
  - Background-Layer: `<div class="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: url(${oegkHero.url}), opacity: 0.7 }} />`
  - Overlay-Layer: `<div class="absolute inset-0 bg-gradient-to-b from-white/30 via-white/40 to-gray-50/80" />`
  - Innencontainer `relative container mx-auto px-4 py-14 md:py-16 text-center max-w-3xl` mit Kicker, H1, Subtext, Statuskarte (unverändert), CTA-Button und SSL-Hinweis – alles wie vorher in zentriertem Stack, analog Klimabonus.
- `© ÖGK`-Badge oben rechts in der Hero-Section (absolut positioniert), um den ÖGK-Bildcredit korrekt darzustellen.
- Footer (oegk.at-Nachbau) bleibt unverändert.

## Geänderte Dateien

- edit: `src/pages/Rueckerstattung.tsx` (nur Hero-Section)
