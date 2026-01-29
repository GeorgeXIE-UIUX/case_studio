import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Sparkles, Palette, Film } from "lucide-react";

type ServiceCategory = "uiux" | "graphic" | "video";

interface PricingItem {
  name: string;
  price: string;
  description: string;
}

interface ServiceDetail {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: ServiceCategory;
  pricing: PricingItem[];
  includes: string[];
}

const services: Record<ServiceCategory, ServiceDetail> = {
  uiux: {
    title: "UI/UX 介面設計",
    subtitle: "App 設計、Web 設計、設計系統",
    icon: Sparkles,
    color: "uiux",
    pricing: [
      {
        name: "Landing Page 專案",
        price: "$8,000 - $15,000+",
        description: "適合活動頁、簡單形象頁",
      },
      {
        name: "完整官網設計",
        price: "$30,000 - $60,000+",
        description: "5-10 頁完整網站設計",
      },
      {
        name: "App 原型設計",
        price: "$3,000 / 頁起",
        description: "按頁計費，含互動原型",
      },
    ],
    includes: [
      "使用者流程圖 (User Flow)",
      "線框稿 (Wireframe)",
      "Figma 原始檔案",
      "RWD 響應式適配",
      "2-3 次修改機會",
    ],
  },
  graphic: {
    title: "平面與社群設計",
    subtitle: "品牌視覺、社群行銷素材",
    icon: Palette,
    color: "graphic",
    pricing: [
      {
        name: "行銷 Banner / 電商圖",
        price: "$800 - $2,500 / 張",
        description: "依數量階梯式折扣",
      },
      {
        name: "社群包月方案",
        price: "$15,000 / 10張",
        description: "含視覺風格設定",
      },
      {
        name: "Logo / 品牌識別",
        price: "$12,000 - $35,000+",
        description: "含完整設計規範",
      },
    ],
    includes: [
      "2-3 次修改機會",
      "多種風格提案",
      "多尺寸輸出",
      "原始設計檔案",
      "品牌識別規範",
    ],
  },
  video: {
    title: "影片剪輯",
    subtitle: "社群短影音、YouTube、商業廣告",
    icon: Film,
    color: "video",
    pricing: [
      {
        name: "直式短影音",
        price: "$2,000 - $5,000 / 支",
        description: "Shorts/Reels（60秒內）",
      },
      {
        name: "YouTube 長影片",
        price: "$6,000 - $12,000 / 支",
        description: "視毛片長度而定",
      },
      {
        name: "商業形象片",
        price: "$20,000+",
        description: "含動態特效、高級調色",
      },
    ],
    includes: [
      "BGM 音樂選用",
      "字幕製作",
      "基本調色處理",
      "轉場特效",
      "2 次修改機會",
    ],
  },
};

const tabConfig: { key: ServiceCategory; label: string }[] = [
  { key: "uiux", label: "UI/UX 設計" },
  { key: "graphic", label: "平面設計" },
  { key: "video", label: "影片剪輯" },
];

export const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>("uiux");
  const currentService = services[activeTab];

  return (
    <section id="services" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            服務項目與<span className="text-gradient">價目表</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            透明化的價格，讓你在諮詢前就能評估預算
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabConfig.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-6 py-3 rounded-xl font-display font-medium transition-all duration-300",
                activeTab === tab.key
                  ? `bg-${tab.key} text-background shadow-lg`
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Service Content */}
        <div className="max-w-5xl mx-auto animate-fade-in" key={activeTab}>
          {/* Service Header */}
          <div className="text-center mb-12">
            <div
              className={cn(
                "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4",
                `bg-${currentService.color}/20`
              )}
            >
              <currentService.icon className={cn("w-8 h-8", `text-${currentService.color}`)} />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
              {currentService.title}
            </h3>
            <p className="text-muted-foreground">{currentService.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pricing Cards */}
            <div className="space-y-4">
              <h4 className="font-display text-lg font-semibold text-muted-foreground mb-4">
                價格方案
              </h4>
              {currentService.pricing.map((item, index) => (
                <div
                  key={item.name}
                  className="card-gradient rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-display font-semibold text-foreground">
                      {item.name}
                    </h5>
                    <span className={cn("font-display font-bold", `text-${currentService.color}`)}>
                      {item.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Includes List */}
            <div className="card-gradient rounded-xl p-8 border border-border/50">
              <h4 className="font-display text-lg font-semibold text-foreground mb-6">
                服務內容包含
              </h4>
              <ul className="space-y-4">
                {currentService.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                        `bg-${currentService.color}/20`
                      )}
                    >
                      <Check className={cn("w-3 h-3", `text-${currentService.color}`)} />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
