import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  { id: "01", title: "UI/UX 介面設計", desc: "設計流暢的用戶體驗", items: [{ name: "使用者研究", price: "NT$ 15,000 -" }, { name: "介面設計", price: "NT$ 20,000 -" }, { name: "響應式設計", price: "已包含" }, { name: "後台管理系統", price: "NT$ 15,000 -" }] },
  { id: "02", title: "網頁開發實作", desc: "高品質的程式碼呈現", items: [{ name: "形象官網", price: "NT$ 45,000 -" }, { name: "後台管理系統", price: "NT$ 15,000 -" }] },
  { id: "03", title: "品牌視覺識別", desc: "打造品牌獨特美感", items: [{ name: "標誌設計", price: "NT$ 15,000 -" }, { name: "企業識別系統", price: "NT$ 30,000 -" }] },
  { id: "04", title: "動態影像剪輯", desc: "賦予視覺內容生命力", items: [{ name: "動態圖形製作", price: "NT$ 20,000 -" }, { name: "短影音剪輯", price: "NT$ 5,000 -" }] }
];

const springTransition = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };
const revealVariants: Variants = { hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)", transition: springTransition } };
const fadeUpVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: springTransition } };

export const ServicesSection = () => {
  const [activeId, setActiveId] = useState<string | null>("01");
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleService = (id: string, index: number) => {
    const isOpening = activeId !== id;
    setActiveId(isOpening ? id : null);
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-background min-h-[100dvh] snap-start snap-always scroll-mt-0">
      <div className="container px-6 mx-auto">
        <div className="mb-12 md:mb-16">
          <div>
            <motion.span variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">專業領域</motion.span>
            <motion.h2 
              variants={revealVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: false }} 
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight py-2 w-fit md:whitespace-nowrap pr-2"
            >
              服務項目 <span className="text-gray-600">方案定價。</span>
            </motion.h2>
          </div>
        </div>
        <div className="flex flex-col">
          {services.map((service, index) => {
            const isActive = activeId === service.id;
            return (
              <motion.div
                key={service.id}
                ref={(el) => (itemRefs.current[index] = el)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeUpVariants}
                transition={{ delay: index * 0.1, ...springTransition }}
                className={cn("group border-t border-white/10 py-8 md:py-10 transition-colors duration-500 cursor-pointer", isActive ? "bg-white/5" : "hover:bg-white/5")}
                onClick={() => toggleService(service.id, index)}
              >
                <div className="container px-4 flex justify-between items-center">
                  <div className="flex items-center gap-4 md:gap-10">
                    <span className={cn("text-sm font-mono transition-colors duration-300 pt-1", isActive ? "text-white" : "text-gray-600 group-hover:text-gray-400")}>/{service.id}</span>
                    <h3 className={cn("text-xl md:text-3xl font-medium transition-colors duration-300", isActive ? "text-white" : "text-gray-400 group-hover:text-white")}>{service.title}</h3>
                  </div>
                  <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4", isActive ? "bg-white text-black rotate-180" : "text-gray-400 group-hover:border-white/50 group-hover:text-white")}>
                    {isActive ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="container px-4 pl-4 md:pl-20 py-6 md:py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                          {service.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                              <span className="text-white text-sm md:text-base">{item.name}</span>
                              <span className="text-[#0071e3] font-mono text-sm whitespace-nowrap ml-4">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};