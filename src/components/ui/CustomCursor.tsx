import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  direction: number;
  color: string;
}

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  
  const colors = ["#FF69B4", "#FFD700", "#87CEEB"]; 

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cartoon-card")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovering) {
      interval = setInterval(() => {
        const { x, y } = mousePositionRef.current;
        const id = Date.now() + Math.random();
        const randomOffsetX = (Math.random() * 30) - 15; 
        const randomOffsetY = (Math.random() * 30) - 15;

        const newBubble: Bubble = {
          id,
          x: x + randomOffsetX,
          y: y + randomOffsetY,
          size: Math.random() * 15 + 8,
          direction: Math.random() > 0.5 ? 1 : -1,
          color: colors[Math.floor(Math.random() * colors.length)]
        };

        setBubbles((prev) => [...prev, newBubble]);
        setTimeout(() => {
          setBubbles((prev) => prev.filter((b) => b.id !== id));
        }, 1000);
      }, 80);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering]);

  const cursorColor = "#FF69B4"; 

  return (
    <>
      {/* 泡泡層 (不變) */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ opacity: 1, x: bubble.x - bubble.size/2, y: bubble.y - bubble.size/2, scale: 0.5 }}
            animate={{ opacity: 0, y: bubble.y - 120, x: bubble.x + (bubble.direction * 50), scale: 1.5, rotate: bubble.direction * 90 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "fixed",
              width: bubble.size,
              height: bubble.size,
              borderRadius: "50%",
              backgroundColor: bubble.color,
              pointerEvents: "none",
              zIndex: 9997,
            }}
          />
        ))}
      </AnimatePresence>

      {/* 內圈：實心粉色愛心 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ color: cursorColor }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 0.5 : 1,
          rotate: isHovering ? [0, -10, 10, 0] : 0,
        }}
        // ✨ 修改重點 1：調高 stiffness (300 -> 500) 和 damping (15 -> 25)
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </motion.div>

      {/* 外圈：透明白色大愛心 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ color: "white" }} 
        animate={{
          x: mousePosition.x - 28,
          y: mousePosition.y - 28,
          scale: isHovering ? 1.8 : 1,
          rotate: isHovering ? -15 : 0,
        }}
        // ✨ 修改重點 2：調高 stiffness (150 -> 300) 和 damping (15 -> 25)
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="white" fillOpacity={0.4} stroke="#FF69B4" strokeWidth="1">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </motion.div>
    </>
  );
};