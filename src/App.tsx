import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PartidosPage from "./pages/PartidosPage";
import NoticiasPage from "./pages/NoticiasPage";
import PlantelPage from "./pages/PlantelPage";
import HistoriaPage from "./pages/HistoriaPage";
import TablaPage from "./pages/TablaPage";
import NotFound from "./pages/NotFound";
import LigasJugadas from "./pages/LigasJugadas";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/partidos" element={<PartidosPage />} />
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/plantel" element={<PlantelPage />} />
          <Route path="/historia" element={<HistoriaPage />} />
          <Route path="/tabla" element={<TablaPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/ligas-jugadas" element={<LigasJugadas />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;