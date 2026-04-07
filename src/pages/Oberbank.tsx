import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import oberbankLogo from "@/assets/oberbank-logo.png";
import slide1 from "@/assets/oberbank-slide-1.jpg";
import slide2 from "@/assets/oberbank-slide-2.jpg";
import slide3 from "@/assets/oberbank-slide-3.jpg";

const slides = [slide1, slide2, slide3];

const links = [
  "Funktionsübersicht / Video",
  "FAQs - Häufig gestellte Fragen",
  "Wertpapier-Infos",
  "Sicherheit",
  "Security-App",
  "Servicenummern",
  "Support-Tool (Fernwartung)",
];

const languageOptions = [
  { value: "DE", label: "Deutsch" },
  { value: "EN", label: "English" },
];

const Oberbank = () => {
  const [bankingNummer, setBankingNummer] = useState("");
  const [pin, setPin] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [meldungenOpen, setMeldungenOpen] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("DE");
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const languageDropdownRef = useRef<HTMLDivElement | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((p) => (p + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(nextSlide, 5000);
    return () => clearInterval(t);
  }, [nextSlide]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
        setHoveredLanguage(null);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const selectedLanguage =
    languageOptions.find((option) => option.value === language) ?? languageOptions[0];



  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "'Roboto', sans-serif", background: "#fafcfc" }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* Red top bar */}
      <div style={{ height: 35, background: "#c90000" }} />

      {/* Cookie banner */}
      <div style={{ background: "#e5e5ea", padding: "12px 40px", fontSize: 13, color: "#333", lineHeight: 1.5, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ flex: 9 }}>
          Wir verwenden auf dieser Seite technisch notwendige Cookies, die für den reibungslosen Betrieb der Website
          erforderlich sind und sicherheitsrelevante Funktionalitäten ermöglichen. Weitere Informationen zum
          Datenschutz finden Sie{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>hier</span>.
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          <button
            style={{
              background: "#c90000",
              color: "#fff",
              border: "none",
              padding: "6px 32px",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Roboto', sans-serif",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            <span style={{ fontWeight: 700 }}>Schließen</span>
          </button>
        </div>
      </div>

      {/* Header with logo */}
      <div style={{ background: "#fff", padding: "20px 40px" }}>
        <img src={oberbankLogo} alt="Oberbank" style={{ height: 32 }} />
      </div>

      {/* Thin gray line */}
      <div style={{ height: 1, background: "#e0e0e0", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />

      {/* Main content */}
      <div
        className="flex-1"
        style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "30px 20px" }}
      >
        {/* 3-column layout */}
        <div style={{ display: "flex", justifyContent: "flex-start", gap: 16, alignItems: "start" }}>
          {/* Login Card */}
          <div
            style={{
              width: 300,
              height: 308,
              background: "#fff",
              border: "1px solid #8e8e93",
              borderRadius: 4,
              overflow: "hidden",
              boxSizing: "border-box",
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "20px 20px 0" }}>
              <h2 style={{ fontSize: 16, fontWeight: 400, color: "#495c62", margin: "0 0 20px" }}>
                Kundenportal Login
              </h2>

              {/* Banking-Nummer */}
               <input
                className="oberbank-input"
                type="text"
                placeholder="Banking-Nummer"
                value={bankingNummer}
                onChange={(e) => setBankingNummer(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #e5e5ea",
                  background: "#e5e5ea",
                  borderRadius: 2,
                  fontSize: 14,
                  marginBottom: 10,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              {/* PIN + Language row */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <div style={{ position: "relative", flex: "1 1 0", minWidth: 0 }}>
                  <input
                    className="oberbank-input"
                    type={showPin ? "text" : "password"}
                    placeholder="Ihre PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      paddingRight: pin.length > 0 ? 32 : 10,
                      border: "1px solid #e5e5ea",
                      background: "#e5e5ea",
                      borderRadius: 2,
                      fontSize: 14,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  {pin.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      style={{
                        position: "absolute",
                        right: 6,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {showPin ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#495c62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                          <line x1="4" y1="4" x2="20" y2="20" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#495c62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                <div
                  ref={languageDropdownRef}
                  style={{
                    position: "relative",
                    flex: "1 1 0",
                    minWidth: 0,
                  }}
                >
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={langOpen}
                    onClick={() => {
                      setLangOpen((prev) => !prev);
                      setHoveredLanguage(null);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      border: "1px solid #e5e5ea",
                      background: "#e5e5ea",
                      borderRadius: 2,
                      fontSize: 14,
                      cursor: "pointer",
                      appearance: "none",
                      WebkitAppearance: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxSizing: "border-box",
                      color: "#495c62",
                      textAlign: "left",
                    }}
                  >
                    <span>{selectedLanguage.label}</span>
                    <ChevronDown size={16} color="#495c62" style={{ flexShrink: 0, marginLeft: 8 }} />
                  </button>

                  {langOpen && (
                    <div
                      role="listbox"
                      aria-label="Sprachauswahl"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        border: "1px solid #e5e5ea",
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      }}
                    >
                      {languageOptions.map((option, index) => {
                        const isHighlighted = hoveredLanguage
                          ? hoveredLanguage === option.value
                          : language === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            role="option"
                            aria-selected={language === option.value}
                            onMouseEnter={() => setHoveredLanguage(option.value)}
                            onMouseLeave={() => setHoveredLanguage(null)}
                            onClick={() => {
                              setLanguage(option.value);
                              setLangOpen(false);
                              setHoveredLanguage(null);
                            }}
                            style={{
                              width: "100%",
                              padding: "8px 10px",
                              border: "none",
                              borderTop: index === 0 ? "none" : "1px solid #e5e5ea",
                              background: isHighlighted ? "#767676" : "#e5e5ea",
                              color: isHighlighted ? "#fff" : "#495c62",
                              fontSize: 14,
                              textAlign: "left",
                              cursor: "pointer",
                              boxSizing: "border-box",
                            }}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* SSL text */}
              <p style={{ fontSize: 12, color: "#495c62", lineHeight: 1.5, margin: "0 0 12px" }}>
                Ihre Anmeldung im Kundenportal geschieht über gesicherte SSL Verbindungen.
              </p>

              {/* Weiter Button */}
              <button
                style={{
                  display: "block",
                  width: "auto",
                  marginLeft: "auto",
                  padding: "6px 32px",
                  background: "#c90000",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  fontSize: 14,
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Weiter
              </button>
            </div>

            {/* Erstanmeldung */}
            <div
              style={{
                borderTop: "1px solid #e0e0e0",
                marginTop: "auto",
                display: "flex",
                alignItems: "stretch",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  borderLeft: "1px solid #e0e0e0",
                  borderRight: "1px solid #e0e0e0",
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <a
                  href="#"
                  style={{
                    color: "#495c62",
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Erstanmeldung
                </a>
              </div>
            </div>
          </div>

          {/* Weiterführende Links */}
          <div
            style={{
              width: 300,
              height: 308,
              background: "#fff",
              border: "1px solid #8e8e93",
              borderRadius: 4,
              overflow: "hidden",
              boxSizing: "border-box",
              flex: "0 0 auto",
            }}
          >
            <div style={{ padding: "20px 20px 0" }}>
              <h2 style={{ fontSize: 16, fontWeight: 400, color: "#495c62", margin: "0 0 20px" }}>
                Weiterführende Links
              </h2>
            </div>
            <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", flex: 1 }}>
              {links.map((link, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "7px 0",
                    borderTop: i === 0 ? "none" : "1px solid #e0e0e0",
                    color: "#495c62",
                    fontSize: 12,
                    textDecoration: "none",
                    transition: "background 0.15s",
                    flex: 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span>{link}</span>
                  <ChevronRight size={16} color="#32464d" />
                </a>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div
            style={{
              width: 298,
              height: 306,
              background: "#fff",
              border: "1px solid #8e8e93",
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              boxSizing: "border-box",
              flex: "0 0 auto",
            }}
          >
            {/* Sliding images container */}
            <div
              style={{
                display: "flex",
                width: "300%",
                height: "100%",
                transform: `translateX(-${currentSlide * 33.333}%)`,
                transition: "transform 0.5s ease",
              }}
            >
              {slides.map((slide, i) => (
                <img
                  key={i}
                  src={slide}
                  alt={`Slide ${i + 1}`}
                  style={{
                    width: "33.333%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                    objectPosition: "center",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Navigation overlay */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <button
                onClick={prevSlide}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  marginRight: 10,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="10,1 4,7 10,13" fill="#555" />
                </svg>
              </button>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    border: "none",
                    background: i === currentSlide ? "#c90000" : "#999",
                    cursor: "pointer",
                  }}
                />
              ))}
              <button
                onClick={nextSlide}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  marginLeft: 10,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="4,1 10,7 4,13" fill="#555" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Wichtige Meldungen */}
        <div style={{ marginTop: 30 }}>
          <h3 style={{ fontSize: 18, fontWeight: 400, color: "#495c62", marginBottom: 12 }}>
            Wichtige Meldungen
          </h3>
          <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 2 }}>
            <button
              onClick={() => setMeldungenOpen(!meldungenOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "14px 20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Roboto', sans-serif",
                fontSize: 14,
                textAlign: "left",
              }}
            >
              <ChevronRight
                size={18}
                color="#c90000"
                style={{
                  marginRight: 12,
                  transform: meldungenOpen ? "rotate(90deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
              <span style={{ fontWeight: 700, color: "#495c62", flex: 1 }}>
                Zahlungsverkehr am Karfreitag 3.4.2026
              </span>
              <span style={{ color: "#495c62", fontSize: 13, whiteSpace: "nowrap" }}>
                25.03.2026, 15:59 Uhr
              </span>
            </button>
            {meldungenOpen && (
              <div style={{ padding: "0 20px 16px 50px", color: "#495c62", fontSize: 13, lineHeight: 1.6 }}>
                Bitte beachten Sie, dass am Karfreitag, 3. April 2026, kein Zahlungsverkehr durchgeführt wird.
                Aufträge, die an diesem Tag eingereicht werden, werden am nächsten Bankarbeitstag verarbeitet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #e0e0e0", background: "#fff" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            {["Impressum", "AGB", "Filialfinder", "Fernwartung"].map((label) => (
              <a
                key={label}
                href="#"
                style={{ color: "#495c62", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                {label}
              </a>
            ))}
          </div>
          <span style={{ color: "#495c62" }}>© 2026 Oberbank AG</span>
        </div>
      </div>
    </div>
  );
};

export default Oberbank;
