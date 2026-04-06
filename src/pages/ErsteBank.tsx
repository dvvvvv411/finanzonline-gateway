import { useState } from "react";
import { User, Lock } from "lucide-react";
import georgeBlueLogo from "@/assets/george-logo-bright-blue.svg";
import georgeWhiteLogo from "@/assets/george-logo-white.svg";
import sparkasseLogo from "@/assets/EB-SPK_Logo_screen_white.svg";

const ErsteBank = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div className="flex h-screen flex-col">
      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Left Side - Login */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center px-8">
          <div className="w-full max-w-[320px]">
            <img src={georgeBlueLogo} alt="George Logo" className="h-20 mb-8 mx-auto block" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">George Login</h1>
            <p className="text-sm text-gray-600 mb-8">
              Bitte geben Sie Ihre Verfügernummer oder Ihren selbst gewählten Benutzernamen ein.
            </p>

            {/* Username Field */}
            <div className="relative mb-4">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Verfügernummer/Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2870ED] focus:border-transparent"
              />
            </div>

            {/* PIN Field */}
            <div className="relative mb-6">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2870ED] focus:border-transparent"
              />
            </div>

            {/* Login Button */}
            <button className="w-full py-3 bg-[#2870ED] text-white font-semibold rounded-lg hover:bg-[#1d5fd4] transition-colors mb-4">
              Login starten
            </button>

            <a href="#" className="text-sm text-[#2870ED] hover:underline">
              Aktivierungscode benötigt oder EB-PIN vergessen?
            </a>
          </div>
        </div>

        {/* Right Side - Branding */}
        <div className="w-1/2 bg-[#721c7a] flex flex-col justify-center items-center px-16 relative">
          <img src={georgeWhiteLogo} alt="George" className="h-14 mb-16" />
          <div className="absolute bottom-16 left-16 space-y-1">
            <p className="text-white text-4xl font-light">Einfach</p>
            <p className="text-white text-4xl font-light">Intelligent</p>
            <p className="text-white text-4xl font-light">Persönlich</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2870ED] px-6 py-3 flex items-center justify-between">
        <img src={sparkasseLogo} alt="Erste Sparkasse" className="h-6" />
        <div className="flex gap-6">
          <a href="https://www.sparkasse.at/tiny/impressum-george" target="_blank" rel="noopener noreferrer" className="text-white text-xs hover:underline">
            Impressum
          </a>
          <a href="https://www.sparkasse.at/tiny/datenschutz-george" target="_blank" rel="noopener noreferrer" className="text-white text-xs hover:underline">
            Datenschutz
          </a>
          <a href="https://www.sparkasse.at/tiny/gbg-george" target="_blank" rel="noopener noreferrer" className="text-white text-xs hover:underline">
            Geschäftsbedingungen
          </a>
          <a href="https://www.sparkasse.at/tiny/service-kontakt-george" target="_blank" rel="noopener noreferrer" className="text-white text-xs hover:underline">
            Service & Kontakt
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ErsteBank;
