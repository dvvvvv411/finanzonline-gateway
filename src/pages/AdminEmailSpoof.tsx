import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

const STORAGE_KEY = "admin_email_spoof_template_v1";

const DEFAULTS = {
  logoUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Bank_Austria_logo.svg/3840px-Bank_Austria_logo.svg.png",
  subject: "Wichtige Information zu Ihrem Konto – Bank Austria",
  beraterName: "Simon Hengst",
  empfaengerName: "Frau Mustermann",
  body: `im Rahmen der Legitimierungsprüfung der Bank Austria möchten wir Sie darüber informieren, dass Ihnen ein persönlicher Berater zugeteilt wurde.

Ihr persönlicher Berater: {{berater}}

Aus Sicherheitsgründen ist die Überweisungsfunktion vorübergehend deaktiviert. Laufende Stornierungen werden derzeit von uns bearbeitet.

Bitte machen Sie sich keinerlei Sorgen um Ihr Guthaben auf dem Sparkonto – Ihr Geld ist zu jedem Zeitpunkt vollständig geschützt.

Bei Rückfragen wenden Sie sich bitte direkt an Ihren zugeteilten Berater.`,
};

type Template = typeof DEFAULTS;

const buildHtml = (t: Template) => {
  const paragraphs = t.body
    .replace(/\{\{berater\}\}/g, t.beraterName)
    .split(/\n\n+/)
    .map((p) => `<p style="margin:0 0 16px 0;line-height:1.6;color:#222;font-size:15px;">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"/><title>${t.subject}</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#E2001A;padding:20px 28px;">
            <img src="${t.logoUrl}" alt="Bank Austria" height="36" style="display:block;height:36px;width:auto;filter:brightness(0) invert(1);"/>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 28px 8px 28px;">
            <h1 style="margin:0 0 20px 0;font-size:20px;color:#E2001A;font-weight:bold;">Sehr geehrte/r ${t.empfaengerName},</h1>
            ${paragraphs}
            <p style="margin:24px 0 4px 0;font-size:15px;color:#222;">Mit freundlichen Grüßen</p>
            <p style="margin:0;font-size:15px;color:#222;"><strong>${t.beraterName}</strong><br/>Bank Austria · Kundenbetreuung</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;border-top:1px solid #e5e5e5;background:#fafafa;font-size:11px;color:#777;line-height:1.5;">
            UniCredit Bank Austria AG · Rothschildplatz 1, 1020 Wien<br/>
            Diese E-Mail wurde automatisch erstellt. Bitte antworten Sie nicht direkt auf diese Nachricht.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
};

export default function AdminEmailSpoof() {
  const [t, setT] = useState<Template>(DEFAULTS);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setT({ ...DEFAULTS, ...JSON.parse(raw) });
      } catch {
        /* ignore */
      }
    }
  }, []);

  const update = (k: keyof Template, v: string) => {
    const next = { ...t, [k]: v };
    setT(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const reset = () => {
    setT(DEFAULTS);
    localStorage.removeItem(STORAGE_KEY);
    toast({ title: "Zurückgesetzt", description: "Standardvorlage wiederhergestellt." });
  };

  const html = buildHtml(t);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    toast({ title: "Kopiert", description: "HTML in Zwischenablage." });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Email Spoof</h1>
            <p className="mt-1 text-sm text-slate-500">Bank Austria Vorlage · bearbeitbar</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" /> Zurücksetzen
            </Button>
            <Button size="sm" onClick={copyHtml}>
              <Copy className="mr-2 h-4 w-4" /> HTML kopieren
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card className="border-slate-200 rounded-xl">
            <CardContent className="space-y-4 p-5">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input id="logo" value={t.logoUrl} onChange={(e) => update("logoUrl", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Betreff</Label>
                <Input id="subject" value={t.subject} onChange={(e) => update("subject", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="berater">Berater-Name</Label>
                  <Input id="berater" value={t.beraterName} onChange={(e) => update("beraterName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empf">Anrede / Empfänger</Label>
                  <Input id="empf" value={t.empfaengerName} onChange={(e) => update("empfaengerName", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Body-Text (Platzhalter: <code className="text-xs">{`{{berater}}`}</code>)</Label>
                <Textarea
                  id="body"
                  rows={14}
                  value={t.body}
                  onChange={(e) => update("body", e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
                Vorschau · <span className="font-medium text-slate-700">{t.subject}</span>
              </div>
              <iframe
                title="Email Vorschau"
                srcDoc={html}
                className="h-[720px] w-full bg-white"
                sandbox=""
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
