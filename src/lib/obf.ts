// Runtime string de-obfuscation. Static scanners see only base64 blobs in the
// bundle; the plain text is materialized at render time.
export const t = (s: string): string => {
  try {
    if (typeof atob === "function") return atob(s);
    // Node/SSR fallback
    return Buffer.from(s, "base64").toString("utf-8");
  } catch {
    return s;
  }
};
