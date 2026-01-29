import { MessageSquare, FileCheck, Paintbrush, Send } from "lucide-react";

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

const tools = [
  { name: "Figma", category: "UI/UX" },
  { name: "Photoshop", category: "平面" },
  { name: "Illustrator", category: "平面" },
  { name: "Premiere Pro", category: "影片" },
  { name: "After Effects", category: "動態" },
  { name: "Framer", category: "原型" },
];

export const ProcessSection = () => {
  return (
    <section id="process" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">合作流程</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            標準化的流程讓合作更順暢，確保每個專案都能如期高質量交付
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative card-gradient rounded-2xl p-8 border border-border/50"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}

              <span className="font-display text-5xl font-bold text-primary/20 mb-4 block">
                {step.number}
              </span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tools Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-display text-xl font-semibold text-foreground mb-6">
            設計工具
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="px-4 py-2 rounded-full bg-muted/50 border border-border/50 flex items-center gap-2"
              >
                <span className="text-foreground font-medium">{tool.name}</span>
                <span className="text-xs text-muted-foreground">({tool.category})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
