import { motion, Variants } from "framer-motion";
import { Monitor, Palette, Video, ArrowRight, Code } from "lucide-react";

const contactCards = [{ id: 1, icon: Monitor, title: "UI/UX 介面設計", desc: "App 應用程式設計、全站網頁規劃、建立設計規範。", link: "#contact-uiux" }, { id: 2, icon: Code, title: "網站開發", desc: "品牌官網、形象網站、前後台系統開發與維護。", link: "#contact-web" }, { id: 3, icon: Palette, title: "平面品牌設計", desc: "企業識別系統 (CIS)、社群素材設計、品牌標誌。", link: "#contact-graphic" }, { id: 4, icon: Video, title: "影像剪輯製作", desc: "商業形象短影音製作、YouTube 影片後製、特效。", link: "#contact-video" }];

const springTransition = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };
const revealVariants: Variants = { hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)", transition: springTransition } };
const fadeUpVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: springTransition } };
const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0 } } };
const cardVariants: Variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { ...springTransition, opacity: { duration: 1.2 } } } };

export const ContactSection = () => {
  return (
    // 修改重點：
    // 1. lg:h-screen lg:py-0: 強制高度且移除內距
    // 2. lg:overflow-hidden: 防止內容溢出
    // 3. flex flex-col justify-center: 確保內容垂直置中
   <section id="contact" className="py-10 md:py-16 bg-background lg:h-screen lg:min-h-0 lg:py-0 lg:overflow-hidden relative flex flex-col justify-center">
      
      {/* 修改重點：
          lg:scale-90 xl:scale-100: 在一般筆電上縮小為 90% 以確保不被切掉，大螢幕恢復 100%
      */}
      <div className="container mx-auto px-6 relative z-10 w-full lg:scale-90 xl:scale-100 lg:origin-center transition-transform duration-300">
        
        {/* 修改重點：lg:mb-10 (大幅減少桌機版標題下方的間距) */}
        <div className="mb-16 md:mb-16 lg:mb-16">
          <div>
            <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight w-fit pr-8 py-2">
              準備好 <span className="text-gray-600">展開合作。</span>
            </motion.h2>
          </div>
        </div>
        
        {/* Grid 佈局：桌機維持 4 欄 (lg:grid-cols-4) */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6">
          {contactCards.map((card) => (
            <motion.div 
              key={card.id} 
              variants={cardVariants} 
              // 修改重點：
              // lg:py-8: 桌機版減少卡片垂直內距 (原本比較高)
              // lg:px-6: 調整水平內距
              className="relative flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-3xl p-6 md:py-12 lg:py-8 lg:px-6"
            >
              {/* 修改重點：lg:mb-6 (減少圖示下方的間距) */}
              <div className="mb-6 md:mb-8 lg:mb-6 relative">
                {/* 修改重點：lg:w-16 lg:h-16 (桌機版稍微縮小圖示容器，節省空間) */}
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 relative flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <card.icon size={28} className="text-white md:w-8 md:h-8 lg:w-7 lg:h-7" />
                </div>
              </div>
              
              {/* 修改重點：lg:text-2xl (桌機版標題字體適度調整) */}
              <h3 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-3 md:mb-4 lg:mb-3 tracking-tight">{card.title}</h3>
              
              {/* 修改重點：lg:mb-6 (減少描述文字下方的間距) */}
              <p className="text-gray-400 mb-8 md:mb-10 lg:mb-6 leading-relaxed max-w-xs mx-auto text-sm md:text-base lg:text-sm">{card.desc}</p>
              
              <a 
                href={card.link} 
                className="mt-auto inline-flex items-center gap-3 px-6 py-2.5 md:px-8 md:py-3 lg:py-2.5 rounded-full border border-white/30 text-white font-medium transition-all duration-300 hover:bg-white hover:text-black hover:border-transparent group/btn text-sm md:text-base"
              >
                立即詢價 
                <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};