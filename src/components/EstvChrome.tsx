import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, ChevronUp, ArrowRight, Instagram, Youtube, Linkedin } from "lucide-react";
import flagAsset from "@/assets/swiss-flag.svg";
import nameAsset from "@/assets/swiss-name.svg";
import { useEstvI18n, LANG_LABELS, EstvLang } from "@/components/EstvI18n";

export const ESTV_RED = "#DC0018";
export const ESTV_SLATE = "#3F5366";
export const ESTV_SLATE_DARK = "#2E4356";
export const ESTV_LIGHT = "#F5F5F5";
export const ESTV_TEXT = "#1A1A1A";

const navKeys = [
  "header.nav.mwst",
  "header.nav.vst",
  "header.nav.dbst",
  "header.nav.est",
  "header.nav.ba",
  "header.nav.intl",
  "header.nav.estv",
];

const LangSelector = () => {
  const { lang, setLang } = useEstvI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const langs: EstvLang[] = ["de", "fr", "it", "en"];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 hover:opacity-90 h-10"
      >
        <span>{LANG_LABELS[lang]}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full min-w-[80px] z-50 shadow-lg"
          style={{ backgroundColor: ESTV_SLATE }}
        >
          {langs.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-[13px] text-white hover:bg-white/10 ${
                l === lang ? "bg-white/10" : ""
              }`}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const EstvHeader = ({ activeNav = "header.nav.estv" }: { activeNav?: string }) => {
  const { t } = useEstvI18n();
  return (
    <header className="bg-white">
      {/* Utility-Bar */}
      <div style={{ backgroundColor: ESTV_SLATE }} className="text-white text-[13px]">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-10">
          <button type="button" className="flex items-center gap-2 hover:opacity-90">
            <span>{t("header.allAuthorities")}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <LangSelector />
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
          <button type="button" className="hover:underline">{t("header.login")}</button>
          <button type="button" className="flex items-center gap-2 hover:underline">
            <span>{t("header.search")}</span>
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
          {navKeys.map((key) => {
            const active = key === activeNav;
            return (
              <a
                key={key}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="relative whitespace-nowrap py-4 text-[15px] hover:opacity-80"
                style={{ color: ESTV_TEXT }}
              >
                {t(key)}
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
};

const infoLinksCol3 = ["footer.links.about", "footer.links.jobs", "footer.links.calc"];
const infoLinksCol4 = ["footer.links.einvoice", "footer.links.external"];

const bottomLinks = [
  "footer.bottom.impressum",
  "footer.bottom.legal",
  "footer.bottom.netiquette",
  "footer.bottom.accessibility",
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

export const EstvFooter = () => {
  const { t } = useEstvI18n();
  return (
    <footer style={{ color: "#ffffff" }}>
      <div style={{ backgroundColor: ESTV_SLATE_DARK }}>
        <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-12">
          {/* Back-to-top */}
          <button
            type="button"
            aria-label={t("footer.backToTop")}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute top-6 right-6 w-12 h-12 bg-white flex items-center justify-center hover:shadow-md transition"
            style={{ border: `1px solid ${ESTV_RED}` }}
          >
            <ChevronUp className="w-6 h-6" style={{ color: ESTV_RED }} strokeWidth={2.5} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-10">
            {/* Spalte 1 */}
            <div>
              <h3 className="text-[22px] font-normal mb-6">{t("footer.aboutTitle")}</h3>
              <p className="text-[15px] leading-[1.7] text-white/85 max-w-[280px]">
                {t("footer.aboutBody")}
              </p>
            </div>

            {/* Spalte 2 */}
            <div>
              <h3 className="text-[22px] font-normal mb-6">{t("footer.stayInformed")}</h3>
              <ul className="space-y-3 mb-7">
                {[
                  { icon: Instagram, key: "footer.social.apprentices" },
                  { icon: Youtube, key: "footer.social.comms" },
                  { icon: Linkedin, key: "footer.social.linkedin" },
                ].map(({ icon: Icon, key }) => (
                  <li key={key}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="flex items-center gap-3 text-[15px] text-white/85 hover:text-white"
                    >
                      <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                      <span>{t(key)}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-between gap-6 border border-white rounded-md px-5 py-3 text-[15px] text-white hover:bg-white/10 transition"
              >
                <span>{t("footer.subscribe")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Spalte 3 */}
            <div>
              <h3 className="text-[22px] font-normal mb-6">{t("footer.col3Title")}</h3>
              <ul className="border-t border-white/15">
                {infoLinksCol3.map((key) => <InfoLink key={key} label={t(key)} />)}
                {infoLinksCol4.map((key) => (
                  <li key={key} className="md:hidden border-b border-white/15">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group flex items-center justify-between py-3.5 text-[15px] text-white/85 hover:text-white"
                    >
                      <span>{t(key)}</span>
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
                {infoLinksCol4.map((key) => <InfoLink key={key} label={t(key)} />)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: "#283B4D" }}>
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/85">
          {bottomLinks.map((key) => (
            <a
              key={key}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:underline"
            >
              {t(key)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
