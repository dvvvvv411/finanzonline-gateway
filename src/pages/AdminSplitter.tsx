import { useMemo, useState } from "react";
import JSZip from "jszip";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Download, FileArchive, Scissors } from "lucide-react";

interface SplitFile {
  name: string;
  content: string;
  count: number;
}

function buildFiles(numbers: string[], chunkSize: number): SplitFile[] {
  const chunks: string[][] = [];
  for (let i = 0; i < numbers.length; i += chunkSize) {
    chunks.push(numbers.slice(i, i + chunkSize));
  }
  const sizeCounts = new Map<number, number>();
  return chunks.map((chunk) => {
    const size = chunk.length;
    const seen = (sizeCounts.get(size) ?? 0) + 1;
    sizeCounts.set(size, seen);
    const name = seen === 1 ? `${size}.txt` : `${size} ${seen}.txt`;
    return { name, content: chunk.join("\n"), count: size };
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const AdminSplitter = () => {
  const [input, setInput] = useState("");
  const [chunkSize, setChunkSize] = useState(1500);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [skipEmpty, setSkipEmpty] = useState(true);
  const [files, setFiles] = useState<SplitFile[]>([]);

  const parsedNumbers = useMemo(() => {
    let lines = input.split(/\r?\n/).map((l) => l.trim());
    if (skipEmpty) lines = lines.filter((l) => l.length > 0);
    if (removeDuplicates) lines = Array.from(new Set(lines));
    return lines;
  }, [input, removeDuplicates, skipEmpty]);

  const handleSplit = (): SplitFile[] | null => {
    if (parsedNumbers.length === 0) {
      toast({ title: "Keine Nummern", description: "Bitte Nummern einfügen.", variant: "destructive" });
      return null;
    }
    if (!chunkSize || chunkSize < 1) {
      toast({ title: "Ungültige Stückelung", description: "Stückelung muss ≥ 1 sein.", variant: "destructive" });
      return null;
    }
    const result = buildFiles(parsedNumbers, chunkSize);
    setFiles(result);
    return result;
  };

  const handleZip = async () => {
    const result = handleSplit();
    if (!result) return;
    const zip = new JSZip();
    result.forEach((f) => zip.file(f.name, f.content));
    const blob = await zip.generateAsync({ type: "blob" });
    const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    downloadBlob(blob, `nummern-split-${ts}.zip`);
    toast({ title: "ZIP erstellt", description: `${result.length} Datei(en) heruntergeladen.` });
  };

  const handleIndividual = () => {
    const result = handleSplit();
    if (!result) return;
    result.forEach((f) => downloadBlob(new Blob([f.content], { type: "text/plain" }), f.name));
    toast({ title: "Download gestartet", description: `${result.length} Datei(en).` });
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-3">
          <Scissors className="h-6 w-6 text-slate-700" />
          <h1 className="text-2xl font-semibold text-slate-900">Splitter</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Nummern (eine pro Zeile)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="436641234567&#10;436641234568&#10;..."
                className="min-h-[600px] font-mono text-sm"
              />
              <p className="text-sm text-slate-500">
                {parsedNumbers.length.toLocaleString("de-AT")} Nummer(n) erkannt
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Einstellungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chunk">Stückelung</Label>
                  <Input
                    id="chunk"
                    type="number"
                    min={1}
                    value={chunkSize}
                    onChange={(e) => setChunkSize(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="dup"
                    checked={removeDuplicates}
                    onCheckedChange={(v) => setRemoveDuplicates(!!v)}
                  />
                  <Label htmlFor="dup" className="cursor-pointer">Duplikate entfernen</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="empty"
                    checked={skipEmpty}
                    onCheckedChange={(v) => setSkipEmpty(!!v)}
                  />
                  <Label htmlFor="empty" className="cursor-pointer">Leere Zeilen ignorieren</Label>
                </div>
                <div className="space-y-2 pt-2">
                  <Button onClick={handleZip} className="w-full gap-2">
                    <FileArchive className="h-4 w-4" />
                    Split & ZIP herunterladen
                  </Button>
                  <Button onClick={handleIndividual} variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Einzeln herunterladen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {files.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Erzeugte Dateien ({files.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    {files.map((f, i) => (
                      <li key={i} className="flex justify-between border-b border-slate-100 py-1 last:border-0">
                        <span className="font-mono text-slate-700">{f.name}</span>
                        <span className="text-slate-500">{f.count.toLocaleString("de-AT")}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSplitter;
