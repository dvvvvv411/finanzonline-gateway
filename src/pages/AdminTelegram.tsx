import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Send, Plus, ExternalLink, MessageCircle, Bot } from "lucide-react";

interface ChatIdEntry {
  id: string;
  chat_id: string;
  label: string | null;
  domain: string | null;
  created_at: string;
}

const normalizeDomain = (d: string) =>
  d.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "").trim();

function TelegramContent() {
  const [chatIds, setChatIds] = useState<ChatIdEntry[]>([]);
  const [newChatId, setNewChatId] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchChatIds = async () => {
    const { data } = await supabase
      .from("telegram_chat_ids")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setChatIds(data);
  };

  useEffect(() => { fetchChatIds(); }, []);

  const addChatId = async () => {
    if (!newChatId.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("telegram_chat_ids").insert({
      chat_id: newChatId.trim(),
      label: newLabel.trim() || null,
      domain: newDomain.trim() ? normalizeDomain(newDomain) : null,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Chat-ID hinzugefügt" });
      setNewChatId("");
      setNewLabel("");
      setNewDomain("");
      fetchChatIds();
    }
  };

  const removeChatId = async (id: string) => {
    await supabase.from("telegram_chat_ids").delete().eq("id", id);
    toast({ title: "Chat-ID entfernt" });
    fetchChatIds();
  };

  const testChatId = async (chatId: string, entryId: string) => {
    setTestingId(entryId);
    try {
      const { data, error } = await supabase.functions.invoke("notify-telegram", {
        body: { test: true, chat_id: chatId },
      });
      if (error) throw error;
      if (data?.ok) {
        toast({ title: "Test erfolgreich", description: "Nachricht wurde gesendet" });
      } else {
        toast({ title: "Fehler", description: data?.description || "Senden fehlgeschlagen", variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Fehler", description: e.message, variant: "destructive" });
    }
    setTestingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Telegram Benachrichtigungen</h1>
        <p className="mt-1 text-sm text-slate-500">
          Erhalte automatisch eine Nachricht bei jedem neuen Log-Eintrag.
        </p>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5 text-blue-600" />
            Bot einrichten — Anleitung
          </CardTitle>
          <CardDescription>Folge diesen Schritten um den Telegram Bot zu konfigurieren.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-700">
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">1</span>
              <div>
                <p className="font-medium">Bot erstellen</p>
                <p className="text-slate-500">
                  Öffne{" "}
                  <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1">
                    @BotFather <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  auf Telegram und sende <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">/newbot</code>. Folge den Anweisungen und kopiere den Bot-Token.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">2</span>
              <div>
                <p className="font-medium">Token hinterlegen</p>
                <p className="text-slate-500">
                  Füge den Token als Secret <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">TELEGRAM_BOT_TOKEN</code> im{" "}
                  <a href="https://supabase.com/dashboard/project/kpbcgkrizrpwfjrpynig/settings/functions" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1">
                    Supabase Dashboard <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  hinzu.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">3</span>
              <div>
                <p className="font-medium">Chat-ID herausfinden</p>
                <p className="text-slate-500">
                  <strong>Option A:</strong> Starte deinen Bot auf Telegram, sende eine Nachricht, und rufe dann{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs break-all">
                    https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates
                  </code>{" "}
                  im Browser auf. Die Chat-ID steht unter <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">result[0].message.chat.id</code>.
                </p>
                <p className="mt-1 text-slate-500">
                  <strong>Option B:</strong> Schreibe{" "}
                  <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1">
                    @userinfobot <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  oder{" "}
                  <a href="https://t.me/RawDataBot" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1">
                    @RawDataBot <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  an — die antworten mit deiner Chat-ID.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">4</span>
              <div>
                <p className="font-medium">Mehrere Empfänger</p>
                <p className="text-slate-500">
                  Du kannst beliebig viele Chat-IDs hinzufügen. Für <strong>Gruppen</strong>: Bot zur Gruppe hinzufügen, eine Nachricht senden, und die Chat-ID über getUpdates ablesen (negative Zahl wie <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">-1001234567890</code>).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat IDs Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Chat-IDs verwalten
          </CardTitle>
          <CardDescription>Leads werden anhand der Domain an die passende Chat-ID/Gruppe geroutet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add new */}
          <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="chatid" className="text-xs text-slate-600">Chat-ID *</Label>
                <Input id="chatid" placeholder="z.B. -1001234567890" value={newChatId} onChange={(e) => setNewChatId(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="domain" className="text-xs text-slate-600">Domain *</Label>
                <Input id="domain" placeholder="z.B. finanz-portal.net" value={newDomain} onChange={(e) => setNewDomain(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="label" className="text-xs text-slate-600">Label (optional)</Label>
                <Input id="label" placeholder="z.B. Gruppe A" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500">Nur Leads von dieser Domain werden an diese Chat-ID geschickt. Ohne Domain wird nicht gesendet.</p>
              <Button onClick={addChatId} disabled={loading || !newChatId.trim() || !newDomain.trim()} className="gap-2">
                <Plus className="h-4 w-4" /> Hinzufügen
              </Button>
            </div>
          </div>

          {/* List */}
          {chatIds.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">Noch keine Chat-IDs hinzugefügt.</p>
          ) : (
            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {chatIds.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-slate-900">{entry.chat_id}</span>
                      {entry.label && (
                        <span className="text-xs text-slate-400">({entry.label})</span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      Domain: {entry.domain ? <span className="font-mono text-slate-700">{entry.domain}</span> : <span className="italic text-amber-600">nicht gesetzt — empfängt nichts</span>}
                    </div>
                  </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const AdminTelegram = () => (
  <AdminLayout>
    <TelegramContent />
  </AdminLayout>
);

export default AdminTelegram;
