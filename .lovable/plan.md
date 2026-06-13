# Hero-Bild auf /rueckerstattung austauschen

Hochgeladenes Foto (`Adipositas_heroslider_1969-x-680_01.jpg`) ersetzt das aktuelle KI-generierte ÖGK-Hero-Bild.

## Schritte

1. Upload via `lovable-assets create --file /mnt/user-uploads/Adipositas_heroslider_1969-x-680_01.jpg --filename oegk-hero.jpg` → schreibt neuen Pointer nach `src/assets/oegk-hero.jpg.asset.json` (überschreibt den bestehenden, alle Imports bleiben unverändert).
2. Altes CDN-Asset (`oegk-hero.jpg`, asset_id `91c8627b-...`) per `assets--delete_asset` entfernen — passiert *vor* dem Überschreiben, indem der alte Pointer kurz gesichert und gelöscht wird. Reihenfolge: erst altes Asset löschen, dann neuen Pointer schreiben.
3. Keine Code-Änderungen in `Rueckerstattung.tsx` nötig — der Import `oegkHero from "@/assets/oegk-hero.jpg.asset.json"` zeigt automatisch auf die neue URL.

## Geänderte Dateien

- edit (überschrieben): `src/assets/oegk-hero.jpg.asset.json`
