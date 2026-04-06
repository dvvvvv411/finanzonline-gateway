import finanzonlineLogo from "@/assets/finanzonline_at_Logo.svg";
import bmfLogo from "@/assets/bmf_logo.svg";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <a href="#">
              <span className="sr-only">Zur Startseite</span>
              <img src={finanzonlineLogo} alt="FinanzOnline" className="h-10 md:h-14" />
            </a>
          </div>
          <div>
            <a
              href="https://www.bmf.gv.at/public.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Zur Homepage des Bundesministerium für Finanzen</span>
              <img src={bmfLogo} alt="BMF Logo" className="h-12 md:h-16" />
            </a>
          </div>
        </div>
        <h1
          className="py-4 text-center text-xl font-bold md:text-2xl"
          style={{ color: "#E6320F" }}
        >
          Willkommen bei FinanzOnline
        </h1>
      </header>
    </div>
  );
};

export default Index;
