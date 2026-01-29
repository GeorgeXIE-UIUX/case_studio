import { Palette, Monitor, Film, ArrowRight, FileText, Calendar, MessageSquare } from "lucide-react";

const services = [
  {
    id: "uiux",
    label: "UI/UX 設計",
    description: "App 設計、Web 設計、設計系統",
    icon: Monitor,
    color: "uiux",
    formUrl: "https://forms.google.com/uiux", // Replace with actual Google Form URL
  },
  {
    id: "graphic",
    label: "平面設計",
    description: "品牌視覺、社群素材、Logo 設計",
    icon: Palette,
    color: "graphic",
    formUrl: "https://forms.google.com/graphic", // Replace with actual Google Form URL
  },
  {
    id: "video",
    label: "影片剪輯",
    description: "短影音、YouTube、商業形象片",
    icon: Film,
    color: "video",
    formUrl: "https://forms.google.com/video", // Replace with actual Google Form URL
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
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">聯絡詢價</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            選擇你需要的服務類型，填寫專屬表單，我將在 24 小時內回覆你
          </p>
        </div>

        {/* Why Fill Form Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="card-gradient rounded-2xl p-8 border border-border/50">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 text-center">
              📋 為什麼需要填寫表單？
            </h3>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              為了提供更精準的報價與服務建議，我需要了解你的專案細節。
              <br />
              完整的資訊有助於縮短溝通時間，讓合作更順利！
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {formRequirements.map((req, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <req.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    {req.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {req.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-gradient rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary)_/_0.15)] flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 rounded-2xl bg-${service.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                style={{
                  backgroundColor: `hsl(var(--${service.color}) / 0.2)`,
                }}
              >
                <service.icon
                  className="w-10 h-10"
                  style={{ color: `hsl(var(--${service.color}))` }}
                />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {service.label}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                {service.description}
              </p>

              {/* CTA */}
              <div
                className="inline-flex items-center gap-2 font-medium transition-all duration-300 group-hover:gap-3"
                style={{ color: `hsl(var(--${service.color}))` }}
              >
                填寫表單詢價
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

        {/* Alternative Contact */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            有其他問題或偏好直接聯繫？
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="mailto:hello@studio.design"
              className="text-primary hover:underline"
            >
              📧 hello@studio.design
            </a>
            <span className="text-primary">
              💬 LINE: @studio_design
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
