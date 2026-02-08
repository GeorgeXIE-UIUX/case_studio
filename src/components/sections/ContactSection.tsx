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
    <section id="contact" className="py-16 md:py-24 bg-background min-h-[100dvh] snap-start snap-always scroll-mt-0">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 md:mb-20">
          <div>
            <motion.span variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">啟動專案</motion.span>
            <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight w-fit pr-8 py-2">
              準備好 <span className="text-gray-600">展開合作。</span>
            </motion.h2>
          </div>
        </div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactCards.map((card) => (
            <motion.div key={card.id} variants={cardVariants} className="group relative flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-3xl p-6 md:py-12 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500">
              <div className="mb-6 md:mb-8 relative">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-white/30 transition-all duration-500"><card.icon size={28} className="text-white md:w-8 md:h-8" /></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 tracking-tight">{card.title}</h3>
              <p className="text-gray-400 mb-8 md:mb-10 leading-relaxed max-w-xs mx-auto text-sm md:text-base">{card.desc}</p>
              <a href={card.link} className="mt-auto inline-flex items-center gap-3 px-6 py-2.5 md:px-8 md:py-3 rounded-full border border-white/30 text-white font-medium transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-transparent group/btn text-sm md:text-base">立即詢價 <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" /></a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};