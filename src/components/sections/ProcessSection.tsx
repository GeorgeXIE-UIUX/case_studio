import { motion, Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  { id: "01", title: "需求探索", subtitle: "研究與深度訪談", desc: "深入了解您的品牌願景與核心價值，釐清市場定位。" },
  { id: "02", title: "策略規劃", subtitle: "產品架構與流程", desc: "制定精確的產品藍圖，確保使用者體驗流暢無阻。" },
  { id: "03", title: "設計開發", subtitle: "介面與互動設計", desc: "將策略轉化為具備美感且直觀的數位介面。" },
  { id: "04", title: "工程實作", subtitle: "技術實作與優化", desc: "使用先進技術開發，確保系統效能與穩定度極大化。" }
];

const LINE_DURATION = 3; 
const STAGGER_DELAY = LINE_DURATION / (steps.length - 1);

const springTransition = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };
const revealVariants: Variants = { hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)", transition: springTransition } };
const fadeUpVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: springTransition } };

// Desktop 動畫 (保持原樣：交錯顯示)
const desktopSectionVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } } };
const desktopGridVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: STAGGER_DELAY, delayChildren: 0 } } };

// Mobile 動畫 (簡化版：全部一起淡入)
const mobileGridVariants: Variants = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
};

// 線條動畫 (僅電腦版水平線使用)
const lineVariants: Variants = { hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { delay: 0.1, duration: LINE_DURATION, ease: "linear" } } };

// 項目動畫
const stepItemVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

// 圓點動畫
const dotVariants: Variants = { hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, backgroundColor: "hsl(var(--background))", borderColor: "rgba(255,255,255,1)", transition: { type: "spring", stiffness: 300, damping: 20 } } };

export const ProcessSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="process" className="py-10 md:py-16 bg-background relative overflow-hidden lg:h-screen lg:min-h-0 lg:py-0 lg:flex lg:flex-col lg:justify-center">
      <div className="container px-6 mx-auto relative z-10 lg:scale-[0.85] xl:scale-100 lg:origin-center transition-transform duration-300">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16">
          <div>
            <motion.h2 
              variants={revealVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false }} 
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight py-2 w-fit md:whitespace-nowrap pr-2"
            >
              從概念到 <span className="text-gray-600">現實。</span>
            </motion.h2>
          </div>
        </div>

        <motion.div 
          className="relative" 
          variants={isMobile ? undefined : desktopSectionVariants} // 手機版移除外層 stagger
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* =======================
              線條 (Line) 
             ======================= */}
          
          {/* 1. 電腦版水平線 (保持原樣) */}
          <motion.div variants={lineVariants} className="absolute top-3 left-0 w-full h-[2px] bg-[#0071e3] origin-left hidden md:block z-0 shadow-[0_0_10px_rgba(0,113,227,0.8)]" />

          {/* 2. 手機版垂直線 (新增：模擬 PC 風格的藍線) */}
          {/* 定位在左側圓點的中心線上 (left-[11px] 對應圓點寬度中心) */}
          <div className="absolute top-2 left-[11px] w-[2px] h-[calc(100%-20px)] bg-[#0071e3]/50 md:hidden z-0" />


          {/* =======================
              內容網格 (Grid)
             ======================= */}
          <motion.div 
             variants={isMobile ? mobileGridVariants : desktopGridVariants}
             className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={stepItemVariants} 
                className="relative group flex flex-col md:block pl-10 md:pl-0"
              >
                {/* 圓點 (Dot) 
                   手機版：absolute left-0 (垂直置中對齊線條)
                   電腦版：static / absolute (水平對齊線條)
                */}
                <motion.div 
                  variants={dotVariants} 
                  className="absolute left-0 top-1 md:static md:left-auto md:top-auto flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full border border-white bg-background z-10 md:mb-8"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                </motion.div>
                
                {/* 內容區塊 */}
                <div className="md:border-l md:border-white/10 md:pl-4 transition-all duration-300">
                  
                  {/* ID & Title */}
                  <div className="flex items-baseline gap-2 mb-1 md:block md:mb-2">
                    {/* ID: 手機版藍色/小字，電腦版白色/大字/絕對定位 */}
                    <span className="text-lg font-mono text-white font-bold md:text-[#ffffff] md:text-xl md:absolute md:-top-12 md:left-2 md:block">
                      /{step.id}
                    </span>
                    {/* Title: 手機版 text-lg，電腦版 text-2xl */}
                    <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-[#0071e3] transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>

                  {/* Subtitle */}
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2 md:mb-3">
                    {step.subtitle}
                  </span>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};