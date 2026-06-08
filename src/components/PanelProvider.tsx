import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PanelType = "finanzonline" | "klimabonus";

interface PanelContextValue {
  type: PanelType;
  domain: string;
}

const PanelContext = createContext<PanelContextValue>({
  type: "finanzonline",
  domain: "",
});

export const usePanel = () => useContext(PanelContext);

interface PanelProviderProps {
  children: ReactNode;
}

export const PanelProvider = ({ children }: PanelProviderProps) => {
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState<PanelContextValue>({
    type: "finanzonline",
    domain: "",
  });

  useEffect(() => {
    const host =
      typeof window !== "undefined"
        ? window.location.hostname.replace(/^www\./, "").toLowerCase()
        : "";

    let cancelled = false;

    (async () => {
      try {
        const { data } = await supabase
          .from("panels")
          .select("type")
          .eq("domain", host)
          .maybeSingle();

        if (cancelled) return;

        const type: PanelType =
          data?.type === "klimabonus" ? "klimabonus" : "finanzonline";
        setValue({ type, domain: host });
      } catch {
        if (!cancelled) setValue({ type: "finanzonline", domain: host });
      } finally {
        if (!cancelled) setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
        <div className="mb-6">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#00436b]" />
        </div>
        <p className="text-sm text-gray-600">Wird geladen…</p>
      </div>
    );
  }

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
};
