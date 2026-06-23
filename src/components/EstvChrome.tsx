import { ChevronDown, Search, ExternalLink } from "lucide-react";
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
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
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

export const EstvFooter = () => (
  <footer style={{ backgroundColor: ESTV_SLATE_DARK, color: "#ffffff" }}>
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      <div className="flex items-center gap-5 mb-8">
        <img src={flagAsset.url} alt="" className="h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
        <img src={nameAsset.url} alt="Schweizerische Eidgenossenschaft" className="hidden sm:block h-[44px] w-auto" style={{ filter: "brightness(0) invert(1)" }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-[14px]">
        <div>
          <div className="font-semibold mb-3">Eidgenössische Steuerverwaltung ESTV</div>
          <div className="text-white/80 leading-6">
            Eigerstrasse 65<br />
            3003 Bern<br />
            Schweiz
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Rechtliches</div>
          <ul className="space-y-2 text-white/80">
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Rechtliche Grundlagen</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Datenschutz</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Impressum</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Über uns</div>
          <ul className="space-y-2 text-white/80">
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Organisation</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Stellenangebote</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Medien</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Kontakt</div>
          <ul className="space-y-2 text-white/80">
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Kontaktformular</a></li>
            <li>Tel. +41 58 462 71 06</li>
            <li className="flex items-center gap-1">
              <a href="https://www.admin.ch" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1">
                admin.ch <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/15 text-[12px] text-white/70 flex flex-wrap items-center justify-between gap-3">
        <div>© Schweizerische Eidgenossenschaft</div>
        <div>Eidgenössisches Finanzdepartement EFD</div>
      </div>
    </div>
  </footer>
);
