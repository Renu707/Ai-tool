import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Index";
import CategoryPage from "./pages/category/[id]";
import AIAssistant from "./pages/ai-assistant";
import SmartRecommendations from "./pages/smart-recommendations";
import ToolStacks from "./pages/tool-stacks";
import InteractiveWorkflow from "./pages/workflows";
import CompareTools from "./pages/compare";
import ToolOfDay from "./pages/tool-of-day";
import AddTool from "./pages/submit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/smart-recommendations" element={<SmartRecommendations />} />
          <Route path="/tool-stacks" element={<ToolStacks />} />
          <Route path="/workflows" element={<InteractiveWorkflow />} />
          <Route path="/compare" element={<CompareTools />} />
          <Route path="/tool-of-day" element={<ToolOfDay />} />
          <Route path="/submit" element={<AddTool />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
