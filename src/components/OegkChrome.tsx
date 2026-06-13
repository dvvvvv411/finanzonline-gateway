import {
  ChevronDown, Search, Contrast,
  Youtube, Facebook, Instagram, Linkedin, ChevronUp,
} from "lucide-react";
import oegkLogo from "@/assets/oegk-logo.png";

const OEGK_GREEN = "#00B050";
const OEGK_NAVY = "#1B2C5C";

export const OegkHeader = () => (
  <header className="bg-white border-b border-gray-200">
    {/* Utility-Leiste */}
    <div className="bg-[#F4F6F8] border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-stretch justify-between h-11 text-[12px]">
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Kontrast"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-200"
            style={{ color: OEGK_NAVY }}
          >
            <Contrast className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-stretch">
          <a
            href="https://www.oegk.at/cdscontent/?contentid=10007.867381&portal=oegkportal"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center px-4 font-semibold transition-colors hover:text-[#00B050]"
            style={{ color: OEGK_NAVY }}
          >
            Über die ÖGK
          </a>
          <a
            href="https://www.oegk.at/cdscontent/?contentid=10007.867380&portal=oegkportal"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center px-4 font-semibold transition-colors hover:text-[#00B050]"
            style={{ color: OEGK_NAVY }}
          >
            Kontakt
          </a>
          <button
            type="button"
            className="hidden md:inline-flex items-center gap-2 px-4 font-semibold text-white"
            style={{ backgroundColor: OEGK_NAVY }}
          >
            <span className="opacity-80">GRUPPE:</span>
            <span>VERSICHERTE</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <a
            href="https://www.meineoegk.at"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 sm:px-6 font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: OEGK_GREEN }}
          >
            Meine ÖGK
          </a>
        </div>
      </div>
    </div>

    {/* Hauptheader */}
    <div className="container mx-auto px-4 flex items-center justify-between py-5 gap-6">
      <a href="https://www.oegk.at/" target="_blank" rel="noopener noreferrer" className="shrink-0">
        <span className="sr-only">Österreichische Gesundheitskasse</span>
        <img src={oegkLogo} alt="Österreichische Gesundheitskasse" className="h-12 md:h-14" />
      </a>

      <nav className="hidden lg:flex items-center gap-10">
        {[
          { top: "GESUNDHEITS", bottom: "EINRICHTUNGEN", href: "https://www.oegk.at/cdscontent/?contentid=10007.823526&portal=oegkportal" },
          { top: "GESUNDHEITS", bottom: "LEISTUNGEN", href: "https://www.oegk.at/cdscontent/?contentid=10007.823522&portal=oegkportal" },
          { top: "GESUND", bottom: "LEBEN", href: "https://www.oegk.at/cdscontent/?contentid=10007.823527&portal=oegkportal" },
        ].map((item) => (
          <a
            key={item.bottom}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center leading-tight group"
          >
            <div className="text-[11px] font-semibold tracking-wider text-gray-500 group-hover:text-[#00B050] transition-colors">
              {item.top}
            </div>
            <div className="text-[15px] font-bold tracking-wide transition-colors group-hover:text-[#00B050]" style={{ color: OEGK_NAVY }}>
              {item.bottom}
            </div>
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Suche"
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
        style={{ color: OEGK_NAVY }}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
    <div className="h-[3px] w-full" style={{ backgroundColor: OEGK_GREEN }} />
  </header>
);

export const OegkFooter = () => (
  <footer style={{ backgroundColor: "#001e50", color: "#ffffff" }}>
    <div className="h-[3px] w-full" style={{ backgroundColor: OEGK_GREEN }} />
    <div className="container mx-auto px-4 pt-10 pb-12">
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Nach oben"
          className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-white hover:text-[#001e50]"
          style={{ borderColor: "#ffffff", color: "#ffffff" }}
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-center mb-5">
        <img src={oegkLogo} alt="Österreichische Gesundheitskasse" className="h-14" style={{ filter: "brightness(0) invert(1)" }} />
      </div>

      <div className="text-center text-[13px] mb-10" style={{ color: "#ffffff" }}>
        <div className="font-semibold">Österreichische Gesundheitskasse</div>
        <div>Wienerbergstraße 15-19</div>
        <div>1100 Wien</div>
        <div>Tel. +43 5 0766-0</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-10 text-[12px] font-semibold tracking-wider">
        <ul className="space-y-2 text-center md:text-left">
          <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.866023&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>Impressum</a></li>
          <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.891161&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>Datenschutz</a></li>
          <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.871009&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>Barrierefreiheits­erklärung</a></li>
          <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.866036&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>Technischer Support</a></li>
        </ul>
        <ul className="space-y-2 text-center">
          <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.867381&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>Über die ÖGK</a></li>
          <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.866035&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>Sitemap</a></li>
          <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.867380&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>Kontakt</a></li>
        </ul>
        <ul className="space-y-2 text-center md:text-right">
          <li><a href="https://www.oegk.at/cdscontent/?contentid=10007.879637&portal=oegkportal" target="_blank" rel="noopener noreferrer" className="uppercase transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>Presse</a></li>
          <li><a href="https://www.gesundheitskasse.at/karriere" target="_blank" rel="noopener noreferrer" className="uppercase transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>Jobbörse</a></li>
        </ul>
      </div>

      <div className="flex justify-center gap-8">
        <a href="https://www.youtube.com/@oegk_at" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>
          <Youtube className="w-7 h-7" strokeWidth={1.6} />
        </a>
        <a href="https://www.facebook.com/oegk.at" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>
          <Facebook className="w-7 h-7" strokeWidth={1.6} />
        </a>
        <a href="https://www.instagram.com/oegk_at/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>
          <Instagram className="w-7 h-7" strokeWidth={1.6} />
        </a>
        <a href="https://www.linkedin.com/company/oesterreichische-gesundheitskasse/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-opacity hover:opacity-80" style={{ color: "#ffffff" }}>
          <Linkedin className="w-7 h-7" strokeWidth={1.6} />
        </a>
      </div>
    </div>
  </footer>
);
