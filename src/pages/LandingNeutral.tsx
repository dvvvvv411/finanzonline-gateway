import { useEffect } from "react";

const LandingNeutral = () => {
  useEffect(() => {
    document.title = "Domain";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Domain");
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        color: "#333",
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 480, textAlign: "center" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 12px" }}>
          Diese Domain wird gerade eingerichtet.
        </h1>
        <p style={{ fontSize: 14, color: "#666", margin: 0 }}>
          Bitte versuchen Sie es später erneut.
        </p>
      </div>
    </main>
  );
};

export default LandingNeutral;
