
## Marchfelder Bank zum Bank-Dropdown auf der Landingpage hinzufügen

### Datei: `src/assets/`
- `user-uploads://marchfeldericon.png` → `src/assets/marchfelder_bank.png` kopieren

### Datei: `src/pages/Index.tsx`
1. Import hinzufügen: `import marchfelderIcon from "@/assets/marchfelder_bank.png";`
2. Im `banks`-Array am Ende hinzufügen: `{ name: "Marchfelder Bank", icon: marchfelderIcon }`
