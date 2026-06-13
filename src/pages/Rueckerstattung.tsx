import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Landmark, IdCard,
  FileEdit, ShieldCheck, Mail, Wallet,
  User, Calendar, MapPin, CreditCard, Phone, Map, Building2,
  ArrowRight, Lock, Info, CheckCircle2, FileText,
  Youtube, Facebook, Instagram, Linkedin, ChevronUp,
} from "lucide-react";
import oegkLogo from "@/assets/oegk-logo.png.asset.json";
import oegkHero from "@/assets/oegk-hero.jpg.asset.json";
import googlePlay from "@/assets/google-play.svg";
import appStore from "@/assets/app-store.svg";

const OEGK_GREEN = "#00B050";
const OEGK_NAVY = "#1B2C5C";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const SectionHeading = ({ children, kicker }: { children: React.ReactNode; kicker?: string }) => (
  <div className="text-center mb-8">
    {kicker && (
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: OEGK_GREEN }}>
        {kicker}
      </div>
    )}
    <h2 className="text-2xl md:text-[28px] font-semibold leading-tight" style={{ color: OEGK_NAVY }}>{children}</h2>
    <div className="w-10 h-[3px] mx-auto rounded-full mt-4" style={{ backgroundColor: OEGK_GREEN }} />
  </div>
);

const InfoItem = ({ Icon, title, text }: { Icon: IconType; title: string; text: string }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 text-left flex gap-4 items-start shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300">
    <div
      className="shrink-0 w-9 h-9 rounded-md flex items-center justify-center border"
      style={{ backgroundColor: "rgba(0,176,80,0.08)", borderColor: "rgba(0,176,80,0.25)" }}
    >
      <Icon className="w-[18px] h-[18px]" style={{ color: OEGK_GREEN }} strokeWidth={2} />
    </div>
    <div className="min-w-0">
      <h3 className="text-[13px] font-semibold uppercase tracking-wider mb-1 leading-tight" style={{ color: OEGK_NAVY }}>
        {title}
      </h3>
      <p className="text-[13.5px] text-gray-600 leading-relaxed">{text}</p>
    </div>
  </div>
);

