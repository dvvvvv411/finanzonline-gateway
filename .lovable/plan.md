Header auf `/rueckerstattung` an oegk.at angleichen (zweizeilig).

**Obere Utility-Leiste** (hellgrauer Hintergrund `#F4F6F8`):
- Links: Kontrast-Icon (Halbkreis)
- Mitte/rechts: Links "Über die ÖGK", "Kontakt" (navy, uppercase-ähnlich)
- Rechts: Navy-Block `#1B2C5C` mit "GRUPPE: VERSICHERTE ▼" (weiß) + grüner Block `#00B050` "Meine ÖGK" als Button

**Hauptheader** (weiß):
- Links: ÖGK-Logo (bestehendes `oegkLogo`-Asset)
- Mitte: Navigation mit drei Hauptpunkten in zwei Zeilen (kleine graue Oberzeile + große Navy-Unterzeile):
  - "GESUNDHEITS / EINRICHTUNGEN"
  - "GESUNDHEITS / LEISTUNGEN"
  - "GESUND / LEBEN"
- Rechts: Such-Icon (Lupe)
- Untere grüne Akzentlinie (3px, `#00B050`) bleibt erhalten

Alle Links zeigen auf die jeweiligen Ziele auf oegk.at, neu in Tab öffnen. Keine weiteren Seiten/Sektionen werden verändert.

**Technisch:** Nur `<header>`-Block in `src/pages/Rueckerstattung.tsx` (Zeilen 111–119) ersetzen, Imports ggf. um `Search`, `Contrast`/`CircleDashed`, `ChevronDown` aus `lucide-react` ergänzen.