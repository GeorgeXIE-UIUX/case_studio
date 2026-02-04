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
      {/* ✨ 修改 1：在父容器加上 relative，作為定位的參考點 */}
      <div className="container mx-auto px-6 flex items-center justify-between relative">
        
        {/* 左側 Logo (即使變很長也不會影響中間) */}
        <a href="#" className="font-display text-2xl font-bold text-foreground z-20">
          <span className="text-gradient"> GEORGE & MENGPIN STUDIO</span>
        </a>

        {/* ✨ 修改 2：將 Nav 改為絕對定位 (absolute)，強制鎖定在正中央 */}
        {/* left-1/2 top-1/2: 定位到父容器中心 */}
        {/* -translate-x-1/2 -translate-y-1/2: 修正自身的偏移，達成完美置中 */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors link-underline font-medium whitespace-nowrap"
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

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border border-white/20 shadow-xl mt-4 mx-6 rounded-xl p-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground font-medium py-2 border-b border-muted last:border-0"
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