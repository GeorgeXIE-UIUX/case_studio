import { motion, Variants } from "framer-motion";

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

const sectionVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } } };
const lineVariants: Variants = { hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { delay: 0.1, duration: LINE_DURATION, ease: "linear" } } };
const gridVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: STAGGER_DELAY, delayChildren: 0 } } };
const stepItemVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const dotVariants: Variants = { hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, backgroundColor: "hsl(var(--background))", borderColor: "rgba(255,255,255,1)", transition: { type: "spring", stiffness: 300, damping: 20 } } };

export const ProcessSection = () => {
  return (
    <section id="process" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        {/* 修改處：items-end 改為 items-start md:items-end，確保手機版標題置左 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
          <div>
            <motion.span variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">執行流程</motion.span>
            <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight py-2 md:whitespace-nowrap">
              從概念到 <span className="text-gray-600">現實。</span>
            </motion.h2>
          </div>
        </div>

        <motion.div 
          className="relative pl-2 md:pl-0" 
          variants={sectionVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div variants={lineVariants} className="absolute top-3 left-0 w-full h-[2px] bg-[#0071e3] origin-left hidden md:block z-0 shadow-[0_0_10px_rgba(0,113,227,0.8)]" />

          <motion.div variants={gridVariants} className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-l border-white/10 md:border-l-0 ml-3 md:ml-0">
            {steps.map((step, index) => (
              <motion.div key={index} variants={stepItemVariants} className="relative group pl-8 md:pl-0">
                <motion.div variants={dotVariants} className="absolute -left-[15px] top-0 md:static md:left-auto md:top-auto flex items-center justify-center w-7 h-7 rounded-full border border-white bg-background mb-4 md:mb-8 z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                </motion.div>
                <span className="text-4xl md:text-xl font-bold text-[#ffffff] mb-3 md:mb-4 block font-mono md:absolute md:-top-12 md:left-2">
                  {step.id}
                </span>
                <div className="md:border-l md:border-white/10 md:pl-4 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#0071e3] transition-colors duration-300">{step.title}</h3>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-3">{step.subtitle}</span>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};