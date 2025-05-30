
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
import Routing from "./pages/Routing";
import LocationTracking from "./pages/LocationTracking";
import MachineLearning from "./pages/MachineLearning";
import PatternRecognition from "./pages/PatternRecognition";
import Reports from "./pages/Reports";
import Statistics from "./pages/Statistics";
import Calibration from "./pages/Calibration";
import EquipmentTest from "./pages/EquipmentTest";
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
            <Route path="/routing" element={<Routing />} />
            <Route path="/location-tracking" element={<LocationTracking />} />
            <Route path="/machine-learning" element={<MachineLearning />} />
            <Route path="/pattern-recognition" element={<PatternRecognition />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/calibration" element={<Calibration />} />
            <Route path="/equipment-test" element={<EquipmentTest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
