import { useState, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
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

const Oberbank = () => {
  const [bankingNummer, setBankingNummer] = useState("");
  const [pin, setPin] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [meldungenOpen, setMeldungenOpen] = useState(false);

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

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "'Roboto', sans-serif", background: "#f5f5f5" }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* Red top bar */}
      <div style={{ height: 8, background: "#c90000" }} />

      {/* Cookie banner */}
      <div style={{ background: "#e8e8e8", padding: "12px 40px", fontSize: 13, color: "#333", lineHeight: 1.5, display: "flex", alignItems: "center", gap: 20 }}>
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
              padding: "6px 20px",
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Schließen
          </button>
        </div>
      </div>

      {/* Header with logo */}
      <div style={{ background: "#fff", padding: "20px 40px" }}>
        <img src={oberbankLogo} alt="Oberbank" style={{ height: 32 }} />
      </div>

      {/* Thin gray line */}
      <div style={{ height: 1, background: "#e0e0e0" }} />

      {/* Main content */}
      <div
        className="flex-1"
        style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "30px 20px" }}
      >
        {/* 3-column layout */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {/* Login Card */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          >
            <div style={{ padding: "20px 20px 0" }}>
              <h2 style={{ fontSize: 18, fontWeight: 400, color: "#333", margin: "0 0 20px" }}>
                Kundenportal Login
              </h2>

              {/* Banking-Nummer */}
              <input
                type="text"
                placeholder="Banking-Nummer"
                value={bankingNummer}
                onChange={(e) => setBankingNummer(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  fontSize: 14,
                  marginBottom: 12,
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "'Roboto', sans-serif",
                }}
              />

              {/* PIN + Language row */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input
                  type="password"
                  placeholder="Ihre PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                />
                <select
                  style={{
                    padding: "8px 10px",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    fontSize: 14,
                    background: "#fff",
                    cursor: "pointer",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  <option>Deutsch</option>
                  <option>English</option>
                </select>
              </div>

              {/* SSL text */}
              <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5, margin: "0 0 16px" }}>
                Ihre Anmeldung im Kundenportal geschieht über gesicherte SSL Verbindungen.
              </p>

              {/* Weiter Button */}
              <button
                style={{
                  display: "block",
                  width: "auto",
                  marginLeft: "auto",
                  padding: "8px 32px",
                  background: "#c90000",
                  color: "#fff",
                  border: "none",
                  borderRadius: 20,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                Weiter
              </button>
            </div>

            {/* Erstanmeldung */}
            <div
              style={{
                borderTop: "1px solid #e0e0e0",
                marginTop: 20,
                padding: "12px 20px",
                textAlign: "right",
              }}
            >
              <a
                href="#"
                style={{
                  color: "#333",
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Erstanmeldung
              </a>
            </div>
          </div>

          {/* Weiterführende Links */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          >
            <div style={{ padding: "20px 20px 0" }}>
              <h2 style={{ fontSize: 18, fontWeight: 400, color: "#333", margin: "0 0 16px" }}>
                Weiterführende Links
              </h2>
            </div>
            <div>
              {links.map((link, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 20px",
                    borderTop: "1px solid #e0e0e0",
                    color: "#555",
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span>{link}</span>
                  <ChevronRight size={16} color="#999" />
                </a>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div
            style={{
              flex: 1,
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              minHeight: 220,
            }}
          >
            <img
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Prev/Next */}
            <button
              onClick={prevSlide}
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.3)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={18} color="#fff" />
            </button>
            <button
              onClick={nextSlide}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.3)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={18} color="#fff" />
            </button>

            {/* Dots */}
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 6,
              }}
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: "none",
                    background: i === currentSlide ? "#c90000" : "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Wichtige Meldungen */}
        <div style={{ marginTop: 30 }}>
          <h3 style={{ fontSize: 18, fontWeight: 400, color: "#333", marginBottom: 12 }}>
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
              <span style={{ fontWeight: 700, color: "#333", flex: 1 }}>
                Zahlungsverkehr am Karfreitag 3.4.2026
              </span>
              <span style={{ color: "#888", fontSize: 13, whiteSpace: "nowrap" }}>
                25.03.2026, 15:59 Uhr
              </span>
            </button>
            {meldungenOpen && (
              <div style={{ padding: "0 20px 16px 50px", color: "#555", fontSize: 13, lineHeight: 1.6 }}>
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
            maxWidth: 960,
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
                style={{ color: "#555", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                {label}
              </a>
            ))}
          </div>
          <span style={{ color: "#888" }}>© 2026 Oberbank AG</span>
        </div>
      </div>
    </div>
  );
};

export default Oberbank;
