import { useEffect } from "react";
import {
  Home, Landmark, IdCard, CalendarClock,
  FileEdit, ShieldCheck, Mail, Wallet,
  User, Calendar, MapPin, CreditCard, Phone, Map, Building2,
  ArrowRight, Euro, Lock,
} from "lucide-react";
import bmfLogo from "@/assets/bmf_logo.svg";
import heroAsset from "@/assets/klimabonus-hero.png.asset.json";

const MONATE = [
  "Jänner", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const JAHR = "2026";
const BMF_RED = "#E6320F";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{children}</h2>
    <div className="w-12 h-1 bg-[#E6320F] mx-auto rounded-full" />
  </div>
);

const IconBadge = ({ Icon }: { Icon: IconType }) => (
  <div
    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
    style={{ backgroundColor: BMF_RED }}
  >
    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
  </div>
);

const InfoCard = ({
  Icon, title, text,
}: { Icon: IconType; title: string; text: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8 text-center">
    <IconBadge Icon={Icon} />
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </div>
);

const Klimabonus = () => {
  const now = new Date();
  const aktuellerMonat = MONATE[now.getMonth()];
  const naechsterMonat = MONATE[(now.getMonth() + 1) % 12];

  useEffect(() => {
    document.title = `Klimabonus ${JAHR} – Voranmeldung | BMF`;
    const desc = `Klimabonus ${JAHR}: bis zu 400 € ab ${aktuellerMonat} ${JAHR}. Jetzt voranmelden beim Bundesministerium für Finanzen.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [aktuellerMonat]);

  const voraussetzungen: { Icon: IconType; title: string; text: string }[] = [
    { Icon: Home, title: "Wohnsitz", text: "Hauptwohnsitz in Österreich zum Stichtag" },
    { Icon: Landmark, title: "Bankkonto", text: "Österreichisches Bankkonto (IBAN)" },
    { Icon: IdCard, title: "SVNR", text: "Gültige Sozialversicherungsnummer" },
    { Icon: CalendarClock, title: "Frist", text: `Voranmeldung bis 31. ${aktuellerMonat} ${JAHR}` },
  ];

  const schritte: { Icon: IconType; title: string; text: string }[] = [
    { Icon: FileEdit, title: "Voranmelden", text: "Füllen Sie das Online-Formular aus" },
    { Icon: ShieldCheck, title: "Daten prüfen", text: "Wir prüfen Ihre Angaben" },
    { Icon: Mail, title: "Bestätigung", text: "Sie erhalten eine Bestätigung per E-Mail" },
    { Icon: Wallet, title: "Auszahlung", text: `Geld wird im ${naechsterMonat} überwiesen` },
  ];

  const angaben: { Icon: IconType; title: string; text: string }[] = [
    { Icon: User, title: "Name", text: "Vollständiger Vor- und Nachname" },
    { Icon: Calendar, title: "Geburtsdatum", text: "Tag, Monat und Jahr (TT.MM.JJJJ)" },
    { Icon: MapPin, title: "Adresse", text: "Straße, Hausnummer, optional Stiege und Tür" },
    { Icon: CreditCard, title: "IBAN", text: "Ihres österreichischen Bankkontos" },
    { Icon: Mail, title: "E-Mail", text: "Für Rückfragen und Bestätigung" },
    { Icon: Phone, title: "Telefon", text: "Telefonnummer für Erreichbarkeit" },
    { Icon: Map, title: "PLZ und Ort", text: "Postleitzahl und Ort" },
    { Icon: Building2, title: "Bank", text: "Auswahl aus der vorgegebenen Liste" },
  ];

  const CtaButton = () => (
    <button
      type="button"
      className="inline-flex items-center gap-2 bg-[#E6320F] hover:bg-[#c42a0d] text-white font-semibold text-base px-10 py-4 rounded-lg shadow-sm hover:shadow-md transition-all"
    >
      Jetzt voranmelden
      <ArrowRight className="w-5 h-5" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }}>
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
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroAsset.url})`, opacity: 0.12 }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-gray-50" aria-hidden="true" />
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
          <div
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: "rgba(230,50,15,0.1)", color: BMF_RED }}
          >
            Klimabonus {JAHR}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
            Klimabonus {JAHR}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Der Klimabonus kehrt zurück! Ab <span className="font-semibold">{aktuellerMonat} {JAHR}</span> erhalten Sie bis zu{" "}
            <span className="font-semibold text-[#E6320F]">400 €</span>. Melden Sie sich jetzt für die Auszahlung an.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
              <Euro className="w-6 h-6 text-[#E6320F] mx-auto mb-2" />
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Bonusbetrag</div>
              <div className="text-3xl font-bold text-gray-900">400 €</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
              <CalendarClock className="w-6 h-6 text-[#E6320F] mx-auto mb-2" />
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Gültig bis</div>
              <div className="text-3xl font-bold text-gray-900">{naechsterMonat} {JAHR}</div>
            </div>
          </div>

          <CtaButton />
        </div>
      </section>

      <main className="py-16 md:py-20 space-y-20">
        {/* Was ist der Klimabonus */}
        <section className="container mx-auto px-4 max-w-3xl text-center">
          <SectionHeading>Was ist der Klimabonus?</SectionHeading>
          <p className="text-gray-600 text-lg leading-relaxed">
            Der Klimabonus ist eine finanzielle Unterstützung der österreichischen Bundesregierung,
            die im Rahmen der ökologischen Steuerreform an alle Bürger:innen ausgezahlt wird.
          </p>
        </section>

        {/* Voraussetzungen */}
        <section className="container mx-auto px-4 max-w-4xl">
          <SectionHeading>Voraussetzungen</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {voraussetzungen.map((v) => (
              <InfoCard key={v.title} Icon={v.Icon} title={v.title} text={v.text} />
            ))}
          </div>
        </section>

        {/* So funktioniert's */}
        <section className="container mx-auto px-4 max-w-6xl">
          <SectionHeading>So funktioniert&apos;s</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schritte.map((s, i) => (
              <div
                key={s.title}
                className="relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8 text-center overflow-hidden"
              >
                <span
                  className="absolute top-2 right-3 text-6xl font-black select-none pointer-events-none"
                  style={{ color: "rgba(230,50,15,0.08)" }}
                >
                  {i + 1}
                </span>
                <IconBadge Icon={s.Icon} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Welche Angaben */}
        <section className="container mx-auto px-4 max-w-6xl">
          <SectionHeading>Welche Angaben Sie benötigen</SectionHeading>
          <p className="text-gray-600 text-lg leading-relaxed text-center max-w-2xl mx-auto mb-10 -mt-4">
            Halten Sie folgende Informationen bereit, bevor Sie das Formular ausfüllen.
            So gelingt die Voranmeldung ohne Unterbrechung.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {angaben.map((a) => (
              <InfoCard key={a.title} Icon={a.Icon} title={a.title} text={a.text} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bereit für Ihre Voranmeldung?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              In wenigen Minuten erledigt – sichern Sie sich jetzt Ihren Klimabonus.
            </p>
            <CtaButton />
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>SSL-verschlüsselt · Bundesministerium für Finanzen</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-10 text-center">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-[#E6320F] transition-colors">Impressum</a>
            <a href="#" className="text-gray-600 hover:text-[#E6320F] transition-colors">Datenschutz</a>
            <a href="#" className="text-gray-600 hover:text-[#E6320F] transition-colors">Barrierefreiheitserklärung</a>
            <a href="#" className="text-gray-600 hover:text-[#E6320F] transition-colors">Kontakt</a>
          </nav>
          <p className="text-xs text-gray-500">
            © {JAHR} Bundesministerium für Finanzen
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Klimabonus;
