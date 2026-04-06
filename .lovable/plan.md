
## Fix: Bank Dropdown schließt sich beim Klick ins Eingabefeld

### Problem
Der `PopoverTrigger` mit `asChild` macht das gesamte `<div>` zum Trigger. Klickt man auf das Input-Feld, toggelt Radix den Popover (öffnet und schließt sofort wieder). Nur der Icon-Bereich funktioniert zufällig, weil dort kein Focus-Event konkurriert.

### Lösung in `src/pages/Index.tsx`

**Den Popover nicht mehr über den Trigger toggeln lassen**, sondern komplett manuell steuern:

1. `PopoverTrigger` entfernen oder durch ein normales `<div>` ersetzen (kein `asChild` Trigger mehr)
2. `Popover` behält `open={bankOpen}` und `onOpenChange` — aber `onOpenChange` soll nur schließen wenn man außerhalb klickt (das macht Radix automatisch)
3. Das `<div>` mit dem Input bekommt nur `onClick={() => setBankOpen(true)}` und `onFocus` auf dem Input öffnet ebenfalls
4. Alternativ einfacher: `PopoverTrigger` behalten, aber `onClick` auf dem Input mit `e.stopPropagation()` versehen, damit der Trigger-Toggle nicht ausgelöst wird — und das Input öffnet den Popover selbst via `setBankOpen(true)`

**Gewählter Ansatz**: `e.stopPropagation()` auf dem `<input>` Element hinzufügen, damit Klicks aufs Input nicht den Trigger-Toggle auslösen. Der Input öffnet den Popover über seinen eigenen `onFocus`/`onClick` Handler.
