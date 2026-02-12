import { Suspense, lazy } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop"; 
import { SectionSnapScroll } from "@/components/ui/SectionSnapScroll";

// 1. 使用 lazy 動態引入非首屏的區塊
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection").then(module => ({ default: module.ServicesSection })));
const AboutSection = lazy(() => import("@/components/sections/AboutSection").then(module => ({ default: module.AboutSection })));
const ProcessSection = lazy(() => import("@/components/sections/ProcessSection").then(module => ({ default: module.ProcessSection })));
const PortfolioSection = lazy(() => import("@/components/sections/PortfolioSection").then(module => ({ default: module.PortfolioSection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(module => ({ default: module.ContactSection })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(module => ({ default: module.FAQSection })));

// 2. 建立一個簡單的 Loading 佔位元件 (避免載入時畫面閃爍)
const SectionLoader = () => (
  <div className="w-full h-[30vh] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Header />
      <main>
        {/* 首屏維持直接載入，確保開啟速度最快 */}
        <HeroSection />

        {/* 其他區塊用 Suspense 包裹 */}
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
          <PortfolioSection />
          <ProcessSection />
          <AboutSection />
          <ContactSection />
          <FAQSection />
        </Suspense>
      </main>
      <Footer />
      
      <ScrollToTop />
      <SectionSnapScroll />
    </div>
  );
};

export default Index;