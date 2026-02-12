import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const SectionSnapScroll = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);
  const isScrolling = useRef(false);
  const isMobile = useIsMobile();

  // 取得所有可滾動的元素 (Sections + Footer)
  const getScrollTargets = () => {
    const sections = Array.from(document.querySelectorAll("main > section"));
    const footer = document.querySelector("footer");
    return footer ? [...sections, footer] : sections;
  };

  // 核心修正 1：監聽 DOM 變化，確保 Lazy Loading 的區塊載入後能更新數量
  useEffect(() => {
    const updateSectionCount = () => {
      const sections = document.querySelectorAll("main > section");
      setSectionCount(sections.length);
      
      // 同步目前的所在位置 (避免重整頁面後圓點錯亂)
      syncActiveSection();
    };

    // 初始執行一次
    updateSectionCount();

    // 使用 MutationObserver 監聽 <main> 內部的變化
    const observer = new MutationObserver(updateSectionCount);
    const mainElement = document.querySelector("main");
    
    if (mainElement) {
      observer.observe(mainElement, { childList: true, subtree: true });
    }

    // 也要監聽視窗大小改變 (RWD 可能影響高度)
    window.addEventListener("resize", updateSectionCount);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSectionCount);
    };
  }, []);

  // 輔助函式：根據目前捲動位置，計算應該亮哪一顆燈
  const syncActiveSection = () => {
    const targets = getScrollTargets();
    if (!targets.length) return;

    const currentScroll = window.scrollY;
    
    // 判斷是否到底 (Footer)
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
    
    if (isAtBottom) {
      setActiveSection(targets.length - 1);
      return;
    }

    let closestIndex = 0;
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

    setActiveSection(closestIndex);
  };

  // 滾動監聽邏輯 (維持原本的「滾一次切一頁」)
  useEffect(() => {
    if (isMobile) return;

    // 額外加入 scroll 監聽，確保使用拉動捲軸時圓點也會更新
    const handleNativeScroll = () => {
      if (!isScrolling.current) {
        syncActiveSection();
      }
    };
    window.addEventListener("scroll", handleNativeScroll);

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
      
      // 到底部判斷
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      let closestIndex = 0;

      if (isAtBottom && direction > 0) {
         // 已經在底部且繼續往下滑，不做動作
         return; 
      } else if (isAtBottom && direction < 0) {
         // 在底部往上滑，起始點設為 Footer
         closestIndex = targets.length - 1;
      } else {
        // 正常計算最近的區塊
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
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleNativeScroll);
    };
  }, [isMobile]);

  if (isMobile) return null;

  // 只有當 sectionCount 大於 0 (已載入) 且 目前不在 Footer (activeSection < sectionCount) 時才顯示
  if (sectionCount === 0 || activeSection >= sectionCount) return null;

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