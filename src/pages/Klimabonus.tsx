import { useEffect } from "react";
import bmfLogo from "@/assets/bmf_logo.svg";
import heroAsset from "@/assets/klimabonus-hero.png.asset.json";

const MONATE = [
  "Jänner", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

const JAHR = "2026";

const Klimabonus = () => {
  const now = new Date();
  const aktuellerMonat = MONATE[now.getMonth()];
  const naechsterMonat = MONATE[(now.getMonth() + 1) % 12];

  useEffect(() => {
    document.title = `Klimabonus ${JAHR} – Voranmeldung | BMF`;
    const meta = document.querySelector('meta[name="description"]');
    const desc = `Klimabonus ${JAHR}: bis zu 400 € ab ${aktuellerMonat} ${JAHR}. Jetzt voranmelden beim Bundesministerium für Finanzen.`;
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, [aktuellerMonat]);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]" style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-center px-4 py-5">
          <a href="https://www.bmf.gv.at/public.html" target="_blank" rel="noopener noreferrer">
            <span className="sr-only">Bundesministerium für Finanzen</span>
            <img src={bmfLogo} alt="Bundesministerium für Finanzen" className="h-10 md:h-12" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroAsset.url})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/85" aria-hidden="true" />
        <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-4xl">
          <div className="inline-block bg-[#E6320F] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 mb-4">
            Bundesministerium für Finanzen
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a1a1a]">
            Klimabonus {JAHR}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
            Der Klimabonus kehrt zurück! Ab {aktuellerMonat} {JAHR} erhalten Sie bis zu 400 €.
            Melden Sie sich jetzt für die Auszahlung an.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-xl">
            <div className="bg-white border border-gray-200 p-5 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Bonusbetrag</div>
              <div className="text-3xl font-bold text-[#E6320F]">400 €</div>
            </div>
            <div className="bg-white border border-gray-200 p-5 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Gültig bis</div>
              <div className="text-3xl font-bold text-[#1a1a1a]">{naechsterMonat} {JAHR}</div>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 bg-[#E6320F] hover:bg-[#c42a0d] text-white font-semibold px-8 py-4 transition-colors"
          >
            Jetzt voranmelden
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl space-y-12">
        {/* Was ist der Klimabonus */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1a1a1a]">
            Was ist der Klimabonus?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Der Klimabonus ist eine finanzielle Unterstützung der österreichischen Bundesregierung,
            die im Rahmen der ökologischen Steuerreform an alle Bürger:innen ausgezahlt wird.
          </p>
        </section>

        {/* Voraussetzungen */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1a1a1a]">
            Voraussetzungen
          </h2>
          <ul className="space-y-3">
            {[
              ["Wohnsitz", "Hauptwohnsitz in Österreich zum Stichtag"],
              ["Bankkonto", "Österreichisches Bankkonto (IBAN)"],
              ["SVNR", "Gültige Sozialversicherungsnummer"],
              ["Frist", `Voranmeldung bis 31. ${aktuellerMonat} ${JAHR}`],
            ].map(([title, text]) => (
              <li key={title} className="flex gap-3 bg-gray-50 border border-gray-200 p-4">
                <span className="flex-shrink-0 w-6 h-6 bg-[#E6320F] text-white text-sm font-bold flex items-center justify-center mt-0.5">
                  ✓
                </span>
                <div>
                  <span className="font-semibold">{title}:</span>{" "}
                  <span className="text-gray-700">{text}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* So funktioniert's */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1a1a1a]">
            So funktioniert&apos;s
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Voranmelden", "Füllen Sie das Online-Formular aus"],
              ["Daten prüfen", "Wir prüfen Ihre Angaben"],
              ["Bestätigung", "Sie erhalten eine Bestätigung per E-Mail"],
              ["Auszahlung", `Geld wird im ${naechsterMonat} überwiesen`],
            ].map(([title, text], i) => (
              <div key={title} className="bg-white border border-gray-200 p-5 shadow-sm">
                <div className="w-10 h-10 bg-[#E6320F] text-white font-bold flex items-center justify-center mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Welche Angaben */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#1a1a1a]">
            Welche Angaben Sie benötigen
          </h2>
          <p className="text-gray-700 mb-6">
            Halten Sie folgende Informationen bereit, bevor Sie das Formular ausfüllen.
            So gelingt die Voranmeldung ohne Unterbrechung.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 bg-gray-50 border border-gray-200 p-6">
            {[
              ["Name", "Vollständiger Vor- und Nachname"],
              ["Geburtsdatum", "Tag, Monat und Jahr (TT.MM.JJJJ)"],
              ["Adresse", "Straße, Hausnummer, optional Stiege und Tür"],
              ["IBAN", "Ihres österreichischen Bankkontos"],
              ["E-Mail", "Für Rückfragen und Bestätigung"],
              ["Telefon", "Telefonnummer für Erreichbarkeit"],
              ["PLZ und Ort", "Postleitzahl und Ort"],
              ["Bank", "Auswahl aus der vorgegebenen Liste"],
            ].map(([title, text]) => (
              <div key={title} className="flex gap-2">
                <span className="text-[#E6320F] font-bold">•</span>
                <div>
                  <span className="font-semibold">{title}:</span>{" "}
                  <span className="text-gray-700">{text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#E6320F] hover:bg-[#c42a0d] text-white font-semibold px-8 py-4 transition-colors"
            >
              Jetzt voranmelden
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-sm">
            <a href="#" className="text-gray-700 hover:text-[#E6320F]">Impressum</a>
            <a href="#" className="text-gray-700 hover:text-[#E6320F]">Datenschutz</a>
            <a href="#" className="text-gray-700 hover:text-[#E6320F]">Barrierefreiheitserklärung</a>
            <a href="#" className="text-gray-700 hover:text-[#E6320F]">Kontakt</a>
          </nav>
          <p className="text-center text-xs text-gray-600">
            © {JAHR} Bundesministerium für Finanzen
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Klimabonus;
