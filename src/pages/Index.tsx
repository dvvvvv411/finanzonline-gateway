import finanzonlineLogo from "@/assets/finanzonline_at_Logo.svg";
import bmfLogo from "@/assets/bmf_logo.svg";

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
    </div>
  );
};

export default Index;
