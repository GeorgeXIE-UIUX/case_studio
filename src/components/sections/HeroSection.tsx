import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden snap-start snap-always scroll-mt-0">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[490px] md:h-[490px] bg-blue-500/20 rounded-full blur-[60px] md:blur-[80px] opacity-30 animate-pulse" />
      </div>

      <div className="container px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-gray-300 mb-6 backdrop-blur-sm">
            重新定義數位體驗
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.15] md:leading-[1.1]">
            將您的願景轉化為
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 block md:inline mt-2 md:mt-0">
               數位現實
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed px-2 md:px-4">
            我們結合美學設計與尖端技術，為您的品牌打造獨一無二的數位足跡。從網站開發到品牌識別，提供全方位的解決方案。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 sm:px-0">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 group text-base w-full sm:w-auto h-12 sm:h-14 rounded-full"
              asChild
            >
              <a href="#contact">
                開始專案
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-base w-full sm:w-auto h-12 sm:h-14 rounded-full"
              asChild
            >
              <a href="#services">了解更多</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};