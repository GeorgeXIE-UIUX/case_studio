import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "專業服務", href: "#services" },
  { label: "精選作品", href: "#portfolio" },
  { label: "執行流程", href: "#process" },
  { label: "關於我們", href: "#about" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 處理選單開啟時的副作用：鎖定滾動 + 標記 Body
  useEffect(() => {
    if (isMobileMenuOpen) {
      // 1. 鎖定滾動
      document.body.style.overflow = "hidden";
      // 2. 加入標記，方便外部 CSS 隱藏特定元素 (如回到頂部按鈕)
      document.body.setAttribute("data-menu-open", "true");
    } else {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-menu-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-menu-open");
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          // 修改處：將 z-index 提高到 z-[100]，確保 Header 在最上層
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          isScrolled 
            ? "bg-background/80 backdrop-blur-md py-4" 
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-widest text-white z-50 uppercase relative">
            Studio.
          </a>

          {/* Desktop Nav */}
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
              className="rounded-full bg-white text-black hover:bg-gray-200 px-6 font-medium text-xs tracking-wider uppercase" 
              size="sm" 
              asChild
            >
              <a href="#contact">聯繫我們</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-50 relative p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              // 修改處：將 z-index 提高到 z-[99]，確保蓋過回到頂部按鈕 (通常 z-50)
              // 但要小於 Header 的 z-[100]，這樣 X 按鈕才按得到
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[99] flex items-center justify-center"
            >
              <nav className="flex flex-col gap-8 text-center w-full px-6 pt-12">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                    className="text-2xl font-light text-white hover:text-gray-300 transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Button 
                    className="rounded-full bg-white text-black px-16 py-8 text-2xl font-medium" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    asChild
                  >
                    <a href="#contact">立即聯絡</a>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};