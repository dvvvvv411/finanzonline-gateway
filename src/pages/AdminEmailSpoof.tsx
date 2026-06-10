import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

const STORAGE_KEY = "admin_email_spoof_template_v2";

const DEFAULTS = {
  logoUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Bank_Austria_logo.svg/3840px-Bank_Austria_logo.svg.png",
  preheader: "Wichtige Mitteilung zu Ihrem Konto – bitte aufmerksam lesen.",
  headline: "Wichtige Mitteilung zu Ihrem Konto",
  subject: "Wichtige Mitteilung zu Ihrem Konto – Bank Austria",
  empfaengerName: "Frau Mustermann",
  beraterName: "Simon Hengst",
  beraterTitel: "Ihr persönlicher Kundenbetreuer",
  beraterTel: "+43 1 50505 0",
  beraterEmail: "simon.hengst@bankaustria.at",
  ctaText: "Sicher im OnlineBanking anmelden",
  ctaUrl: "https://www.bankaustria.at",
  intro:
    "wir wenden uns heute persönlich an Sie im Rahmen einer routinemäßigen Legitimierungsprüfung Ihres Bank Austria Kontos. Damit dieser Vorgang reibungslos abgewickelt werden kann, wurde Ihnen ein persönlicher Kundenbetreuer zugeteilt.",
  warnung:
    "Aus Sicherheitsgründen ist die Überweisungsfunktion vorübergehend deaktiviert. Bereits eingeleitete Transaktionen werden derzeit storniert und an die jeweiligen Absender zurückgeführt.",
  beruhigung:
    "Bitte beachten Sie: Ihr Guthaben auf dem Spar- und Verrechnungskonto ist zu jedem Zeitpunkt vollständig durch die gesetzliche Einlagensicherung geschützt. Sie müssen sich keinerlei Sorgen um Ihr Geld machen.",
  schluss:
    "Sollten Rückfragen bestehen, wenden Sie sich bitte direkt an Ihren zugeteilten Betreuer. Wir bedanken uns für Ihr Vertrauen.",
};

type Template = typeof DEFAULTS;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

const today = () =>
  new Date().toLocaleDateString("de-AT", { day: "2-digit", month: "long", year: "numeric" });

