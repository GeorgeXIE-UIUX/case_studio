import { useState } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ... 請在此處貼上原本的 portfolioItems 資料 ...
type PortfolioCategory = "all" | "uiux" | "graphic" | "video";

// 這裡假設你已經有 portfolioItems 資料，如果沒有請告訴我，我再補給你
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
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            每個專案背後都有獨特的設計思維與解決方案
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={cn(
                "px-5 py-2.5 rounded-full font-medium transition-all duration-300 border",
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div 
          layout 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }} // 確保每次滑動回來都顯示
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden bg-card cursor-pointer border border-border/50"
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 bg-primary text-primary-foreground">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300">{item.client}</p>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                  {item.isVideo ? (
                    <Play className="w-5 h-5 text-white" />
                  ) : (
                    <ExternalLink className="w-5 h-5 text-white" />
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