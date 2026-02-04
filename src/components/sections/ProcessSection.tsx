import { motion } from "framer-motion";
import { MessageSquare, FileText, PenTool, Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: MessageSquare,
    title: "需求諮詢",
    desc: "填寫表單或安排 15 分鐘線上會談，了解你的專案需求與目標。",
    // ✨ 修改：統一使用主題色名稱
    color: "primary", 
  },
  {
    icon: FileText,
    title: "報價簽約",
    desc: "確認專案範疇與報價，支付 50% 定金後正式啟動專案。",
    color: "secondary",
  },
  {
    icon: PenTool,
    title: "設計執行",
    desc: "提供初稿設計，依據回饋進行 2-3 次修正，直到滿意為止。",
    color: "accent",
  },
  {
    icon: Send,
    title: "交付尾款",
    desc: "設計定稿後支付尾款，移交所有設計檔案與原始檔。",
    color: "success",
  },
];

export const ProcessSection = () => {
  return (
    <section id="process" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container px-4 md:px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl tracking-wider mb-6">
            <span className="text-gradient">合作流程</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-medium bg-white/50 inline-block px-6 py-2 rounded-full border-2 border-dashed border-primary/30">
            標準化的流程讓合作更順暢，確保每個專案都能如期高質量交付
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group"
            >
              {/* 連接線 */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-muted/50 z-0 transform -translate-y-1/2">
                   <ArrowRight className="absolute -right-2 -top-2.5 text-muted/50 w-6 h-6" />
                </div>
              )}

              <div className="cartoon-card h-full bg-white rounded-3xl p-6 flex flex-col items-center text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
                
                <div className={cn(
                  "absolute -top-3 -left-3 w-12 h-12 flex items-center justify-center font-display font-bold text-xl shadow-sm z-20",
                  "rounded-full bg-white border-2 border-border text-primary"
                )}>
                   0{index + 1}
                </div>

                {/* ✨ 修改：這裡的寫法現在跟其他區塊完全統一了 */}
                <div className={cn(
                  "w-20 h-20 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-300 border-2 border-transparent",
                  "transform -rotate-12 group-hover:rotate-[0deg] group-hover:scale-110", 
                  // 統一使用 bg-{color}/20 和 text-{color}
                  `bg-${step.color}/20`, 
                  `text-${step.color}`
                )}>
                  <step.icon className="w-10 h-10 stroke-[2.5]" />
                </div>

                <h3 className={cn("font-display text-2xl font-bold mb-4", `text-${step.color}`)}>
                  {step.title}
                </h3>

                <p className="text-muted-foreground font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};