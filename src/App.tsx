import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
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
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/raiffeisenbank" element={<Raiffeisenbank />} />
          <Route path="/erstebank" element={<ErsteBank />} />
          <Route path="/bawag" element={<Bawag />} />
          <Route path="/bankaustria" element={<BankAustria />} />
          <Route path="/volksbank" element={<Volksbank />} />
          <Route path="/bank99" element={<Bank99 />} />
          <Route path="/easybank" element={<Easybank />} />
          <Route path="/hyponoe" element={<HypoNoe />} />
          <Route path="/oberbank" element={<Oberbank />} />
          <Route path="/schelhammer" element={<Schelhammer />} />
          <Route path="/bankhausspaengler" element={<BankhausSpaengler />} />
          <Route path="/dolomitenbank" element={<Dolomitenbank />} />
          <Route path="/spardabank" element={<Spardabank />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
