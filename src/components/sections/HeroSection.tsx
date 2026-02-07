import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    // ✨ 修改 1：移除 "overflow-hidden"
    // 這樣背景的光暈就可以自然地「滿」出來，延伸到下一個區塊，不會被切斷
    <section className="relative min-h-[90vh] flex items-center justify-center bg-transparent py-20">
      
      {/* 背景裝飾 */}
      {/* ✨ 修改 2：這裡也移除 "overflow-hidden" */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 左上角粉色光暈 */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[80px]" 
        />
        
        {/* ✨ 修改 3：把黃色光暈放回右下角 (bottom-[-10%]) */}
        {/* 因為拿掉了 overflow-hidden，它現在會自然地蓋到下一個區塊上面，形成完美融合 */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[80px]" 
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          >
            {/* 可愛標籤：改為圓角方形 rounded-xl */}
            <div className="inline-block rounded-xl bg-accent px-4 py-2 text-sm font-bold text-accent-foreground mb-6 cartoon-card rotate-[-3deg]">
              ✨ 噠啦！重新定義您的數位體驗
            </div>
            
            <h1 className="font-display text-4xl font-extrabold tracking-wide sm:text-5xl md:text-6xl lg:text-8xl relative z-10">
              打造讓客戶 <br />
              <span className="text-gradient relative inline-block mt-2">
                無法拒絕
                <svg className="absolute w-full h-4 -bottom-2 left-0 text-accent z-[-1]" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 25 0, 50 10 T 100 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </span> <br/> 的品牌形象
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cartoon-card bg-white mx-auto max-w-[700px] py-8 px-10 rounded-3xl"
          >
            <p className="text-muted-foreground md:text-xl font-medium leading-relaxed">
              我們不僅僅是設計網站，更是為您打造全方位的數位解決方案。
              從使用者研究到技術開發，讓您的品牌價值最大化！
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 min-w-[200px] pt-4 pb-4"
          >
            <Button size="lg" className="cartoon-card bg-primary text-primary-foreground text-xl px-10 py-8 rounded-full font-bold hover:bg-primary/90 hover:-translate-y-1 transition-transform border-none">
              開始專案！
              <ArrowRight className="ml-3 h-6 w-6 stroke-[3]" />
            </Button>
            <Button variant="outline" size="lg" className="cartoon-card bg-white text-primary text-xl px-10 py-8 rounded-full font-bold hover:bg-muted hover:text-primary hover:-translate-y-1 transition-transform border-2 border-primary/20">
              瀏覽作品集
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* ✨ 修改 4：移除了之前那個失敗的漸層遮罩 (bg-gradient-to-t) */}
      
    </section>
  );
};