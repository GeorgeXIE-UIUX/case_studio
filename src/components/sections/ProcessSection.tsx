import { MessageSquare, FileCheck, Paintbrush, Send } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "需求諮詢",
    description: "填寫表單或安排 15 分鐘線上會談，了解你的專案需求與目標。",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "報價簽約",
    description: "確認專案範疇與報價，支付 50% 定金後正式啟動專案。",
  },
  {
    number: "03",
    icon: Paintbrush,
    title: "設計執行",
    description: "提供初稿設計，依據回饋進行 2-3 次修正，直到滿意為止。",
  },
  {
    number: "04",
    icon: Send,
    title: "交付尾款",
    description: "設計定稿後支付尾款，移交所有設計檔案與原始檔。",
  },
];

export const ProcessSection = () => {
  return (
    <section id="process" className="section-padding bg-transparent relative">
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">合作流程</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            標準化的流程讓合作更順暢，確保每個專案都能如期高質量交付
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative rounded-2xl p-8 border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all hover:border-primary/30"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border/50 z-0" />
              )}

              <span className="font-display text-5xl font-bold text-primary/5 mb-4 block absolute top-4 right-4 pointer-events-none">
                {step.number}
              </span>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-inner">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};