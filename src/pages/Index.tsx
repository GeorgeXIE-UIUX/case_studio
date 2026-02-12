import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
// 1. 新增這一行引入 FAQSection
import { FAQSection } from "@/components/sections/FAQSection"; 
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/ui/ScrollToTop"; 
import { SectionSnapScroll } from "@/components/ui/SectionSnapScroll";

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
        <FAQSection /> 
      </main>
      <Footer />
      <ScrollToTop />
      <SectionSnapScroll />
    </div>
  );
};

export default Index;