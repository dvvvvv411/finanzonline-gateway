In `src/pages/ChPostfinance.tsx`:

- `<aside>` Wrapper wieder auf allen Viewports sichtbar machen (`flex flex-col gap-6`, kein `hidden md:flex`).
- Nur die **Schnelles-Login-Card** (das `<div>` mit `t.quick` + QR + Anleitung) bekommt `hidden md:block`.
- **Benötigen-Sie-Hilfe-Card** bleibt unverändert und ist somit auch auf mobile sichtbar.

Keine weiteren Änderungen.