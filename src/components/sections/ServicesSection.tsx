import { useState, useMemo, useRef } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  { id: "01", title: "UI/UX 介面設計", desc: "設計流暢的用戶體驗，從使用者研究到介面原型。", items: [{ name: "使用者研究", price: "NT$ 15,000 -" }, { name: "介面設計", price: "NT$ 20,000 -" }, { name: "響應式設計", price: "已包含" }, { name: "後台管理系統", price: "NT$ 15,000 -" }] },
  { id: "02", title: "網頁開發實作", desc: "高品質的程式碼呈現，打造高效能且易維護的網站。", items: [{ name: "形象官網", price: "NT$ 45,000 -" }, { name: "後台管理系統", price: "NT$ 15,000 -" }, { name: "API 串接", price: "NT$ 10,000 -" }, { name: "伺服器架設", price: "NT$ 5,000 -" }] },
  { id: "03", title: "品牌視覺識別", desc: "打造品牌獨特美感，建立完整的企業視覺識別系統。", items: [{ name: "標誌設計", price: "NT$ 15,000 -" }, { name: "企業識別系統", price: "NT$ 30,000 -" }, { name: "名片設計", price: "NT$ 3,000 -" }, { name: "社群素材", price: "NT$ 5,000 -" }] },
  { id: "04", title: "動態影像剪輯", desc: "賦予視覺內容生命力，透過動態影像傳遞品牌價值。", items: [{ name: "動態圖形製作", price: "NT$ 20,000 -" }, { name: "短影音剪輯", price: "NT$ 5,000 -" }, { name: "特效後製", price: "NT$ 8,000 -" }, { name: "腳本企劃", price: "NT$ 5,000 -" }] }
];

const fadeTransition = { duration: 0.4, ease: "easeInOut" as const };

export const ServicesSection = () => {
  const [activeId, setActiveId] = useState("01");
  // 1. 建立 ref 來追蹤每個項目的位置
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeService = useMemo(() => services.find(s => s.id === activeId), [activeId]);
  const otherServices = useMemo(() => services.filter(s => s.id !== activeId), [activeId]);

  // 2. 處理手機版點擊：切換狀態 + 自動捲動
  const handleMobileClick = (id: string, index: number) => {
    const isOpening = activeId !== id;
    setActiveId(isOpening ? id : "");

    if (isOpening) {
      // 延遲 300ms 等待展開動畫稍作進行後再捲動，體驗較佳
      setTimeout(() => {
        itemRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center", // 垂直置中
          inline: "nearest"
        });
      }, 300);
    }
  };

  return (
    <section id="services" className="bg-background py-10 md:py-16 lg:h-screen lg:min-h-0 lg:py-0 lg:overflow-hidden flex flex-col justify-center snap-start snap-always scroll-mt-0 relative z-10">
      <div className="container px-6 mx-auto h-full flex flex-col justify-center">
        
        {/* --- Mobile View (手風琴樣式) --- */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="mb-8">
            <span className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">專業領域</span>
            <h2 className="text-4xl font-bold tracking-tighter text-white leading-tight w-fit pr-2">
              服務項目 <span className="text-gray-600">方案定價。</span>
            </h2>
          </div>
          {services.map((service, index) => {
             const isActive = activeId === service.id;
             return (
              <div 
                key={service.id} 
                // 3. 綁定 ref
                ref={(el) => (itemRefs.current[index] = el)}
                // 4. 使用一般的 div 與 onClick 確保點擊絕對有效
                onClick={() => handleMobileClick(service.id, index)}
                className={cn("border border-white/10 rounded-2xl p-6 transition-colors duration-300 cursor-pointer", isActive ? "bg-white/5" : "bg-transparent")}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-white">{service.title}</span>
                  {/* 圖示切換：Plus / Minus */}
                  <div className={cn(
                    "w-8 h-8 rounded-full border border-white flex items-center justify-center transition-all duration-300",
                    isActive ? "bg-white text-black" : "bg-transparent text-white" 
                  )}>
                    {isActive ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>
                
                {/* 內容展開動畫 */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0, marginTop: 0 }} 
                      animate={{ height: "auto", opacity: 1, marginTop: 24 }} 
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-4">
                        {service.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-300">{item.name}</span>
                            <span className="text-[#0071e3] font-mono">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
             )
          })}
        </div>

        {/* --- Desktop View (左右分割 7:3) --- */}
        <div className="hidden lg:flex flex-col w-full h-auto justify-center">
          
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-5xl xl:text-6xl font-bold tracking-tighter text-white leading-tight w-fit whitespace-nowrap pr-2">
              服務項目 <span className="text-gray-600">方案定價。</span>
            </h2>
          </div>

          {/* 主要內容區 */}
          <div className="flex w-full items-stretch">
            
            {/* 左側：詳細資訊 (70%) */}
            <div className="flex-[7] pr-8 relative">
               <AnimatePresence mode="wait">
                 {activeService && (
                   <motion.div
                     key={activeService.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     transition={fadeTransition}
                     className="flex flex-col h-full justify-start"
                   >
                      <div className="flex items-baseline gap-4 mb-6">
                        <h3 className="text-4xl font-bold text-white">{activeService.title}</h3>
                      </div>
                      
                      <p className="text-xl text-gray-400 mb-10 w-full leading-relaxed">
                        {activeService.desc}
                      </p>

                      <div className="grid grid-cols-2 gap-6 w-full bg-white/5 border border-white/10 rounded-3xl p-8">
                        {activeService.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                            <span className="text-white text-lg">{item.name}</span>
                            <span className="text-[#0071e3] font-mono text-base">{item.price}</span>
                          </div>
                        ))}
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* 分隔線 */}
            <div className="w-[1px] bg-white/10 mx-8" />

            {/* 右側：列表 (30%) */}
            <div className="flex-[3] pl-8 flex flex-col justify-between">
               {otherServices.map((service) => (
                 <motion.button
                   layoutId={`service-${service.id}`}
                   key={service.id}
                   onClick={() => setActiveId(service.id)}
                   className="group text-left p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-full"
                   whileHover={{ x: 5 }}
                 >
                   <div className="flex justify-between items-center">
                     <div>
                       <h4 className="text-xl font-medium text-gray-300 group-hover:text-white transition-colors">
                         {service.title}
                       </h4>
                     </div>
                     
                     <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                        <Plus size={16} className="text-white" />
                     </div>
                   </div>
                 </motion.button>
               ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};