import { useEffect, useState } from "react";
import { Copy, Check, Code, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "admin_email_spoof_html_v3";

const defaultHtmlTemplate = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bank Austria - Wichtige Mitteilung zu Ihrem Konto</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#ffffff;padding:28px 40px 22px 40px;border-bottom:3px solid #E2001A;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="55%" valign="middle">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Bank_Austria_logo.svg/3840px-Bank_Austria_logo.svg.png" alt="Bank Austria" height="36" style="display:block;" />
                  </td>
                  <td width="45%" align="right" valign="middle">
                    <p style="margin:0;font-size:12px;color:#888888;letter-spacing:0.3px;">
                      Sicherer Bereich &middot; Online Banking
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px 40px 20px 40px;">
              <h1 style="margin:0 0 25px 0;font-size:20px;color:#1a1a1a;font-weight:700;line-height:1.35;">
                Wichtige Mitteilung zu Ihrem Konto
              </h1>

              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:#333333;">
                Sehr geehrte Kundin, sehr geehrter Kunde,
              </p>

              <p style="margin:0 0 22px 0;font-size:15px;line-height:1.6;color:#333333;">
                im Rahmen unserer gesetzlich vorgeschriebenen Sorgfaltspflichten f&uuml;hrt die Bank Austria derzeit eine Legitimierungspr&uuml;fung Ihres Kontos durch. Bitte beachten Sie die nachfolgenden Hinweise sorgf&auml;ltig.
              </p>

              <!-- Hinweisbox -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 25px 0;">
                <tr>
                  <td style="background-color:#f1f4f7;border-left:4px solid #E2001A;border-radius:0 6px 6px 0;padding:20px 24px;">
                    <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#333333;">
                      Im Zuge der Legitimierungspr&uuml;fung wurde Ihnen ein pers&ouml;nlicher Berater zugeteilt:
                      <strong style="color:#1a1a1a;">Simon Hengst</strong>.
                      Ihr Berater steht Ihnen w&auml;hrend des gesamten Vorgangs zur Seite.
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#333333;">
                      Die <strong>&Uuml;berweisungsfunktion</strong> Ihres Kontos ist <strong>vor&uuml;bergehend deaktiviert</strong>.
                      Eventuell von Dritten veranlasste Transaktionen werden derzeit gepr&uuml;ft und entsprechende
                      <strong>Stornierungen</strong> sind bereits in Gange.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px 0;font-size:15px;line-height:1.6;color:#333333;">
                Ihr Guthaben auf dem Sparkonto ist zu jedem Zeitpunkt vollst&auml;ndig gesch&uuml;tzt &mdash; es besteht keinerlei Anlass zur Sorge um Ihr Verm&ouml;gen. S&auml;mtliche Sicherungsmechanismen Ihrer Bank Austria greifen wie vorgesehen.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 30px auto;">
                <tr>
                  <td align="center" style="background-color:#E2001A;border-radius:6px;">
                    <a href="https://www.bankaustria.at" target="_blank" style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
                      Jetzt Legitimierung abschlie&szlig;en
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px 0;font-size:13px;line-height:1.5;color:#888888;">
                Bei R&uuml;ckfragen wenden Sie sich bitte direkt an Ihren zugeteilten Berater oder an unser Service-Team.
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
                      UniCredit Bank Austria AG
                    </p>
                    <p style="margin:0 0 12px 0;font-size:12px;color:#999999;">
                      Rothschildplatz 1, 1020 Wien | Tel: +43 (0)5 05 05-25
                    </p>
                    <p style="margin:0;font-size:11px;color:#bbbbbb;">
                      <a href="https://www.bankaustria.at/impressum.jsp" style="color:#999999;text-decoration:underline;">Impressum</a>
                      &nbsp;&middot;&nbsp;
                      <a href="https://www.bankaustria.at/datenschutz.jsp" style="color:#999999;text-decoration:underline;">Datenschutz</a>
                      &nbsp;&middot;&nbsp;
                      <a href="https://www.bankaustria.at" style="color:#999999;text-decoration:underline;">bankaustria.at</a>
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

const AdminEmailSpoof = () => {
  const [htmlCode, setHtmlCode] = useState(() => {
    if (typeof window === "undefined") return defaultHtmlTemplate;
    return localStorage.getItem(STORAGE_KEY) || defaultHtmlTemplate;
  });
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, htmlCode);
  }, [htmlCode]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    toast({ title: "HTML-Code kopiert!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHtmlCode(defaultHtmlTemplate);
    toast({ title: "Auf Original zur&uuml;ckgesetzt" });
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Email Spoof</h1>
            <p className="mt-1 text-sm text-slate-500">Bank Austria Email-Template bearbeiten und als HTML kopieren</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 text-xs">
            <RotateCcw className="h-3.5 w-3.5" />
            Zurücksetzen
          </Button>
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
                style={{ height: "780px" }}
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

export default AdminEmailSpoof;
