import { useEffect, useState } from "react";
import AdminLayout, { useAdminUser } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, List, CheckCircle, Clock, AlertTriangle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatusCounts {
  total: number;
  neu: number;
  inBearbeitung: number;
  erfolgreich: number;
  down: number;
}

function DashboardContent() {
  const user = useAdminUser();
  const navigate = useNavigate();
  const [counts, setCounts] = useState<StatusCounts>({ total: 0, neu: 0, inBearbeitung: 0, erfolgreich: 0, down: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("submissions").select("id, status");
      if (data) {
        setCounts({
          total: data.length,
          neu: data.filter((s) => !s.status || s.status === "Neu").length,
          inBearbeitung: data.filter((s) => s.status === "In Bearbeitung").length,
          erfolgreich: data.filter((s) => s.status === "Erfolgreich").length,
          down: data.filter((s) => s.status === "Down").length,
        });
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const stats = [
    { label: "Gesamt", value: counts.total, icon: FileText, color: "text-slate-600", bg: "bg-slate-100" },
    { label: "Neu", value: counts.neu, icon: List, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "In Bearbeitung", value: counts.inBearbeitung, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Erfolgreich", value: counts.erfolgreich, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Down", value: counts.down, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Willkommen, {user.email}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="cursor-pointer border-slate-200 shadow-sm transition-shadow hover:shadow-md rounded-xl"
            onClick={() => navigate("/admin/logs")}
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? "–" : stat.value}
                </p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const Admin = () => (
  <AdminLayout>
    <DashboardContent />
  </AdminLayout>
);

export default Admin;
