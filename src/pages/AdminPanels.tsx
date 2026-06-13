import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Globe, Pencil } from "lucide-react";
import PanelTypeEditor, { type PanelType } from "@/components/PanelTypeEditor";

interface Panel {
  id: string;
  domain: string;
  type: PanelType;
  created_at: string;
}

const TYPE_LABEL: Record<PanelType, string> = {
  finanzonline: "FinanzOnline",
  klimabonus: "Klimabonus",
  oegk_rueckerstattung: "OEGK-Rückerstattung",
};

const TYPE_OPTIONS: PanelType[] = ["finanzonline", "klimabonus", "oegk_rueckerstattung"];

const AdminPanels = () => {
  const { toast } = useToast();
  const [panels, setPanels] = useState<Panel[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDomain, setNewDomain] = useState("");
  const [newType, setNewType] = useState<PanelType>("finanzonline");
  const [adding, setAdding] = useState(false);
  const [editorType, setEditorType] = useState<PanelType | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("panels")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      setPanels((data || []) as Panel[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    const domain = newDomain.trim().toLowerCase().replace(/^www\./, "");
    if (!domain) return;
    setAdding(true);
    const { error } = await supabase
      .from("panels")
      .insert({ domain, type: newType });
    setAdding(false);
    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      setNewDomain("");
      toast({ title: "Panel hinzugefügt", description: domain });
      load();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Wirklich löschen?")) return;
    const { error } = await supabase.from("panels").delete().eq("id", id);
    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Gelöscht" });
      load();
    }
  };

  const handleTypeChange = async (id: string, type: PanelType) => {
    const { error } = await supabase
      .from("panels")
      .update({ type })
      .eq("id", id);
    if (error) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } else {
      load();
    }
  };

  const TypeRow = ({ t }: { t: PanelType }) => (
    <div className="flex items-center justify-between gap-2 px-2 py-1.5">
      <span>{TYPE_LABEL[t]}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setEditorType(t);
        }}
        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        aria-label={`${TYPE_LABEL[t]} bearbeiten`}
        title="Typ bearbeiten (Favicon)"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Panels</h1>
            <p className="text-sm text-slate-500">
              Verwalten Sie Domains, deren Panel-Typ und das Favicon je Typ.
            </p>
          </div>
        </div>

        {/* Add Form */}
        <div className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">
            Neues Panel hinzufügen
          </h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Domain
              </label>
              <Input
                placeholder="z.B. klima-bonus.at"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Typ
              </label>
              <div className="flex items-center gap-1">
                <Select
                  value={newType}
                  onValueChange={(v) => setNewType(v as PanelType)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_OPTIONS.map((t) => (
                      <SelectItem key={t} value={t} className="p-0">
                        <TypeRow t={t} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setEditorType(newType)}
                  title="Aktuell gewählten Typ bearbeiten"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleAdd}
              disabled={!newDomain.trim() || adding}
              className="md:w-32"
            >
              {adding ? "..." : "Hinzufügen"}
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead className="w-64">Typ</TableHead>
                <TableHead className="w-40">Erstellt</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm text-slate-400 py-8">
                    Laden...
                  </TableCell>
                </TableRow>
              )}
              {!loading && panels.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm text-slate-400 py-8">
                    Keine Panels vorhanden.
                  </TableCell>
                </TableRow>
              )}
              {panels.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.domain}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Select
                        value={p.type}
                        onValueChange={(v) => handleTypeChange(p.id, v as PanelType)}
                      >
                        <SelectTrigger className="h-9 flex-1">
                          <SelectValue>{TYPE_LABEL[p.type]}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {TYPE_OPTIONS.map((t) => (
                            <SelectItem key={t} value={t} className="p-0">
                              <TypeRow t={t} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditorType(p.type)}
                        title="Typ bearbeiten (Favicon)"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {new Date(p.created_at).toLocaleDateString("de-DE")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {editorType && (
        <PanelTypeEditor
          open={!!editorType}
          onOpenChange={(open) => {
            if (!open) setEditorType(null);
          }}
          type={editorType}
          typeLabel={TYPE_LABEL[editorType]}
        />
      )}
    </AdminLayout>
  );
};

export default AdminPanels;
