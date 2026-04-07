import { useEffect } from "react";

export const usePageMeta = (title: string, faviconHref: string) => {
  useEffect(() => {
    const prevTitle = document.title;

    // Set title immediately
    document.title = title;

    // Set favicon immediately
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    const prevFavicon = link?.href || "";
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconHref;

    return () => {
      document.title = prevTitle;
      if (link) link.href = prevFavicon;
    };
  }, [title, faviconHref]);
};
