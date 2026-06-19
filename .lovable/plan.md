Fix in `src/pages/ChAargauischeKantonalbank.tsx`:

- `min-h-screen` von `<main>` entfernen (Zeile 191 zurück zu `flex-1 w-full`).
- Stattdessen den Root-Wrapper so layouten, dass **Header + Main + dunkelblauer Footer** zusammen exakt `100vh` ergeben und der **graue Sub-Footer** direkt darunter liegt (also erst beim Scrollen sichtbar).
- Umsetzung: Root-Container bekommt `min-h-screen flex flex-col`. Der dunkelblaue `<footer>` bleibt im normalen Flow. `<main>` bekommt `flex-1`, damit es den Raum bis zum blauen Footer ausfüllt und diesen an die Viewport-Unterkante drückt. Der graue Sub-Footer steht außerhalb dieses 100vh-Blocks → unter dem Fold.
- Technisch: Wrapper-Struktur ändern zu
  ```
  <div className="min-h-screen flex flex-col">
    <header />
    <main className="flex-1" />
    <footer className="..." />  // blau, schließt 100vh ab
  </div>
  <div>...grauer Sub-Footer...</div>   // außerhalb, erst beim Scrollen sichtbar
  ```
- Wenn das aktuelle Root-Element bereits genau diese Struktur hat, reicht es, das `min-h-screen` von `<main>` zu entfernen und den grauen Sub-Footer aus dem `min-h-screen`-Wrapper herauszuziehen (als Geschwister-Div dahinter).