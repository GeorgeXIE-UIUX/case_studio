import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const SectionSnapScroll = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionCount, setSectionCount] = useState(0); 
  const isScrolling = useRef(false);
  const isMobile = useIsMobile();

  const getScrollTargets = () => {
    const sections = Array.from(document.querySelectorAll("main > section"));
    const footer = document.querySelector("footer");
    return footer ? [...sections, footer] : sections;
  };

  useEffect(() => {
    // 計算主要 Section 數量 (不含 Footer) 以控制圓點顯示
    const sections = document.querySelectorAll("main > section");
    setSectionCount(sections.length);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      const targets = getScrollTargets();
      if (!targets.length) return;

      e.preventDefault();

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentScroll = window.scrollY;
      
      // 關鍵修正：判斷是否已經到底部
      // 如果 (視窗高度 + 捲動高度) >= 網頁總高度 (容許 10px 誤差)，視為在 Footer
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      let closestIndex = 0;

      if (isAtBottom) {
        // 如果在底部，強制設定為最後一個區塊 (Footer)
        closestIndex = targets.length - 1;
      } else {
        // 否則正常計算距離
        let minDistance = Infinity;
        targets.forEach((el, index) => {
          // @ts-ignore
          const top = el.offsetTop;
          const distance = Math.abs(currentScroll - top);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });
      }

      let nextIndex = closestIndex + direction;

      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex >= targets.length) nextIndex = targets.length - 1;

      if (nextIndex === closestIndex) return;

      scrollToIndex(nextIndex);
    };

    const scrollToIndex = (index: number) => {
      const targets = getScrollTargets();
      if (!targets[index]) return;

      isScrolling.current = true;
      setActiveSection(index);

      // @ts-ignore
      const targetTop = targets[index].offsetTop;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isMobile]);

  if (isMobile) return null;

  // 當在 Footer (activeSection >= sectionCount) 時不顯示圓點
  if (activeSection >= sectionCount) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-row gap-4 hidden lg:flex">
      {Array.from({ length: sectionCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => {
            const targets = getScrollTargets();
            if (targets[index]) {
               // @ts-ignore
              window.scrollTo({ top: targets[index].offsetTop, behavior: "smooth" });
              setActiveSection(index);
            }
          }}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-all duration-300 border border-white/50",
            activeSection === index ? "bg-white scale-125" : "bg-transparent hover:bg-white/30"
          )}
          aria-label={`Scroll to section ${index + 1}`}
        />
      ))}
    </div>
  );
};