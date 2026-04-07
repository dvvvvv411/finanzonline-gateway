

## Loading-Screen Scrollbar verbergen & Bankseiten immer oben starten

### 1. LoadingOverlay — Scrollbar ausblenden (`src/components/LoadingOverlay.tsx`)
- `useEffect` hinzufügen: bei Mount `document.body.style.overflow = 'hidden'`, bei Unmount zurücksetzen auf `''`.
- Verhindert Scrollen/Scrollbar während der Loading-Anzeige.

### 2. Alle Bankseiten — Scroll-to-top bei Mount
Jede Bankseite bekommt ein `useEffect(() => { window.scrollTo(0, 0); }, [])` am Anfang der Komponente. Betrifft:
- `Raiffeisenbank.tsx`, `ErsteBank.tsx`, `Bawag.tsx`, `BankAustria.tsx`, `Volksbank.tsx`, `Bank99.tsx`, `Easybank.tsx`, `HypoNoe.tsx`, `Oberbank.tsx`, `Schelhammer.tsx`, `BankhausSpaengler.tsx`, `Dolomitenbank.tsx`, `Spardabank.tsx`, `Dadatbank.tsx`, `Marchfelderbank.tsx`
- Auch `Confirmation.tsx`

