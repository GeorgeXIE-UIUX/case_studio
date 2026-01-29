import { Zap, Target, Users } from "lucide-react";

const highlights = [
  {
    icon: Zap,
    title: "跨領域整合",
    description: "能同時處理 UI 介面與影片剪輯，為品牌提供一致的視覺語言。",
  },
  {
    icon: Target,
    title: "結果導向",
    description: "不只追求美觀，更注重設計能否達成商業目標與使用者需求。",
  },
  {
    icon: Users,
    title: "高效溝通",
    description: "標準化的合作流程，確保專案順利推進、按時交付。",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              關於<span className="text-gradient">我</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              擁有多年設計經驗的跨領域設計師，專注於將 UI/UX 設計、平面視覺與動態影像完美整合。
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              從使用者體驗的角度出發，打造不只美觀、更能解決問題的設計作品。
              無論是品牌形象建立、數位產品設計，還是行銷內容製作，
              都能提供完整的一站式解決方案。
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <span className="font-display text-3xl font-bold text-primary">50+</span>
                <p className="text-sm text-muted-foreground mt-1">完成專案</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">30+</span>
                <p className="text-sm text-muted-foreground mt-1">合作客戶</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">5+</span>
                <p className="text-sm text-muted-foreground mt-1">年經驗</p>
              </div>
            </div>
          </div>

          {/* Right Content - Highlights */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="card-gradient rounded-2xl p-6 border border-border/50 flex gap-5 animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
