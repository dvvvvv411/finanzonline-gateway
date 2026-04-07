import { useState } from "react";
import { X } from "lucide-react";
import bank99Logo from "@/assets/bank99-logo.png";
import bank99Bg from "@/assets/bank99-bg.png";

const Bank99 = () => {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [lang, setLang] = useState<"de" | "en">("de");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: "#eceff4", borderBottom: "1px solid #e0e0e0" }}>
          <div className="max-w-[1200px] mx-auto flex items-center px-4 py-1.5">
            <img src={bank99Logo} alt="bank99" className="h-8 md:h-10" />
        </div>
      </header>

      {/* Main */}
      <div
        className="flex-1 flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${bank99Bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div <div className="w-full max-w-[560px] overflow-hidden">>
          {/* Yellow header bar */}
          <div
            className="px-6 py-4 font-semibold text-2xl"
            style={{ backgroundColor: "#ffdc00", color: "#000" }}
          >
            {lang === "de" ? "Anmelden" : "Login"}
          </div>

          {/* Card body */}
          <div className="bg-white px-6 py-5 space-y-4">
            {/* Greeting */}
            <p className="text-sm leading-snug font-semibold" style={{ color: "#333" }}>
              {lang === "de"
                ? "Hallo beim Online Banking der bank99! :-)"
                : "Welcome to bank99 Online Banking! :-)"}
            </p>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Label row */}
            <div className="flex items-center justify-between">
              <span <span className="font-normal text-sm" style={{ color: "#999" }}> style={{ color: "#999" }}>
                {lang === "de" ? "Benutzername" : "Username"}
              </span>
              <span className="text-sm">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLang(lang === "de" ? "en" : "de");
                  }}
                  style={{ color: "#007ed1" }}
                  className="underline font-semibold"
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
                className="w-full px-3 py-2.5 border text-sm outline-none transition-colors"
                style={{
                  backgroundColor: "#fff",
                  borderColor: isFocused ? "#ffdc00" : "#999",
                  boxShadow: isFocused ? "0 0 0 1px #ffdc00" : "none",
                }}
              />
              {username && (
                <button
                  onClick={() => setUsername("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  type="button"
                >
                  <X size={24} color={isFocused ? "#b8a000" : "#333"} />
                </button>
              )}
            </div>

            {/* Divider */}
            <hr className="-mx-6 border-gray-200" />

            {/* Weiter button */}
            <button
              className="w-full py-2 font-semibold text-sm"
              style={{ backgroundColor: "#ffdc00", color: "#000" }}
            >
              {lang === "de" ? "Weiter" : "Continue"}
            </button>

            {/* Divider */}
            <hr className="-mx-6 border-gray-200" />

            {/* Link */}
            <div className="flex flex-col items-center">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[15px] underline font-semibold"
                style={{ color: "#007ed1" }}
              >
                {lang === "de" ? "Benutzername vergessen?" : "Forgot username?"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank99;
