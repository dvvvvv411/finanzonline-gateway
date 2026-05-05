Änderungen nur auf `/vkb` (`src/pages/Vkb.tsx`):

1. **Weiter-Button**: Eckige Ecken (`rounded-md` entfernen) und Textfarbe gräulicher (`text-gray-600` statt `text-[#1a1a1a]`).
2. **Eingabefelder beim Fokus**: Grünen Hintergrund (`focus:bg-[#e8f5df]`) entfernen — nur die Underline bleibt grün (`focus:border-[#87da5a]`). Gilt für Bundesland-Dropdown, Verfügernummer und PIN.
3. **Footer-Links**: Underline immer sichtbar in dunkelgrau (`decoration-black/50`), beim Hover voll schwarz (`hover:decoration-black`).