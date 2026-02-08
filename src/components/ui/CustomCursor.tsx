import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// 粒子設定
const PARTICLE_LIFETIME = 800; // 粒子存活時間 (ms)
const EMISSION_RATE = 40; // 發射頻率 (ms)，越小越密

// 單個粒子的組件
const Particle = ({ x, y, id }: { x: number; y: number; id: number }) => {
  // 隨機生成噴射方向和距離
  const randomProps = useRef({
    x: (Math.random() - 0.5) * 60, // X 軸擴散範圍
    y: (Math.random() - 0.5) * 60, // Y 軸擴散範圍
    scale: 0.5 + Math.random() * 0.5, // 隨機大小
  }).current;

  return (
    <motion.div
      key={id}
      className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#0071e3] rounded-full pointer-events-none z-[9998]"
      style={{
        x: x, 
        y: y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        opacity: 0,
        scale: randomProps.scale,
        x: x + randomProps.x,
        y: y + randomProps.y,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    />
  );
};

export const CustomCursor = () => {
  // 1. 原始數值 (用於內層圓點 & 粒子發射點，保證精準不晃動)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. 物理慣性數值 (用於外層圓圈，增加質感)
  const springConfig = { damping: 40, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // 粒子系統狀態
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // 強制隱藏原生游標
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".group");

      setIsHovering(!!isClickable);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, isVisible]);

  // 粒子發射器邏輯
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isHovering && isVisible) {
      intervalId = setInterval(() => {
        const newParticle = {
          x: mousePos.current.x,
          y: mousePos.current.y,
          id: Date.now() + Math.random(),
        };

        setParticles((prev) => [...prev, newParticle]);

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, PARTICLE_LIFETIME);

      }, EMISSION_RATE);
    }

    return () => clearInterval(intervalId);
  }, [isHovering, isVisible]);


  if (typeof navigator !== 'undefined' && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0) {
    return null;
  }

  return (
    <>
      <style>{`
        body, a, button, input, textarea, .group {
          cursor: none !important;
        }
      `}</style>

      {/* 1. 中心實心小圓點 (無慣性，絕對精準) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ?1 : 1,
        }}
      />

      {/* 2. 外框空心圓圈 (微慣性，增加優雅感) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? "#0071e3" : "rgba(0, 113, 227, 0.5)", 
          borderWidth: isHovering ? "3px" : "2px",
          backgroundColor: isHovering ? "rgba(0, 113, 227, 0.1)" : "transparent",
        }}
        transition={{
          duration: 0.2, 
        }}
      />

      {/* 3. 連續粒子噴射 */}
      <AnimatePresence>
        {particles.map((particle) => (
          <Particle key={particle.id} x={particle.x} y={particle.y} id={particle.id} />
        ))}
      </AnimatePresence>
    </>
  );
};