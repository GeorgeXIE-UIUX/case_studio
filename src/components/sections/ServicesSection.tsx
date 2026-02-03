import { useState } from "react";
import { 
  Code, 
  Palette, 
  Smartphone,
  Check,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "uiux",
    icon: Palette,
    title: "UI/UX 設計",
    description: "以使用者為中心的設計，兼顧美學與操作體驗。",
    items: [
      { name: "使用者研究 (User Research)", price: "NT$ 15,000 起" },
      { name: "流程規劃 (User Flow)", price: "NT$ 8,000 起" },
      { name: "線框圖 (Wireframe)", price: "NT$ 12,000 起" },
      { name: "高保真原型 (Prototype)", price: "NT$ 20,000 起" },
    ]
  },
  {
    id: "dev",
    icon: Code,
    title: "網站全端開發",
    description: "採用最新 React 技術，打造高效能的現代化網站。",
    items: [
      { name: "一頁式網站 (Landing Page)", price: "NT$ 25,000 起" },
      { name: "企業形象官網", price: "NT$ 45,000 起" },
      { name: "CMS 後台管理系統", price: "NT$ 30,000 起" },
      { name: "互動特效開發", price: "NT$ 15,000 起" },
    ]
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "行動裝置適配",
    description: "確保網站在手機、平板與桌機上都能完美呈現。",
    items: [
      { name: "RWD 響應式佈局", price: "包含於開發費" },
      { name: "PWA 漸進式網頁應用", price: "NT$ 15,000 起" },
      { name: "行動版介面優化", price: "NT$ 10,000 起" },
      { name: "跨平台相容性測試", price: "NT$ 5,000 起" },
    ]
  },
];

export const ServicesSection = () => {
  // 預設展開第一個 (index 0)
  const [activeService, setActiveService] = useState<number>(0);

  return (
    // 移除 overflow-hidden 以避免切斷背景 (如果有的話)
    <section id="services" className="relative py-24 bg-transparent">
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            我們的專業<span className="text-primary">服務與方案</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            透明化的價格，點擊項目查看詳細內容
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-6">
          {services.map((service, index) => {
            const isActive = activeService === index;
            
            return (
              <motion.div
                key={service.id}
                layout // 讓容器高度變化時有動畫
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveService(index)}
                className={cn(
                  "cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300",
                  isActive 
                    ? "bg-card/80 border-primary/50 shadow-lg ring-1 ring-primary/20" 
                    : "bg-card/30 border-border/50 hover:bg-card/50 hover:border-primary/30"
                )}
              >
                {/* 標題區塊 (永遠顯示) */}
                <motion.div layout="position" className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                      isActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    )}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      {!isActive && (
                        <p className="text-sm text-muted-foreground mt-1 md:hidden">
                          點擊查看詳情
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted-foreground"
                  >
                    <ChevronDown className="w-6 h-6" />
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
                      <div className="px-6 pb-6 pt-0">
                        <div className="w-full h-px bg-border/50 mb-6" />
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {service.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm p-3 rounded-lg bg-transparent/50">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Check className="w-4 h-4 text-primary" />
                                <span>{item.name}</span>
                              </div>
                              <span className="font-semibold text-foreground">{item.price}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 text-right">
                           <span className="text-xs text-muted-foreground/60">
                            * 點擊其他卡片以切換服務項目
                          </span>
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