import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "專業服務", href: "#services" },
  { label: "精選作品", href: "#portfolio" },
  { label: "執行流程", href: "#process" },
  { label: "關於我們", href: "#about" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-widest text-white z-20 uppercase">
          Studio.
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 link-underline font-medium tracking-wide"
            >
              {item.label}
            </a>
          ))}
          
          <Button 
            className="ml-4 rounded-full bg-white text-black hover:bg-gray-200 px-6 font-medium text-xs tracking-wider uppercase" 
            size="sm" 
            asChild
          >
            <a href="#contact">聯繫我們</a>
          </Button>
        </nav>

        <button
          className="md:hidden text-white z-20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-10 flex items-center justify-center animate-fade-in">
          <nav className="flex flex-col gap-8 text-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-3xl font-light text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="mt-8 rounded-full bg-white text-black px-8 py-6 text-lg" onClick={() => setIsMobileMenuOpen(false)} asChild>
              <a href="#contact">立即聯絡</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};