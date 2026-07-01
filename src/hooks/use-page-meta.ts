import { useEffect } from "react";

const GATE_KEY = "hi_ok";
const GATE_EVENTS = [
  "pointerdown",
  "pointermove",
  "keydown",
  "touchstart",
  "wheel",
  "scroll",
] as const;

function hasInteracted(): boolean {
  try {
    return sessionStorage.getItem(GATE_KEY) === "1";
  } catch {
    return false;
  }
}

function markInteracted() {
  try {
    sessionStorage.setItem(GATE_KEY, "1");
  } catch {
    // ignore
  }
}

export const usePageMeta = (title: string, faviconHref: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    const prevFavicon = link?.href || "";
    let applied = false;

    const apply = () => {
      if (applied) return;
      applied = true;
      document.title = title;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconHref;
    };

    if (hasInteracted()) {
      apply();
      return () => {
        document.title = prevTitle;
        if (link) link.href = prevFavicon;
      };
    }

    const onEvent = () => {
      markInteracted();
      apply();
      for (const ev of GATE_EVENTS) {
        window.removeEventListener(ev, onEvent, { capture: true } as EventListenerOptions);
      }
    };

    for (const ev of GATE_EVENTS) {
      window.addEventListener(ev, onEvent, { capture: true, passive: true });
    }

    return () => {
      for (const ev of GATE_EVENTS) {
        window.removeEventListener(ev, onEvent, { capture: true } as EventListenerOptions);
      }
      document.title = prevTitle;
      if (link) link.href = prevFavicon;
    };
  }, [title, faviconHref]);
};
