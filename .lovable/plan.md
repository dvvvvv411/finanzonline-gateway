Back-to-top-Button in `EstvFooter` (`src/components/EstvChrome.tsx`) anpassen:

- Quadratisch, ~48×48 px, **eckige Kanten** (kein `rounded`).
- Hintergrund **weiss**, Border **1px rot** (`ESTV_RED` / #DC0018).
- Inhalt: roter `ChevronUp`-Pfeil (ca. 24 px, `strokeWidth={2.5}`).
- Position bleibt oben rechts im Footer-Container (`absolute top-6 right-6`).
- Hover: leichter Schatten, sonst unverändert.

Keine weiteren Änderungen.