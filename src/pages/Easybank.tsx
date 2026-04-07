import { useState, useEffect, useRef, useCallback } from "react";
import { Eye, EyeOff, ChevronRight, AlertTriangle } from "lucide-react";
import easybankLogo from "@/assets/logo-easybank_de.png";
import easybankBanner from "@/assets/EASY26016_login.jpg";

type Lang = "DE" | "EN";

const translations: Record<Lang, {
  days: string[];
  hilfe: string;
  datePrefix: string;
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
}> = {
  DE: {
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    hilfe: "Hilfe",
    datePrefix: "",
    loginTitle: "Login mit Zugangsdaten",
    loginHilfe: "Hilfe",
    loginQuestion: "Melden Sie sich mit Ihren eBanking Zugangsdaten (mit Verfügernummer und PIN) oder per App (mit Verfügernummer oder email-Adresse) an.",
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
    warnungText: "Achtung vor Phishing\nWir fordern Sie niemals per E-Mail oder SMS auf, TANs, Konto- und Kreditkarten-Daten einzugeben oder zu bestätigen!",
    warnungLink: "Weiterlesen",
    hilfeTitle: "Hilfe/Hotline",
    hilfePin: "PIN vergessen oder Verfüger gesperrt?",
    hilfeFaq: "FAQ",
    infoTitle: "Info",
    infoDebit: "Bestellung PIN-Code für Debitkarte",
    infoApp: "Alle Infos zur\neasybank App",
    infoWatchlist: "Zu Watchlist Internet",
    footer: ["Impressum", "AGB", "Datenschutz", "Nutzungsbedingungen", "Barrierefrei"],
  },
  EN: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hilfe: "Help",
    datePrefix: "",
    loginTitle: "Login with access data",
    loginHilfe: "Help",
    loginQuestion: "Log in with your eBanking access data (with disposer number and PIN) or via app (with disposer number or email address).",
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
    warnungText: "Phishing alert\nWe will never ask you by email or SMS to enter or confirm TANs, account or credit card data!",
    warnungLink: "Read more",
    hilfeTitle: "Help/Hotline",
    hilfePin: "Forgot PIN or disposer locked?",
    hilfeFaq: "FAQ",
    infoTitle: "Info",
    infoDebit: "Order PIN code for debit card",
    infoApp: "All info about the\neasybank App",
    infoWatchlist: "To Watchlist Internet",
    footer: ["Imprint", "Terms and Conditions", "Data Protection", "Terms of Use", "Barrier Free"],
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

const Easybank = () => {
  const [verfueger, setVerfueger] = useState("");
  const [pin, setPin] = useState("");
  const [appInput, setAppInput] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [lang, setLang] = useState<Lang>("DE");
  const [activeTab, setActiveTab] = useState<"verfueger" | "app">("verfueger");
  const [scale, setScale] = useState(1);
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
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
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
            <div className="flex items-center justify-between">
              <img src={easybankLogo} alt="easybank" className="h-10" />
              <div className="flex items-center gap-3">
                <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#009e9a] hover:underline font-semibold">
                  {t.hilfe}
                </a>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLang("DE")}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-colors ${lang === "DE" ? "text-black underline" : "text-gray-500 hover:text-black"}`}
                  >
                    deutsch
                  </button>
                  <button
                    onClick={() => setLang("EN")}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-colors ${lang === "EN" ? "text-black underline" : "text-gray-500 hover:text-black"}`}
                  >
                    english
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-gray-500">{dateStr}</span>
            </div>
          </header>

          {/* Green divider */}
          <div className="h-[3px] bg-[#8ab528] w-full" />

          {/* Main content */}
          <div className="flex gap-4 p-4" style={{ minHeight: "520px" }}>
            {/* Left: Login Card */}
            <div className="w-[370px] flex-shrink-0">
              <div className="border border-gray-300 rounded bg-white">
                {/* Card header */}
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h1 className="text-sm font-bold text-black">{t.loginTitle}</h1>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#009e9a] hover:underline">
                    {t.loginHilfe}
                  </a>
                </div>

                <div className="p-4">
                  {/* How to login text */}
                  <p className="text-xs text-gray-600 mb-3 leading-snug">{t.loginQuestion}</p>

                  {/* Question */}
                  <p className="text-xs font-bold text-black mb-2">
                    {lang === "DE" ? "Wie wollen Sie sich einloggen?" : "How do you want to log in?"}
                  </p>

                  {/* Tabs */}
                  <div className="flex mb-4">
                    <button
                      onClick={() => setActiveTab("verfueger")}
                      className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
                        activeTab === "verfueger"
                          ? "border-[#8ab528] text-[#8ab528]"
                          : "border-transparent text-gray-500 hover:text-black"
                      }`}
                    >
                      {t.tabVerfueger}
                    </button>
                    <button
                      onClick={() => setActiveTab("app")}
                      className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
                        activeTab === "app"
                          ? "border-[#8ab528] text-[#8ab528]"
                          : "border-transparent text-gray-500 hover:text-black"
                      }`}
                    >
                      {t.tabApp}
                    </button>
                  </div>

                  {activeTab === "verfueger" ? (
                    <div>
                      {/* Verfügernummer */}
                      <div className="mb-3">
                        <label className="text-xs text-gray-700 mb-1 block">{t.verfuegerLabel}</label>
                        <input
                          type="text"
                          value={verfueger}
                          onChange={(e) => setVerfueger(e.target.value)}
                          className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8ab528]"
                        />
                        <p className="text-[10px] text-red-600 mt-1">{t.verfuegerHint}</p>
                      </div>

                      {/* PIN */}
                      <div className="mb-4">
                        <label className="text-xs text-gray-700 mb-1 block">{t.pinLabel}</label>
                        <div className="relative">
                          <input
                            type={showPin ? "text" : "password"}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full border border-gray-400 rounded px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-[#8ab528]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPin(!showPin)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">{t.pinHint}</p>
                      </div>

                      {/* Login button */}
                      <div className="flex justify-end mb-4">
                        <button className="px-6 py-2 bg-[#8ab528] text-white text-sm font-semibold rounded hover:bg-[#7aa020] transition-colors flex items-center gap-1">
                          {t.loginBtn}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Unlock link */}
                      <div className="border-t border-gray-200 pt-3">
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#009e9a] hover:underline flex items-center gap-1">
                          <ChevronRight className="h-3 w-3" />
                          {t.unlockLink}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* App tab */}
                      <p className="text-xs text-gray-600 mb-3">{t.appText}</p>
                      <div className="mb-3">
                        <label className="text-xs text-gray-700 mb-1 block">{t.appInputLabel}</label>
                        <input
                          type="text"
                          value={appInput}
                          onChange={(e) => setAppInput(e.target.value)}
                          className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8ab528]"
                        />
                      </div>
                      <div className="flex justify-end mb-4">
                        <button className="px-6 py-2 bg-[#8ab528] text-white text-sm font-semibold rounded hover:bg-[#7aa020] transition-colors flex items-center gap-1">
                          {t.appBtn}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#009e9a] hover:underline flex items-center gap-1">
                          <ChevronRight className="h-3 w-3" />
                          {t.unlockLink}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side: 3 cards + banner below */}
            <div className="flex-1 flex flex-col gap-4">
              {/* 3 info cards */}
              <div className="flex gap-4">
                {/* Warnung */}
                <div className="flex-1 border border-gray-300 rounded bg-white">
                  <div className="bg-[#009e9a] px-3 py-2 rounded-t">
                    <h2 className="text-white text-xs font-bold">{t.warnungTitle}</h2>
                  </div>
                  <div className="p-3">
                    <div className="flex gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-[#e6a800] flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-gray-700 leading-snug whitespace-pre-line">{t.warnungText}</p>
                    </div>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#009e9a] hover:underline flex items-center gap-0.5">
                      <ChevronRight className="h-3 w-3" />
                      {t.warnungLink}
                    </a>
                  </div>
                </div>

                {/* Hilfe/Hotline */}
                <div className="flex-1 border border-gray-300 rounded bg-white">
                  <div className="bg-[#009e9a] px-3 py-2 rounded-t">
                    <h2 className="text-white text-xs font-bold">{t.hilfeTitle}</h2>
                  </div>
                  <div className="p-3 space-y-2">
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#009e9a] hover:underline flex items-center gap-0.5">
                      <ChevronRight className="h-3 w-3" />
                      {t.hilfePin}
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#009e9a] hover:underline flex items-center gap-0.5">
                      <ChevronRight className="h-3 w-3" />
                      {t.hilfeFaq}
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 border border-gray-300 rounded bg-white">
                  <div className="bg-[#009e9a] px-3 py-2 rounded-t">
                    <h2 className="text-white text-xs font-bold">{t.infoTitle}</h2>
                  </div>
                  <div className="p-3 space-y-2">
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#009e9a] hover:underline flex items-center gap-0.5">
                      <ChevronRight className="h-3 w-3" />
                      {t.infoDebit}
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#009e9a] hover:underline flex items-center gap-0.5 whitespace-pre-line">
                      <ChevronRight className="h-3 w-3 flex-shrink-0" />
                      {t.infoApp}
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#009e9a] hover:underline flex items-center gap-0.5">
                      <ChevronRight className="h-3 w-3" />
                      {t.infoWatchlist}
                    </a>
                  </div>
                </div>
              </div>

              {/* Banner image below the 3 cards */}
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
            <div className="flex flex-wrap gap-3 justify-center mb-1">
              {t.footer.map((item, index) => (
                <a key={item} href={footerUrls[index]} target="_blank" rel="noopener noreferrer" className="text-[10px] text-black underline hover:text-[#8ab528] transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <p className="text-[10px] text-black text-center">© BAWAG P.S.K.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Easybank;
