# Plan: Wizard Step 1 Redesign + Footer entfernen

## Ziel
Step 1 des `/klimabonus/voranmeldung` Wizards visuell überarbeiten — 2-spaltiges Layout mit Icons pro Zeile, zentrierter Weiter-Button, Footer auf Wizard-Seiten entfernen.

## Änderungen

### 1. `src/pages/KlimabonusVoranmeldung.tsx` — Step 1 Layout

**Felder aufteilen / neu anordnen:**
- `fullName` (1 String) → in `firstName` + `lastName` aufsplitten (2 separate States). Beim Insert in `submissions` zusammensetzen: `full_name: \`${firstName} ${lastName}\``.
- Alle Felder werden in 2-Spalten-Zeilen (`grid-cols-2`) angeordnet, **Geburtsdatum bleibt volle Breite und alleine**.

**Neue Zeilen-Reihenfolge:**
| Zeile | Icon (lucide, rot `#E6320F`) | Felder |
|---|---|---|
| 1 | `User` | Vorname \| Nachname |
| 2 | `Calendar` | Geburtsdatum (volle Breite) |
| 3 | `Mail` (oder `AtSign`) | E-Mail \| Telefonnummer |
| 4 | `MapPin` | Straße \| Hausnummer |
| 5 | `DoorOpen` | Stiege \| Türnummer |
| 6 | `Building2` | PLZ \| Stadt |

**Icon-Darstellung pro Zeile** (wie im Screenshot):
- Icon links neben der Zeile, vertikal mittig zu den Inputs (nicht über dem Label).
- Layout pro Zeile: `flex items-center gap-3`, Icon-Container `w-9 h-9 rounded-md bg-[#E6320F]/10 text-[#E6320F] flex items-center justify-center shrink-0`, dann `<div class="flex-1 grid grid-cols-2 gap-4">…</div>` (bzw. `grid-cols-1` für Geburtsdatum).
- Labels bleiben über den Inputs (kleines `labelClass`).

**Weiter-Button:**
- Container `mt-8 flex justify-center` statt `justify-end`.

**Validierung anpassen:**
- `step1Valid` nutzt `firstName.trim() && lastName.trim()` statt `fullName.trim()`.

### 2. `src/components/KlimabonusWizardShell.tsx` — Footer entfernen

- Kompletten `<footer>…</footer>` Block (inkl. Rot-Weiß-Rot-Stripe, Links, Copyright) entfernen.
- Header bleibt wie er ist (weißer Header + Stripe).

## Nicht betroffen
- Step 2 (Bankdaten) unverändert.
- DB-Schema unverändert — `full_name` Spalte bleibt, wird nur clientseitig aus 2 Feldern zusammengesetzt.
- Routing, PanelProvider, Klimabonus-Hauptseite, Bestätigungsseite unverändert.

## Geänderte Dateien
- `src/pages/KlimabonusVoranmeldung.tsx`
- `src/components/KlimabonusWizardShell.tsx`
