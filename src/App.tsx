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
      {/* ✨ 全域統一背景 (Global Background) ✨ */}
      <div className="fixed inset-0 -z-10 bg-background overflow-hidden pointer-events-none">
        {/* 左上角光暈 - 增強版 */}
        {/* 改成 bg-primary/20 (更亮)，移除 opacity-70 */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        
        {/* 右下角光暈 - 增強版 */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        
        {/* 中間點綴 - 增強版 */}
        <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
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