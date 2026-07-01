import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const Error404 = () => {
  useEffect(() => {
    document.title = "404 – Seite nicht gefunden";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Die aufgerufene Seite wurde nicht gefunden.",
    );
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-[140px] leading-none font-bold tracking-tight text-primary/90">
          404
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
          Seite nicht gefunden
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Die von Ihnen aufgerufene Seite existiert nicht, wurde verschoben
          oder ist nicht mehr verfügbar.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Home className="w-4 h-4" />
            Zur Startseite
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>
        </div>
      </div>
    </main>
  );
};

export default Error404;