const buildHtml = (t: Template) => `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${t.subject}</title>
</head>
<body style="margin:0;padding:0;background:#ececec;font-family:Verdana,Arial,Helvetica,sans-serif;color:#1a1a1a;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${t.preheader}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ececec;">
    <tr><td align="center" style="padding:24px 12px;">

      <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;background:#ffffff;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

        <!-- Pre-Header Meta -->
        <tr><td style="padding:10px 28px;background:#f5f5f0;border-bottom:1px solid #e5e5e0;font-size:11px;color:#6b6b6b;font-family:Verdana,Arial,sans-serif;">
          <table role="presentation" width="100%"><tr>
            <td align="left" style="font-size:11px;color:#6b6b6b;">UniCredit Bank Austria AG</td>
            <td align="right" style="font-size:11px;color:#6b6b6b;">Wien, ${today()}</td>
          </tr></table>
        </td></tr>

        <!-- Logo Header -->
        <tr><td style="padding:22px 28px 18px 28px;background:#ffffff;border-bottom:3px solid #E2001A;">
          <img src="${t.logoUrl}" alt="Bank Austria" height="40" style="display:block;height:40px;width:auto;border:0;outline:none;"/>
        </td></tr>

        <!-- Subject Banner -->
        <tr><td style="padding:18px 28px;background:#E2001A;">
          <h1 style="margin:0;font-family:Verdana,Arial,sans-serif;font-size:18px;font-weight:bold;color:#ffffff;letter-spacing:0.2px;">${t.headline}</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:28px 28px 8px 28px;">
          <p style="margin:0 0 16px 0;font-size:15px;line-height:1.65;color:#1a1a1a;">Sehr geehrte/r ${t.empfaengerName},</p>
          <p style="margin:0 0 20px 0;font-size:15px;line-height:1.65;color:#1a1a1a;">${t.intro}</p>
        </td></tr>

        <!-- Berater Card -->
        <tr><td style="padding:0 28px 24px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafaf7;border-left:4px solid #E2001A;">
            <tr>
              <td width="68" valign="middle" style="padding:18px 0 18px 18px;width:68px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="52" height="52" style="width:52px;height:52px;background:#E2001A;color:#ffffff;font-family:Verdana,Arial,sans-serif;font-size:18px;font-weight:bold;border-radius:26px;text-align:center;line-height:52px;">${initials(t.beraterName)}</td></tr></table>
              </td>
              <td valign="middle" style="padding:18px 18px 18px 14px;">
                <div style="font-size:11px;color:#6b6b6b;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:2px;">${t.beraterTitel}</div>
                <div style="font-size:16px;font-weight:bold;color:#1a1a1a;margin-bottom:6px;">${t.beraterName}</div>
                <div style="font-size:13px;color:#3a3a3a;line-height:1.5;">
                  <span style="color:#E2001A;">&#9742;</span>&nbsp;${t.beraterTel}
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <span style="color:#E2001A;">&#9993;</span>&nbsp;${t.beraterEmail}
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Warnung -->
        <tr><td style="padding:0 28px 18px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff8e1;border:1px solid #f0d987;">
            <tr>
              <td width="40" valign="top" style="padding:14px 0 14px 14px;width:40px;font-size:20px;color:#c08a00;line-height:1;">&#9888;</td>
              <td valign="top" style="padding:14px 16px 14px 8px;font-size:14px;line-height:1.6;color:#3a2f00;">
                <strong style="display:block;margin-bottom:4px;color:#1a1a1a;">Überweisungen vorübergehend deaktiviert</strong>
                ${t.warnung}
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Beruhigung -->
        <tr><td style="padding:0 28px 24px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef7ee;border:1px solid #c5e0c5;">
            <tr>
              <td width="40" valign="top" style="padding:14px 0 14px 14px;width:40px;font-size:18px;color:#2a7a2a;line-height:1;">&#10003;</td>
              <td valign="top" style="padding:14px 16px 14px 8px;font-size:14px;line-height:1.6;color:#1f3a1f;">
                <strong style="display:block;margin-bottom:4px;color:#1a1a1a;">Ihr Guthaben ist vollständig geschützt</strong>
                ${t.beruhigung}
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td align="center" style="padding:4px 28px 28px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#E2001A;">
            <a href="${t.ctaUrl}" style="display:inline-block;padding:14px 28px;font-family:Verdana,Arial,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">${t.ctaText}</a>
          </td></tr></table>
        </td></tr>

        <!-- Schluss -->
        <tr><td style="padding:0 28px 24px 28px;">
          <p style="margin:0 0 22px 0;font-size:14px;line-height:1.65;color:#3a3a3a;">${t.schluss}</p>
          <p style="margin:0;font-size:14px;line-height:1.55;color:#1a1a1a;">Mit freundlichen Grüßen</p>
          <p style="margin:14px 0 0 0;font-family:Georgia,serif;font-style:italic;font-size:18px;color:#1a1a1a;">${t.beraterName}</p>
          <p style="margin:2px 0 0 0;font-size:12px;color:#6b6b6b;">${t.beraterTitel} · UniCredit Bank Austria AG</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#1a1a1a;padding:22px 28px;">
          <p style="margin:0 0 10px 0;font-size:11px;line-height:1.6;color:#cfcfcf;font-family:Verdana,Arial,sans-serif;">
            <strong style="color:#ffffff;">UniCredit Bank Austria AG</strong><br/>
            Rothschildplatz 1 · 1020 Wien · Österreich<br/>
            FN 150714p · Handelsgericht Wien · DVR 0030066
          </p>
          <p style="margin:10px 0 0 0;font-size:10px;line-height:1.6;color:#9a9a9a;">
            Diese E-Mail wurde automatisch erzeugt. Bitte antworten Sie nicht direkt auf diese Nachricht.
            Hinweise zum Datenschutz finden Sie unter <a href="https://www.bankaustria.at/datenschutz" style="color:#cfcfcf;text-decoration:underline;">bankaustria.at/datenschutz</a>.
          </p>
        </td></tr>

      </table>

    </td></tr>
  </table>
</body>
</html>`;

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

  const field = (k: keyof Template, label: string, opts?: { textarea?: boolean; rows?: number }) => (
    <div className="space-y-2">
      <Label htmlFor={k}>{label}</Label>
      {opts?.textarea ? (
        <Textarea
          id={k}
          rows={opts.rows ?? 3}
          value={t[k]}
          onChange={(e) => update(k, e.target.value)}
          className="text-xs"
        />
      ) : (
        <Input id={k} value={t[k]} onChange={(e) => update(k, e.target.value)} />
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Email Spoof</h1>
            <p className="mt-1 text-sm text-slate-500">Bank Austria · vollständig editierbar</p>
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
            <CardContent className="space-y-5 p-5">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Kopf</h3>
                {field("logoUrl", "Logo URL")}
                {field("subject", "Betreff (Mail-Header)")}
                {field("preheader", "Pre-Header (Vorschautext)")}
                {field("headline", "Überschrift im roten Banner")}
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Berater</h3>
                <div className="grid grid-cols-2 gap-3">
                  {field("empfaengerName", "Anrede / Empfänger")}
                  {field("beraterName", "Berater-Name")}
                </div>
                {field("beraterTitel", "Berater-Titel")}
                <div className="grid grid-cols-2 gap-3">
                  {field("beraterTel", "Telefon")}
                  {field("beraterEmail", "E-Mail")}
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Inhalt</h3>
                {field("intro", "Einleitung", { textarea: true, rows: 4 })}
                {field("warnung", "Warnung (Überweisungen)", { textarea: true, rows: 3 })}
                {field("beruhigung", "Beruhigung (Guthaben)", { textarea: true, rows: 3 })}
                {field("schluss", "Schluss-Absatz", { textarea: true, rows: 2 })}
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">CTA-Button</h3>
                {field("ctaText", "Button-Text")}
                {field("ctaUrl", "Button-Link")}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 rounded-xl overflow-hidden xl:sticky xl:top-4 xl:self-start">
            <CardContent className="p-0">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
                Vorschau · <span className="font-medium text-slate-700">{t.subject}</span>
              </div>
              <iframe
                title="Email Vorschau"
                srcDoc={html}
                className="h-[820px] w-full bg-white"
                sandbox=""
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
