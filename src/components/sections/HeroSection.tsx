import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent pt-20">

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} 
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              打造讓客戶 <br />
              <span className="text-primary">無法拒絕</span> 的品牌形象
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-[700px] text-muted-foreground md:text-xl py-6"
          >
            我們不僅僅是設計網站，更是為您打造全方位的數位解決方案。
            從使用者研究到技術開發，讓您的品牌價值最大化。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 min-w-[200px]"
          >
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              開始專案
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              瀏覽作品集
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};