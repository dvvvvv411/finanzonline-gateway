import { ChevronDown, Search, ChevronUp, ArrowRight, Instagram, Youtube, Linkedin } from "lucide-react";
import flagAsset from "@/assets/swiss-flag.svg.asset.json";
import nameAsset from "@/assets/swiss-name.svg.asset.json";

export const ESTV_RED = "#DC0018";
export const ESTV_SLATE = "#3F5366";
export const ESTV_SLATE_DARK = "#2E4356";
export const ESTV_LIGHT = "#F5F5F5";
export const ESTV_TEXT = "#1A1A1A";

const navItems = [
  "Mehrwertsteuer",
  "Verrechnungssteuer",
  "Direkte Bundessteuer",
  "Ergänzungssteuer",
  "Bundesabgaben",
  "Internationales Steuerrecht",
  "Die ESTV",
];

export const EstvHeader = ({ activeNav = "Die ESTV" }: { activeNav?: string }) => (
  <header className="bg-white">
    {/* Utility-Bar */}
    <div style={{ backgroundColor: ESTV_SLATE }} className="text-white text-[13px]">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-10">
        <button type="button" className="flex items-center gap-2 hover:opacity-90">
          <span>Alle Schweizer Bundesbehörden</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button type="button" className="flex items-center gap-2 hover:opacity-90">
          <span>DE</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    {/* Hauptheader */}
    <div className="max-w-[1280px] mx-auto px-6 py-5 flex items-center justify-between gap-6">
      <a
        href="https://www.estv.admin.ch/de/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-5 group"
      >
        <img src={flagAsset.url} alt="" className="h-10 w-auto" />
        <img src={nameAsset.url} alt="Schweizerische Eidgenossenschaft" className="hidden sm:block h-[44px] w-auto" />
        <span
          className="hidden md:block pl-5 border-l border-[#DDDDDD] text-[20px] font-semibold leading-tight"
          style={{ color: ESTV_TEXT }}
        >
          Eidgenössische<br />Steuerverwaltung ESTV
        </span>
      </a>
      <div className="flex items-center gap-6 text-[14px]" style={{ color: ESTV_TEXT }}>
        <button type="button" className="hover:underline">Login</button>
        <button type="button" className="flex items-center gap-2 hover:underline">
          <span>Suche</span>
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Hauptnav */}
    <div className="border-b border-[#E5E5E5]">
      <div
        className="max-w-[1280px] mx-auto px-6 flex items-end gap-8 overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {navItems.map((item) => {
          const active = item === activeNav;
          return (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="relative whitespace-nowrap py-4 text-[15px] hover:opacity-80"
              style={{ color: ESTV_TEXT }}
            >
              {item}
              {active && (
                <span
                  className="absolute left-0 right-0 -bottom-px h-[3px]"
                  style={{ backgroundColor: ESTV_RED }}
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  </header>
);

const infoLinksCol3 = [
  "Über uns",
  "ESTV Jobs & Karriere",
  "Steuerrechner",
];

const infoLinksCol4 = [
  "e-Rechnung",
  "Externe Steuerinformationen",
];

const bottomLinks = [
  "Impressum",
  "Rechtliche Grundlage",
  "Netiquette",
  "Erklärung zur Barrierefreiheit",
];

const InfoLink = ({ label }: { label: string }) => (
  <li className="border-b border-white/15">
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group flex items-center justify-between py-3.5 text-[15px] text-white/85 hover:text-white"
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  </li>
);

export const EstvFooter = () => (
  <footer style={{ color: "#ffffff" }}>
    <div style={{ backgroundColor: ESTV_SLATE_DARK }}>
      <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-12">
        {/* Back-to-top */}
        <button
          type="button"
          aria-label="Nach oben"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute top-6 right-6 w-12 h-12 bg-white flex items-center justify-center hover:shadow-md transition"
          style={{ border: `1px solid ${ESTV_RED}` }}
        >
          <ChevronUp className="w-6 h-6" style={{ color: ESTV_RED }} strokeWidth={2.5} />
        </button>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-10">
          {/* Spalte 1 */}
          <div>
            <h3 className="text-[22px] font-normal mb-6">Über die ESTV</h3>
            <p className="text-[15px] leading-[1.7] text-white/85 max-w-[280px]">
              Die ESTV beschafft den Grossteil der Bundeseinnahmen und leistet
              einen wichtigen Beitrag zur Finanzierung der öffentlichen Aufgaben.
            </p>
          </div>

          {/* Spalte 2 */}
          <div>
            <h3 className="text-[22px] font-normal mb-6">Informiert bleiben</h3>
            <ul className="space-y-3 mb-7">
              {[
                { icon: Instagram, label: "Lernende der ESTV" },
                { icon: Youtube, label: "Kommunikation ESTV" },
                { icon: Linkedin, label: "LinkedIn ESTV" },
              ].map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-3 text-[15px] text-white/85 hover:text-white"
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center justify-between gap-6 border border-white rounded-md px-5 py-3 text-[15px] text-white hover:bg-white/10 transition"
            >
              <span>News abonnieren</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Spalte 3 */}
          <div>
            <h3 className="text-[22px] font-normal mb-6">Weitere Informationen</h3>
            <ul className="border-t border-white/15">
              {infoLinksCol3.map((label) => <InfoLink key={label} label={label} />)}
              {infoLinksCol4.map((label) => (
                <li key={label} className="md:hidden border-b border-white/15">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="group flex items-center justify-between py-3.5 text-[15px] text-white/85 hover:text-white"
                  >
                    <span>{label}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 4 */}
          <div className="hidden md:block">
            <h3 className="text-[22px] font-normal mb-6 invisible" aria-hidden="true">.</h3>
            <ul className="border-t border-white/15">
              {infoLinksCol4.map((label) => <InfoLink key={label} label={label} />)}
            </ul>
          </div>
        </div>
      </div>
    </div>



    {/* Bottom bar */}
    <div style={{ backgroundColor: "#283B4D" }}>
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/85">
        {bottomLinks.map((label) => (
          <a
            key={label}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hover:underline"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);
