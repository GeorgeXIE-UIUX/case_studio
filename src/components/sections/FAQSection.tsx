import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  { id: "01", question: "專案通常需要多長時間？", answer: "一般 Landing Page 約 2-3 週；形象官網約 4-6 週；大型系統開發則需 8 週以上。" }, 
  { id: "02", question: "你們提供後續維護嗎？", answer: "上線後享有 30 天免費維修保固。之後我們也提供靈活的年度維護合約。" }, 
  { id: "03", question: "我需要準備什麼資料？", answer: "品牌識別手冊 (Logo)、產品介紹文案、高品質圖片素材，以及您偏好的風格參考。" }, 
  { id: "04", question: "付款方式如何計算？", answer: "簽約後支付 50% 訂金，完成開發並通過驗收後支付剩餘的 50% 尾款。" }
];

const springTransition = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };
const revealVariants: Variants = { hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)", transition: springTransition } };
const fadeUpVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: springTransition } };

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20">
          <div>
            <motion.span variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">常見問答</motion.span>
            <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight w-fit pr-8 py-2">
              常見 <span className="text-gray-600">問題。</span>
            </motion.h2>
          </div>
        </div>
        <div className="w-full border-t border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={index} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} transition={{ delay: index * 0.1, ...springTransition }} className="border-b border-white/10">
                <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full py-6 md:py-8 grid grid-cols-[auto_1fr_auto] gap-x-4 md:gap-x-16 items-start text-left group cursor-pointer">
                  <span className="text-sm font-mono text-gray-600 pt-1 md:pt-2 min-w-[24px] md:min-w-[30px]">/{faq.id}</span>
                  <span className={cn("text-xl md:text-3xl font-medium transition-colors duration-300", isOpen ? "text-white" : "text-gray-400 group-hover:text-white")}>{faq.question}</span>
                  <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-0.5 md:mt-0", isOpen ? "bg-white text-black rotate-180" : "text-gray-400 group-hover:border-white/50 group-hover:text-white")}>{isOpen ? <Minus size={16} /> : <Plus size={16} />}</div>
                </button>
                <AnimatePresence>
                  {isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden"><div className="grid grid-cols-[auto_1fr_auto] gap-x-4 md:gap-x-16 pb-8 md:pb-12"><div className="invisible text-sm font-mono min-w-[24px] md:min-w-[30px]">/{faq.id}</div><p className="text-gray-400 text-base md:text-lg leading-relaxed col-start-2 col-end-3">{faq.answer}</p></div></motion.div>)}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};