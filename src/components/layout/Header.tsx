import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "服務項目", href: "#services" },
  { label: "作品集", href: "#portfolio" },
  { label: "合作流程", href: "#process" },
  { label: "關於我", href: "#about" },
  { label: "常見問答", href: "#faq" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/60 backdrop-blur-md shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between relative">
        
        {/* 左側 Logo */}
        <a href="#" className="font-display text-2xl font-bold text-foreground z-20">
          <span className="text-gradient"> GEORGE & MENGPIN STUDIO</span>
        </a>

        {/* 中間導覽列 (絕對置中) */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              // ✨ 修改重點：將 hover:text-foreground 改為 hover:text-primary
              className="text-muted-foreground hover:text-primary transition-colors link-underline font-medium whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 右側 CTA 按鈕 */}
        <div className="hidden md:block z-20">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full px-6" size="lg" asChild>
            <a href="#contact">聯絡詢價</a>
          </Button>
        </div>

        {/* 手機版選單按鈕 */}
        <button
          className="md:hidden text-foreground z-20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 手機版選單 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border border-white/20 shadow-xl mt-4 mx-6 rounded-xl p-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                // ✨ 手機版也可以順便加上 hover:text-primary
                className="text-foreground hover:text-primary font-medium py-2 border-b border-muted last:border-0 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full mt-4 bg-primary text-primary-foreground font-bold rounded-full" onClick={() => setIsMobileMenuOpen(false)} asChild>
              <a href="#contact">聯絡詢價</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};