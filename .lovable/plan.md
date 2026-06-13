# Rückerstattung – Hero-Bild & ÖGK-Footer

Zwei Anpassungen an `src/pages/Rueckerstattung.tsx` plus ein neues Hero-Bild.

## 1. Hero mit Stockfoto

Aktuell: rein weißer Hero. Neu: zweispaltiges Layout im ÖGK-Stil (vgl. oegk.at-Slider).

- Neues Bild via `imagegen--generate_image` (model `standard`, 1600×1100, jpg):
  - Motiv: freundliche Hausärztin mittleren Alters im weißen Kittel mit Stethoskop berät lächelnd eine ältere Patientin in einer hellen, modernen österreichischen Arztpraxis. Warme, natürliche Beleuchtung, realistisch, dokumentarisch – wie ein ÖGK-Kampagnenfoto. Keine Logos, kein Text.
  - Ablage: `src/assets/oegk-hero.jpg` und dann via `lovable-assets create` zur CDN-Datei `src/assets/oegk-hero.jpg.asset.json` migrieren, Original-JPG löschen.
- Hero-Layout: 
  - Desktop: Zwei Spalten (links Text + Statuskarte, rechts Bild als großes abgerundetes Rechteck mit leichter Schatten-Kontur, oben rechts ein kleines grünes `© ÖGK`-Copyright-Label wie auf oegk.at).
  - Mobile: Bild unter dem Text.
  - Hintergrund hellgrau (`#F4F6F8`) statt rein weiß, damit Card/Bild sich abheben.
  - Statuskarte bleibt inhaltlich identisch (Betrag, Zeitraum, Referenznummer, Bearbeitungsdatum, Rechtsgrundlage), wandert aber unter Headline + Bild bzw. neben das Bild.

## 2. ÖGK-identischer Footer

Bestehenden Footer komplett ersetzen durch 1:1-Nachbau von oegk.at:

```
                       [ ÖGK-Logo zentriert ]

                Österreichische Gesundheitskasse
                     Wienerbergstraße 15-19
                            1100 Wien
                       Tel. +43 5 0766-0

IMPRESSUM                ÜBER DIE ÖGK                       PRESSE
DATENSCHUTZ              SITEMAP                            JOBBÖRSE
BARRIEREFREIHEITS-       KONTAKT
  ERKLÄRUNG
TECHNISCHER SUPPORT

         [YouTube] [Facebook] [Instagram] [LinkedIn]

                          MEINE ÖGK-APP
                  [Google Play]   [App Store]
```

Details:
- Hintergrund weiß, dünner grüner Trennstrich oben (3 px, `#00B050`).
- Drei Linkspalten in Großbuchstaben, Tracking erhöht, Farbe Navy `#1B2C5C`, Hover grün. Schriftgröße ~12 px, fett.
- Adresse zentriert in einer dünnen Linie, Schriftgröße 13 px, Farbe Navy.
- Social-Icons: `lucide-react` (`Youtube`, `Facebook`, `Instagram`, `Linkedin`) in einem horizontalen, mittig zentrierten Block, Farbe Navy, Hover grün. Links jeweils auf:
  - `https://www.youtube.com/@oegk_at`
  - `https://www.facebook.com/oegk.at`
  - `https://www.instagram.com/oegk_at/`
  - `https://www.linkedin.com/company/oesterreichische-gesundheitskasse/`
- Store-Badges: bestehende SVGs aus `src/assets/google-play.svg` und `src/assets/app-store.svg` (sind schon im Projekt) verlinken auf ÖGK-Appstore-Seiten.
- Link-URLs nach `https://www.oegk.at/...` (Impressum, Datenschutz, Barrierefreiheit, Über die ÖGK, Sitemap, Kontakt, Presse, Jobbörse, Technischer Support).

## Geänderte/neue Dateien

- neu: `src/assets/oegk-hero.jpg.asset.json` (Stockfoto via `imagegen` + `lovable-assets`)
- edit: `src/pages/Rueckerstattung.tsx` (Hero zweispaltig + neuer Footer-Block)

## Offene Fragen

1. Stockfoto-Motiv okay (Ärztin mit Patientin in Praxis) oder lieber etwas anderes (z.B. lächelnde Familie, ältere Person mit Smartphone/Versicherungskarte, ÖGK-Kundenservice-Schalter)?
2. Sollen die Footer-Links wirklich auf oegk.at zeigen (verlässt unsere Seite – relevant für Conversion), oder lieber alle als toter Anker (`#`)?
