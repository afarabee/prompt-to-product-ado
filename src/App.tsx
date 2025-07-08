
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WireframePage from "./pages/Wireframe";
import FeatureGenerator from "./pages/FeatureGenerator";
import OCMHub from "./pages/OCMHub";
import QAWorkspace from "./pages/QAWorkspace";
import BacklogIntelligence from "./pages/BacklogIntelligence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/feature-generator" element={<FeatureGenerator />} />
          <Route path="/story-builder" element={<WireframePage />} />
          <Route path="/ocm-hub" element={<OCMHub />} />
          <Route path="/qa-workspace" element={<QAWorkspace />} />
          <Route path="/backlog-intelligence" element={<BacklogIntelligence />} />
          <Route path="/wireframe" element={<WireframePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
