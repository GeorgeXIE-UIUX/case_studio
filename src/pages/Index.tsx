import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
// 1. 引入元件
import { ScrollToTop } from "@/components/ui/ScrollToTop"; 

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* 2. 放置在最外層 */}
      <ScrollToTop />
    </div>
  );
};

export default Index;