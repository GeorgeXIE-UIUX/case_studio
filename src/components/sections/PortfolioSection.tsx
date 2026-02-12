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
    <section id="portfolio" className="bg-background overflow-hidden relative">
      {/* 修改重點：
          1. py-16 -> py-10 (手機縮小間距)
          2. md:py-0 -> md:py-16 (平板不強制歸零，維持舒適間距)
          3. md:h-screen -> lg:h-screen (平板不強制全螢幕，只有電腦版才全螢幕)
          4. lg:py-0 (電腦版因為是 flex center，所以 padding 歸零)
      */}
      <div className="w-full py-10 md:py-16 lg:py-0 lg:h-screen flex flex-col justify-center">
        
        {/* 修改重點：
            gap-12 -> gap-8 (手機版標題跟卡片近一點)
            md:gap-16 -> md:gap-12 (平板/電腦版也稍微緊湊一點)
        */}
        <div className="container mx-auto px-6 flex flex-col gap-8 md:gap-12 justify-center">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 shrink-0">
            <div>
              <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight py-2 md:whitespace-nowrap">
                精選 <span className="text-gray-600">作品集。</span>
              </motion.h2>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
              {filterTabs.map((tab) => (<button key={tab.key} onClick={() => setActiveFilter(tab.key)} className={cn("px-4 py-2 text-xs md:text-sm font-medium rounded-full border transition-all duration-300", activeFilter === tab.key ? "bg-white text-black border-white" : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white")}>{tab.label}</button>))}
            </div>
          </div>
          
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ ...springTransition, delay: 0.3 }} className="relative h-[220px] md:h-[400px] flex items-start justify-center w-full max-w-5xl mx-auto perspective-1000 shrink-0">
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
          
        </div>
      </div>
    </section>
  );
};