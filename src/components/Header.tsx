import finanzonlineLogo from "@/assets/finanzonline_at_Logo.svg";
import bmfLogo from "@/assets/bmf_logo.svg";

const Header = () => (
  <header className="bg-white">
    <div className="container mx-auto flex items-center justify-between px-4 py-4">
      <div>
        <a href="/">
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
  </header>
);

export default Header;
