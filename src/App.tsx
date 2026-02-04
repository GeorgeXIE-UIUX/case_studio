import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomCursor } from "@/components/ui/CustomCursor";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* ✨ 全域漫畫風格背景 ✨ */}
      <div className="fixed inset-0 -z-10 bg-background overflow-hidden pointer-events-none">
        {/* 背景變亮、變粉 */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primary/30 rounded-full blur-[150px] animate-pulse opacity-80" style={{animationDuration: '8s'}} />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent/30 rounded-full blur-[150px] opacity-70" />
        <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-secondary/30 rounded-full blur-[120px] opacity-60 animate-pulse" style={{animationDuration: '10s'}} />
      </div>

      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;