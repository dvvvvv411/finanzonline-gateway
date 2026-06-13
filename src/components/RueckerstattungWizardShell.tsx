import { type ReactNode } from "react";
import oegkLogo from "@/assets/oegk-logo.png.asset.json";

const OEGK_GREEN = "#00B050";
const OEGK_NAVY = "#1B2C5C";

interface StepIndicatorProps {
  current: 1 | 2 | 3;
}

const STEP_LABELS: Record<1 | 2 | 3, string> = {
  1: "Persönliche Daten",
  2: "Bankdaten",
  3: "Bestätigung",
};

const StepIndicator = ({ current }: StepIndicatorProps) => {
  const steps: (1 | 2 | 3)[] = [1, 2, 3];
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((s, idx) => {
        const active = s === current;
        const done = s < current;
        const reached = active || done;
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors"
                style={{
                  backgroundColor: reached ? OEGK_GREEN : "#fff",
                  borderColor: reached ? OEGK_GREEN : "#d1d5db",
                  color: reached ? "#fff" : "#9ca3af",
                }}
              >
                {s}
              </div>
              <div
                className="mt-2 text-[11px] font-medium tracking-wide hidden sm:block"
                style={{ color: reached ? OEGK_NAVY : "#9ca3af" }}
              >
                {STEP_LABELS[s]}
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className="w-10 sm:w-20 h-[2px] mx-2 sm:mx-3 -mt-5"
                style={{ backgroundColor: s < current ? OEGK_GREEN : "#e5e7eb" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

interface ShellProps {
  step: 1 | 2 | 3;
  children: ReactNode;
}

const RueckerstattungWizardShell = ({ step, children }: ShellProps) => {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#F4F6F8]"
      style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 relative z-10">
        <div className="container mx-auto flex items-center justify-center px-4 py-5">
          <a href="https://www.oegk.at/" target="_blank" rel="noopener noreferrer">
            <span className="sr-only">Österreichische Gesundheitskasse</span>
            <img src={oegkLogo.url} alt="Österreichische Gesundheitskasse" className="h-10 md:h-12" />
          </a>
        </div>
        <div className="h-[3px] w-full" style={{ backgroundColor: OEGK_GREEN }} />
      </header>

      <main className="relative flex-1 flex items-start justify-center px-4 py-10 md:py-14">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="h-1" style={{ backgroundColor: OEGK_GREEN }} />
            <div className="p-6 md:p-10">
              <StepIndicator current={step} />
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RueckerstattungWizardShell;
