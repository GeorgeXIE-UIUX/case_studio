import { Palette, Monitor, Film, ArrowRight, FileText, Calendar, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    id: "uiux",
    label: "UI/UX 設計",
    description: "App 設計、Web 設計、設計系統",
    icon: Monitor,
    color: "uiux",
    formUrl: "https://forms.google.com/uiux", 
  },
  {
    id: "graphic",
    label: "平面設計",
    description: "品牌視覺、社群素材、Logo 設計",
    icon: Palette,
    color: "graphic",
    formUrl: "https://forms.google.com/graphic",
  },
  {
    id: "video",
    label: "影片剪輯",
    description: "短影音、YouTube、商業形象片",
    icon: Film,
    color: "video",
    formUrl: "https://forms.google.com/video",
  },
];

const formRequirements = [
  {
    icon: FileText,
    title: "專案需求說明",
    description: "描述你的專案目標、目標受眾、參考風格等資訊",
  },
  {
    icon: Calendar,
    title: "時程與預算",
    description: "預計完工日期與預算區間，幫助我評估可行性",
  },
  {
    icon: MessageSquare,
    title: "聯絡方式",
    description: "Email 或 LINE 等聯絡資訊，方便後續討論細節",
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-transparent relative">

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">聯絡詢價</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            選擇你需要的服務類型，填寫專屬表單，我將在 24 小時內回覆你
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-muted/30 backdrop-blur-sm rounded-3xl p-8 border border-border/50">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <span className="text-2xl">📋</span> 為什麼需要填寫表單？
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {formRequirements.map((req, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-transparent border border-border flex items-center justify-center mb-4 shadow-sm">
                    <req.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    {req.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {req.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.a
              key={service.id}
              href={service.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }} // 每次滑動觸發
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col items-center text-center overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-${service.color} to-transparent`} />

              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-inner`}
                style={{ backgroundColor: `hsl(var(--${service.color}) / 0.1)` }}
              >
                <service.icon
                  className="w-10 h-10 transition-colors"
                  style={{ color: `hsl(var(--${service.color}))` }}
                />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {service.label}
              </h3>
              <p className="text-muted-foreground text-sm mb-8 px-4">
                {service.description}
              </p>

              <div
                className="mt-auto inline-flex items-center gap-2 font-medium transition-all duration-300 group-hover:gap-3 px-6 py-2 rounded-full bg-muted group-hover:bg-foreground group-hover:text-background"
              >
                填寫表單詢價
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};