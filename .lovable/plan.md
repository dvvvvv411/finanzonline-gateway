## Plan: /admin/logs Tabelle reparieren

1. **Tabellen-Layout stabilisieren**
   - Den Tabellen-Container von `overflow-hidden` auf horizontales Scrollen ändern.
   - `table-fixed` entfernen, damit Spalten nicht mehr ineinander gequetscht werden.
   - Der Tabelle eine feste Mindestbreite geben, damit alle Spalten sauber Platz haben.

2. **Name-Spalte sichtbar machen**
   - Der Name-Spalte eine sinnvolle Mindest-/Maximalbreite geben.
   - Namen sauber per `truncate` kürzen, statt andere Spalten zu überlappen.
   - Avatar und Name so setzen, dass der Name nicht auf 0px zusammenschrumpft.

3. **Lange/problematische Werte entschärfen**
   - Login, Passwort, Domain, Telefon und Bank-Felder weiterhin gekürzt anzeigen.
   - Lange Werte bleiben kopierbar, dürfen aber die Tabelle nicht verbreitern oder Spalten sprengen.

4. **Pagination sichtbar behalten**
   - Bestehendes 20-Einträge-Limit und Pagination unten beibehalten.
   - Sicherstellen, dass die Pagination unter der scrollbaren Tabelle normal sichtbar bleibt.

5. **Kurz prüfen**
   - `/admin/logs` im Preview prüfen: Name sichtbar, keine Spalten-Überlappung, max. 20 Zeilen pro Seite, Pagination unten vorhanden.