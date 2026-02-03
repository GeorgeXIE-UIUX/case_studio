import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 定義泡泡的資料結構
interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  direction: number; // 控制左右飄移
}

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
  // 使用 Ref 來儲存最新的滑鼠位置，讓 setInterval 可以讀取到最新的座標
  const mousePositionRef = useRef({ x: 0, y: 0 });
  
  // 1. 處理滑鼠移動與偵測 Hover 狀態
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // 更新 State (給畫面渲染用)
      setMousePosition({ x: e.clientX, y: e.clientY });
      // 更新 Ref (給計時器讀取用)
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 偵測是否為可點擊元素
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // 2. ✨ 核心邏輯：連續泡泡產生器 ✨
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovering) {
      // 如果滑鼠在按鈕上，開啟計時器，每 50 毫秒產生一顆泡泡 (可調整快慢)
      interval = setInterval(() => {
        const { x, y } = mousePositionRef.current;
        const id = Date.now() + Math.random();
        
        // 稍微給一點隨機偏移，這樣手不動時，泡泡也會從游標周圍冒出來，比較自然
        const randomOffsetX = (Math.random() * 20) - 10; 
        const randomOffsetY = (Math.random() * 20) - 10;

        const newBubble: Bubble = {
          id,
          x: x + randomOffsetX,
          y: y + randomOffsetY,
          size: Math.random() * 10 + 5, // 大小隨機 5px ~ 15px
          direction: Math.random() > 0.5 ? 1 : -1, // 隨機向左或向右飄
        };

        setBubbles((prev) => [...prev, newBubble]);

        // 1秒後刪除該泡泡
        setTimeout(() => {
          setBubbles((prev) => prev.filter((b) => b.id !== id));
        }, 1000);
      }, 50); // <-- 這裡控制頻率：50ms 產生一顆
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering]);

  const heartColor = "#FF69B4"; // 粉紅色

  return (
    <>
      {/* 1. 泡泡粒子層 */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ 
              opacity: 1, 
              x: bubble.x - bubble.size / 2,
              y: bubble.y - bubble.size / 2, 
              scale: 0.5 
            }}
            animate={{ 
              opacity: 0, 
              y: bubble.y - 100, // 往上飄 100px
              x: bubble.x + (bubble.direction * 40), // 左右飄移幅度
              scale: 1.2 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "fixed",
              width: bubble.size,
              height: bubble.size,
              borderRadius: "50%",
              backgroundColor: heartColor,
              pointerEvents: "none",
              zIndex: 9997,
            }}
          />
        ))}
      </AnimatePresence>

      {/* 2. 內圈：小實心愛心 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ color: heartColor }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 0 : 1, 
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </motion.div>

      {/* 3. 外圈：大果凍愛心 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ color: heartColor }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          opacity: 1, 
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="currentColor"
          fillOpacity={0.2} 
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </motion.div>
    </>
  );
};