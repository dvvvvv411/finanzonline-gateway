import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-600">Laden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <h1 className="py-8 text-center text-xl font-bold text-black md:py-12 md:text-2xl">
        Admin-Bereich
      </h1>

      <div className="container mx-auto px-4 pb-8">
        <div className="mx-auto max-w-lg border border-[#ccc] bg-white p-6">
          <p className="mb-4 text-sm text-gray-800">
            Willkommen, <b>{user?.email}</b>
          </p>
          <p className="mb-6 text-sm text-gray-600">
            Sie sind als Administrator angemeldet.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/admin/logs")}
              className="rounded-none bg-[#00436b] text-white hover:bg-[#003555]"
            >
              Logs anzeigen
            </Button>
            <Button
              onClick={handleLogout}
              className="rounded-none bg-[#E6320F] text-white hover:bg-[#c42a0d]"
            >
              Abmelden
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
