import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 監聽捲動事件
  useEffect(() => {
    const toggleVisibility = () => {
      // 超過 300px 顯示
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 點擊返回頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "flex h-12 w-12 items-center justify-center rounded-full",
            // 修改處：背景透明、白色邊框、白色箭頭
            "bg-transparent border border-white text-white",
            // 加入一點毛玻璃效果，避免下方文字干擾，但保持空心感
            "backdrop-blur-[2px]", 
            // Hover 效果：變為白色實心，箭頭變黑
            "hover:bg-white hover:text-black",
            "transition-all duration-300 shadow-sm"
          )}
          aria-label="Back to top"
        >
          <ArrowUp size={20} strokeWidth={2.0} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};