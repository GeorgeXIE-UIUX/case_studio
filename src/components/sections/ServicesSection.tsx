import { useState } from "react";
import { 
  Code, Palette, Smartphone, Check, ChevronDown, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "uiux",
    icon: Palette,
    deco: Star,
    color: "primary", 
    title: "UI/UX 設計",
    description: "以使用者為中心的設計，兼顧美學與操作體驗。",
    items: [
      { name: "使用者研究", price: "NT$ 15k 起" },
      { name: "流程規劃", price: "NT$ 8k 起" },
      { name: "線框圖繪製", price: "NT$ 12k 起" },
      { name: "高保真原型", price: "NT$ 20k 起" },
    ]
  },
  {
    id: "dev",
    icon: Code,
    deco: Star,
    color: "secondary", 
    title: "網站全端開發",
    description: "採用最新 React 技術，打造高效能的現代化網站。",
    items: [
      { name: "一頁式網站", price: "NT$ 25k 起" },
      { name: "企業形象官網", price: "NT$ 45k 起" },
      { name: "CMS 後台管理", price: "NT$ 30k 起" },
      { name: "互動特效開發", price: "NT$ 15k 起" },
    ]
  },
  {
    id: "mobile",
    icon: Smartphone,
    deco: Star,
    color: "accent", 
    title: "行動裝置適配",
    description: "確保網站在手機、平板與桌機上都能完美呈現。",
    items: [
      { name: "RWD 響應式", price: "包含於開發" },
      { name: "PWA 應用", price: "NT$ 15k 起" },
      { name: "行動介面優化", price: "NT$ 10k 起" },
      { name: "跨平台測試", price: "NT$ 5k 起" },
    ]
  },
];

export const ServicesSection = () => {
  const [activeService, setActiveService] = useState<number | null>(0);

  const toggleService = (index: number) => {
    if (activeService === index) {
      setActiveService(null); 
    } else {
      setActiveService(index); 
    }
  };

  return (
    <section id="services" className="relative py-24 bg-transparent overflow-hidden">
      {/* 裝飾氣泡 - 調整顏色透明度 */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full cartoon-card animate-bounce border-none" style={{ animationDuration: '3s' }}/>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/20 rounded-full cartoon-card animate-bounce border-none" style={{ animationDuration: '4s', animationDelay: '1s' }}/>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="font-display text-4xl md:text-6xl tracking-wider">
            我們的專業<span className="text-gradient">服務與方案</span>
          </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-medium bg-white/50 inline-block px-6 py-2 rounded-full border-2 border-dashed border-primary/30">
            透明化的價格，點擊項目查看詳細內容！
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-8">
          {services.map((service, index) => {
            const isActive = activeService === index;
            const colorClass = `bg-${service.color}`;
            const textClass = `text-${service.color}`;
            
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ type: "spring", bounce: 0.3, delay: index * 0.1 }}
                onClick={() => toggleService(index)}
                // ✨ 修改：統一使用 cartoon-card 類別，並移除舊的 ring 樣式以避免衝突
                className={cn(
                  "cartoon-card cursor-pointer overflow-hidden rounded-3xl transition-all duration-300 bg-white",
                  isActive ? `border-${service.color}/50` : "hover:bg-muted/30"
                )}
              >
                {/* 標題區塊 */}
                <motion.div layout="position" className="p-6 md:p-8 flex items-center justify-between relative overflow-hidden">
                  <service.deco className={cn("absolute -right-4 -top-4 w-24 h-24 opacity-10 rotate-12", textClass)} />
                  
                  <div className="flex items-center gap-6 z-10">
                    <div className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors border-2 border-transparent",
                      isActive ? colorClass + " text-white shadow-md" : `bg-${service.color}/30 ` + textClass
                    )}>
                      <service.icon className="h-8 w-8 stroke-[2.5]" />
                    </div>
                    <div className="text-left">
                      <h3 className={cn("text-2xl md:text-3xl font-bold", textClass)}>{service.title}</h3>
                      {!isActive && (
                        <p className="text-lg text-muted-foreground mt-2 md:hidden font-medium">
                          點擊查看詳情...
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0, scale: isActive ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={cn("w-10 h-10 bg-white border-2 border-muted rounded-full flex items-center justify-center shadow-sm z-10", isActive && `border-${service.color} text-${service.color}`)}
                  >
                    <ChevronDown className="w-6 h-6 stroke-[3]" />
                  </motion.div>
                </motion.div>

                {/* 展開內容區塊 */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-8 pt-0 md:px-8">
                        <div className="w-full h-0 border-t-2 border-dashed border-muted mb-6" />
                        
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
                          {service.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {service.items.map((item, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              // ✨ 修改：子項目也加上可愛的邊框風格
                              className="border-2 border-muted flex justify-between items-center p-4 rounded-2xl bg-white/50 hover:border-primary/50 transition-colors"
                            >
                              <div className="flex items-center gap-3 text-muted-foreground font-bold">
                                <div className={cn("p-1 rounded-full", colorClass)}>
                                  <Check className="w-4 h-4 text-white stroke-[4]" />
                                </div>
                                <span>{item.name}</span>
                              </div>
                              <span className={cn("font-extrabold text-lg", textClass)}>{item.price}</span>
                            </motion.div>
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