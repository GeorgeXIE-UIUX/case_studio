import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence, PanInfo, Variants } from "framer-motion";

const portfolioItems = [
  { id: 1, title: "Lumina 應用程式", client: "金融科技領域", category: "uiux", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop" },
  { id: 2, title: "Apex 品牌識別", client: "新創加速器", category: "graphic", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&h=600&fit=crop" },
  { id: 3, title: "Nebula 串流媒體", client: "文化傳媒集團", category: "video", image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop", isVideo: true },
  { id: 4, title: "Zenith 管理系統", client: "軟體服務業", category: "uiux", image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&h=600&fit=crop" },
  { id: 5, title: "Flow 數據系統", client: "硬體科技業", category: "graphic", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" }
];

const filterTabs = [{ key: "all", label: "全部" }, { key: "uiux", label: "介面設計" }, { key: "graphic", label: "平面識別" }, { key: "video", label: "影片動態" }];
const springTransition = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };
const revealVariants: Variants = { hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)", transition: springTransition } };
const fadeUpVariants: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: springTransition } };

export const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  
  const filteredItems = activeFilter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter);
  
  useEffect(() => { setActiveIndex(0); }, [activeFilter]);
  
  const handleNext = () => { setActiveIndex((prev) => (prev + 1) % filteredItems.length); };
  const handlePrev = () => { setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length); };
  
  const onDragEnd = (event: any, info: PanInfo) => { if (info.offset.x < -50) handleNext(); else if (info.offset.x > 50) handlePrev(); };

  const getCardStyle = (index: number) => {
    const total = filteredItems.length;
    if (total === 0) return {};
    let relativeIndex = (index - activeIndex + total) % total;
    if (relativeIndex > total / 2) relativeIndex -= total;
    const distance = Math.abs(relativeIndex);
    const scale = Math.max(0, 1 - distance * 0.2); 
    const xOffset = relativeIndex * 45; 
    const opacity = 1 - (distance * 0.3);

    return {
      x: `calc(-50% + ${xOffset}%)`,
      scale: scale,
      zIndex: 10 - distance,
      opacity: distance > 2 ? 0 : opacity,
      display: distance <= 2 ? "block" : "none"
    };
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-background overflow-hidden min-h-[100dvh] snap-start snap-always scroll-mt-0">
      <div className="container mx-auto px-6 relative z-10">
        {/* 修改處 1：items-end 改為 items-start md:items-end，修正手機版標題靠右的問題 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-0">
          <div>
            <motion.span variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">作品展示</motion.span>
            <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight py-2 md:whitespace-nowrap">
              精選 <span className="text-gray-600">作品集。</span>
            </motion.h2>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {filterTabs.map((tab) => (<button key={tab.key} onClick={() => setActiveFilter(tab.key)} className={cn("px-4 py-2 text-xs md:text-sm font-medium rounded-full border transition-all duration-300", activeFilter === tab.key ? "bg-white text-black border-white" : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white")}>{tab.label}</button>))}
          </div>
        </div>
        
        {/* 修改處 2：縮小容器高度 h-[220px] (手機) / h-[400px] (桌機)，消除下方過多留白 */}
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ ...springTransition, delay: 0.3 }} className="relative h-[220px] md:h-[400px] flex items-start justify-center w-full max-w-5xl mx-auto perspective-1000">
          <div className="relative w-full h-full flex items-start justify-center">
            <AnimatePresence initial={false}>
              {filteredItems.map((item, index) => {
                  const style: any = getCardStyle(index);
                  if (style.display === "none") return null;
                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => setActiveIndex(index)}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={onDragEnd}
                      animate={{ x: style.x, scale: style.scale, zIndex: style.zIndex, opacity: style.opacity }}
                      whileHover={{ scale: style.zIndex === 10 ? 1.02 : style.scale + 0.05 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="absolute left-1/2 top-0 w-[260px] md:w-[500px] aspect-[4/3] rounded-2xl shadow-2xl origin-center touch-pan-y"
                      style={{ cursor: style.zIndex === 10 ? "default" : "pointer", zIndex: style.zIndex }}
                    >
                      <div className="w-full h-full relative overflow-hidden rounded-2xl bg-gray-900 border border-white/10 group select-none">
                         <img src={item.image} alt={item.title} className="w-full h-full object-cover pointer-events-none" />
                         <div className={cn("absolute inset-0 transition-colors duration-500", style.zIndex === 10 ? "bg-black/0" : "bg-black/50")} />
                         
                         <div className={cn("absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/90 to-transparent text-white transition-opacity duration-300", style.zIndex === 10 ? "opacity-100" : "opacity-0")}>
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-xs font-mono text-[#0071e3] mb-2 block uppercase tracking-widest">{item.category}</span>
                                    <h3 className="text-xl md:text-3xl font-bold mb-1 tracking-tight">{item.title}</h3>
                                    <p className="text-gray-400 text-xs md:text-sm">{item.client}</p>
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0">
                                    {item.isVideo ? <Play size={20} fill="currentColor" /> : <ExternalLink size={20} />}
                                </div>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* 修改處 3：縮小上方 margin (mt-4 -> mt-2) */}
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ ...springTransition, delay: 0.4 }} className="flex justify-center gap-3 mt-2 relative z-20">
          {filteredItems.map((_, index) => (<button key={index} onClick={() => setActiveIndex(index)} className={cn("w-2 h-2 rounded-full transition-all duration-300", index === activeIndex ? "bg-white w-6" : "bg-white/20 hover:bg-white/50")} aria-label={`Go to slide ${index + 1}`} />))}
        </motion.div>
      </div>
    </section>
  );
};