## Mobile-Footer ChUrnerKantonalbank.tsx

Nur Mobile-Verhalten ändern, Desktop bleibt wie heute.

### Änderungen
- Footer-Background mobile: `bg-[#f5f5f5]`, Desktop bleibt `md:bg-white`.
- Footer-Container mobile: alles zentriert (`items-center text-center`), Reihenfolge per `flex-col-reverse`:
  - 1. Zeile (oben): Links "Nutzungsbedingungen" + "Hilfe & Services" nebeneinander, zentriert (`gap-6`).
  - 2. Zeile (unten): Copyright `© 2026 Urner Kantonalbank, Altdorf`.
- Desktop bleibt unverändert: `md:flex-row md:justify-between md:text-left`, Copyright links, Links rechts.

Nur `src/pages/ChUrnerKantonalbank.tsx` betroffen.
