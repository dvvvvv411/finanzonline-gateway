Remove the extra Pencil edit button that sits next to the Type Select field in both places:
1. The "Neues Panel hinzufügen" form (add section)
2. Each row in the panels table list

Keep only the pencil icon that lives inside the dropdown items (TypeRow component).

File: src/pages/AdminPanels.tsx — delete the two `<Button ...><Pencil ... /></Button>` blocks adjacent to the `<Select>` triggers.