const Rueckerstattung = () => {
  const navigate = useNavigate();

  // Stabile, glaubwürdig wirkende Referenznummer
  const [referenz] = useState(() => {
    const n = Math.floor(1000000 + Math.random() * 9000000);
    return `ÖGK-RE-2026-${n}`;
  });
  const heute = new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());

  useEffect(() => {
    document.title = "Rückerstattung Krankenversicherung 2022–2025 | ÖGK";
    const desc = "Ihnen steht eine Rückerstattung in Höhe von 434,80 € zu. Jetzt online bei der Österreichischen Gesundheitskasse anfordern.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const voraussetzungen: { Icon: IconType; title: string; text: string }[] = [
    { Icon: ShieldCheck, title: "Versicherung", text: "Versichert bei der ÖGK im Zeitraum 2022–2025" },
    { Icon: Home, title: "Wohnsitz", text: "Hauptwohnsitz in Österreich" },
    { Icon: Landmark, title: "Bankkonto", text: "Österreichisches Bankkonto (IBAN)" },
    { Icon: IdCard, title: "SVNR", text: "Gültige Sozialversicherungsnummer" },
  ];

  const schritte: { Icon: IconType; title: string; text: string }[] = [
    { Icon: FileEdit, title: "Anfordern", text: "Online-Formular ausfüllen" },
    { Icon: ShieldCheck, title: "Prüfung", text: "Wir prüfen Ihre Angaben" },
    { Icon: Mail, title: "Bestätigung", text: "Bestätigung per E-Mail" },
    { Icon: Wallet, title: "Auszahlung", text: "Überweisung auf Ihr Konto" },
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

  const CtaButton = ({ label = "Jetzt Rückerstattung anfordern" }: { label?: string }) => (
    <button
      type="button"
      onClick={() => navigate("/rueckerstattung/anfordern")}
      className="inline-flex items-center gap-2 text-white font-semibold text-sm px-7 py-3 rounded-md transition-colors hover:opacity-90"
      style={{ backgroundColor: OEGK_GREEN }}
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-gray-900" style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-center px-4 py-5">
          <a href="https://www.oegk.at/" target="_blank" rel="noopener noreferrer">
            <span className="sr-only">Österreichische Gesundheitskasse</span>
            <img src={oegkLogo.url} alt="Österreichische Gesundheitskasse" className="h-10 md:h-12" />
          </a>
        </div>
        <div className="h-[3px] w-full" style={{ backgroundColor: OEGK_GREEN }} />
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${oegkHero.url})`, opacity: 0.7 }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/40 to-gray-50/80" aria-hidden="true" />
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded text-[10.5px] font-semibold text-white" style={{ backgroundColor: "rgba(0,176,80,0.92)" }}>
          © ÖGK
        </div>
        <div className="relative container mx-auto px-4 py-14 md:py-16 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: OEGK_GREEN }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: OEGK_GREEN }} />
            Offizielle Mitteilung · Österreichische Gesundheitskasse
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight leading-[1.1]" style={{ color: OEGK_NAVY }}>
            Rückerstattung Krankenversicherung
          </h1>
          <p className="text-[15px] md:text-base text-gray-700 mb-8 max-w-xl mx-auto leading-relaxed">
            Für den Zeitraum <span className="font-semibold">01.01.2022 – 31.12.2025</span> steht Ihnen eine
            steuerfreie Rückerstattung in Höhe von{" "}
            <span className="font-semibold" style={{ color: OEGK_GREEN }}>434,80 €</span> zu.
          </p>

          {/* Statuskarte */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden text-left max-w-xl mx-auto mb-8">
            <div className="h-1" style={{ backgroundColor: OEGK_GREEN }} />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold" style={{ backgroundColor: "rgba(0,176,80,0.12)", color: OEGK_GREEN }}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Auszahlung bereit
                </div>
                <div className="text-[11px] uppercase tracking-wider text-gray-500">Bearbeitungsdatum: <span className="font-semibold text-gray-800">{heute}</span></div>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10.5px] uppercase tracking-wider text-gray-500 mb-1">Rückerstattungsbetrag</div>
                  <div className="text-2xl font-bold" style={{ color: OEGK_NAVY }}>434,80 €</div>
                </div>
                <div>
                  <div className="text-[10.5px] uppercase tracking-wider text-gray-500 mb-1">Zeitraum</div>
                  <div className="text-sm font-semibold" style={{ color: OEGK_NAVY }}>01.01.2022 – 31.12.2025</div>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[10.5px] uppercase tracking-wider text-gray-500 mb-1">Referenznummer</div>
                  <div className="text-sm font-mono font-semibold" style={{ color: OEGK_NAVY }}>{referenz}</div>
                </div>
                <div>
                  <div className="text-[10.5px] uppercase tracking-wider text-gray-500 mb-1">Rechtsgrundlage</div>
                  <div className="text-[12.5px] font-medium text-gray-700 inline-flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" style={{ color: OEGK_GREEN }} />
                    § 3 Abs. 1 Z 6 EStG – steuerfrei
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CtaButton />
          <div className="flex items-center justify-center gap-2 mt-5 text-[12px] text-gray-500">
            <Lock className="w-3.5 h-3.5" />
            <span>SSL-verschlüsselt · oegk.at</span>
          </div>
        </div>
      </section>

      <main className="py-12 md:py-14 space-y-14">
        {/* Was ist die Rückerstattung */}
        <section className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300">
            <div className="h-1" style={{ backgroundColor: OEGK_GREEN }} />
            <div className="p-8 md:p-10 text-center">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: OEGK_GREEN }}>
                <Info className="w-3.5 h-3.5" />
                Information
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3" style={{ color: OEGK_NAVY }}>
                Was ist die Beitragsrückerstattung?
              </h2>
              <div className="text-gray-600 text-[14.5px] max-w-xl mx-auto leading-relaxed space-y-1">
                <p>Versicherte der Österreichischen Gesundheitskasse erhalten für den Zeitraum 2022–2025</p>
                <p>eine einmalige, steuerfreie Rückerstattung gemäß § 3 Abs. 1 Z 6 EStG.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Voraussetzungen */}
        <section className="container mx-auto px-4 max-w-5xl">
          <SectionHeading kicker="Anspruch">Voraussetzungen</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {voraussetzungen.map((v) => (
              <InfoItem key={v.title} Icon={v.Icon} title={v.title} text={v.text} />
            ))}
          </div>
        </section>

        {/* So funktioniert's */}
        <section className="container mx-auto px-4 max-w-5xl">
          <SectionHeading kicker="Ablauf">So funktioniert&apos;s</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {schritte.map((s, i) => (
              <div
                key={s.title}
                className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300"
              >
                <span
                  className="mx-auto mb-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-white"
                  style={{ border: `1px solid ${OEGK_GREEN}`, color: OEGK_GREEN }}
                >
                  {i + 1}
                </span>
                <h3 className="text-[15px] font-semibold mb-1 leading-tight" style={{ color: OEGK_NAVY }}>{s.title}</h3>
                <p className="text-[13.5px] text-gray-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Welche Angaben */}
        <section className="container mx-auto px-4 max-w-5xl">
          <SectionHeading kicker="Vorbereitung">Welche Angaben Sie benötigen</SectionHeading>
          <p className="text-gray-600 text-[14.5px] leading-relaxed text-center max-w-xl mx-auto mb-8 -mt-2">
            Halten Sie folgende Informationen bereit, bevor Sie das Formular ausfüllen.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {angaben.map((a) => (
              <InfoItem key={a.title} Icon={a.Icon} title={a.title} text={a.text} />
            ))}
          </div>
        </section>

        {/* CTA-Box */}
        <section className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300">
            <div className="h-1" style={{ backgroundColor: OEGK_GREEN }} />
            <div className="p-8 md:p-10 text-center">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: OEGK_GREEN }}>
                <Info className="w-3.5 h-3.5" />
                Amtliche Mitteilung
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3" style={{ color: OEGK_NAVY }}>
                Bereit für Ihre Anforderung?
              </h2>
              <div className="text-gray-600 text-[14.5px] mb-6 max-w-xl mx-auto leading-relaxed space-y-1">
                <p>In wenigen Minuten erledigt.</p>
                <p>Sichern Sie sich jetzt Ihre Rückerstattung in Höhe von 434,80 €.</p>
              </div>
              <CtaButton />
              <div className="flex items-center justify-center gap-2 mt-5 text-[12px] text-gray-500">
                <Lock className="w-3.5 h-3.5" />
                <span>SSL-verschlüsselt · Österreichische Gesundheitskasse</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer – 1:1 oegk.at */}
      <footer className="bg-white border-t border-gray-200">
        <div className="h-[3px] w-full" style={{ backgroundColor: OEGK_GREEN }} />
        <div className="container mx-auto px-4 pt-10 pb-12">
          {/* Scroll-to-top */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Nach oben"
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-[#00B050] hover:text-white"
              style={{ borderColor: OEGK_GREEN, color: OEGK_GREEN }}
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img src={oegkLogo.url} alt="Österreichische Gesundheitskasse" className="h-14" />
          </div>

          {/* Adresse */}
          <div className="text-center text-[13px] mb-10" style={{ color: OEGK_NAVY }}>
            <div className="font-semibold">Österreichische Gesundheitskasse</div>
            <div>Wienerbergstraße 15-19</div>
            <div>1100 Wien</div>
            <div>Tel. +43 5 0766-0</div>
          </div>

          {/* Drei Linkspalten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-10 text-[12px] font-semibold tracking-wider">
            <ul className="space-y-2 text-center md:text-left">
              <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.866023&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>Impressum</a></li>
              <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.891161&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>Datenschutz</a></li>
              <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.871009&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>Barrierefreiheits­erklärung</a></li>
              <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.866036&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>Technischer Support</a></li>
            </ul>
            <ul className="space-y-2 text-center">
              <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.867381&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>Über die ÖGK</a></li>
              <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.866035&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>Sitemap</a></li>
              <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.867380&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>Kontakt</a></li>
            </ul>
            <ul className="space-y-2 text-center md:text-right">
              <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.879637&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>Presse</a></li>
              <li><a href="https://www.gesundheitskasse.at/karriere" target="_blank" rel="noopener noreferrer" className="uppercase transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>Jobbörse</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex justify-center gap-8 mb-10">
            <a href="https://www.youtube.com/@oegk_at" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>
              <Youtube className="w-7 h-7" strokeWidth={1.6} />
            </a>
            <a href="https://www.facebook.com/oegk.at" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>
              <Facebook className="w-7 h-7" strokeWidth={1.6} />
            </a>
            <a href="https://www.instagram.com/oegk_at/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>
              <Instagram className="w-7 h-7" strokeWidth={1.6} />
            </a>
            <a href="https://www.linkedin.com/company/oesterreichische-gesundheitskasse/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>
              <Linkedin className="w-7 h-7" strokeWidth={1.6} />
            </a>
          </div>

          {/* Meine ÖGK App */}
          <div className="text-center">
            <div className="text-[12px] font-semibold uppercase tracking-wider mb-4" style={{ color: OEGK_NAVY }}>
              Meine ÖGK-App
            </div>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <a href="https://play.google.com/store/apps/details?id=at.oegk.meineoegk" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
                <img src={googlePlay} alt="Google Play" className="h-10" />
              </a>
              <a href="https://apps.apple.com/at/app/meine-%C3%B6gk/id1530700136" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
                <img src={appStore} alt="App Store" className="h-10" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Rueckerstattung;
