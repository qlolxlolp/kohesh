
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import RemoteDetection from "./pages/RemoteDetection";
import LocalDetection from "./pages/LocalDetection";
import SmartMap from "./pages/SmartMap";
import AIAnalysis from "./pages/AIAnalysis";
import Database from "./pages/Database";
import Hardware from "./pages/Hardware";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/remote-detection" element={<RemoteDetection />} />
            <Route path="/local-detection" element={<LocalDetection />} />
            <Route path="/smart-map" element={<SmartMap />} />
            <Route path="/ai-analysis" element={<AIAnalysis />} />
            <Route path="/database" element={<Database />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
