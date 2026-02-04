import { useState } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PortfolioCategory = "all" | "uiux" | "graphic" | "video";

const portfolioItems = [
  {
    id: 1,
    title: "範例專案 1",
    client: "Client A",
    category: "uiux",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "範例專案 2",
    client: "Client B",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop",
  },
   {
    id: 3,
    title: "範例專案 3",
    client: "Client C",
    category: "video",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
    isVideo: true,
  },
];

const filterTabs: { key: PortfolioCategory; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "uiux", label: "UI/UX" },
  { key: "graphic", label: "平面" },
  { key: "video", label: "影片" },
];

export const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("all");

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter); // @ts-ignore

  return (
    <section id="portfolio" className="section-padding bg-transparent relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            精選<span className="text-gradient">作品集</span>
          </motion.h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-medium bg-white/50 inline-block px-6 py-2 rounded-full border-2 border-dashed border-primary/30">
            每個專案背後都有獨特的設計思維與解決方案
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={cn(
                "px-6 py-2 rounded-full font-bold transition-all duration-300 border-2",
                activeFilter === tab.key
                  ? "bg-primary text-white border-primary shadow-lg scale-105"
                  : "bg-white border-transparent text-muted-foreground hover:border-primary/30 hover:bg-white/80"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div 
          layout 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                // ✨ 修改：使用 cartoon-card 樣式
                className="cartoon-card group relative rounded-3xl overflow-hidden bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 bg-primary/10 text-primary border border-primary/20">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">{item.client}</p>
                </div>

                {/* 懸浮按鈕 */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-primary shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                  {item.isVideo ? (
                    <Play className="w-5 h-5 ml-1 fill-current" />
                  ) : (
                    <ExternalLink className="w-5 h-5" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};