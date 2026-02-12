import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomCursor } from "@/components/ui/CustomCursor";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// 1. 引入 LazyMotion 和 domAnimation
import { LazyMotion, domAnimation } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* 全域背景特效 */}
      <div className="fixed inset-0 -z-10 bg-background overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primary/30 rounded-full blur-[150px] animate-pulse opacity-80" style={{animationDuration: '8s'}} />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent/30 rounded-full blur-[150px] opacity-70" />
        <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-secondary/30 rounded-full blur-[120px] opacity-60 animate-pulse" style={{animationDuration: '10s'}} />
      </div>

      {/* 2. 用 LazyMotion 包裹整個路由，啟用輕量模式 */}
      <LazyMotion features={domAnimation}>
        <CustomCursor />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LazyMotion>

      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;