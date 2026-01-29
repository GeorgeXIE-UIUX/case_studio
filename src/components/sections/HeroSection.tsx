import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Palette, Film } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    label: "UI/UX",
    description: "介面設計",
    color: "uiux" as const,
    href: "#services",
  },
  {
    icon: Palette,
    label: "平面設計",
    description: "品牌視覺",
    color: "graphic" as const,
    href: "#services",
  },
  {
    icon: Film,
    label: "影片剪輯",
    description: "動態內容",
    color: "video" as const,
    href: "#services",
  },
];

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-uiux/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 bg-muted/50 border border-border rounded-full px-4 py-2 mb-8 animate-fade-up opacity-0">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">一站式設計解決方案</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up opacity-0 stagger-1">
            從介面邏輯到視覺動態
            <br />
            <span className="text-gradient">為你的品牌創造價值</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up opacity-0 stagger-2">
            整合 UI/UX 設計、平面視覺與影片剪輯的跨領域設計師，
            提供完整的品牌設計解決方案
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-up opacity-0 stagger-3">
            <Button variant="hero" size="xl" asChild>
              <a href="#portfolio">
                查看作品集
                <ArrowRight className="ml-2" />
              </a>
            </Button>
            <Button variant="outline-glow" size="xl" asChild>
              <a href="#contact">預約諮詢</a>
            </Button>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up opacity-0 stagger-4">
            {services.map((service) => (
              <a
                key={service.label}
                href={service.href}
                className={`service-card service-card-${service.color} group cursor-pointer`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-${service.color}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className={`w-7 h-7 text-${service.color}`} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {service.label}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
                <ArrowRight className="w-5 h-5 text-muted-foreground mt-4 group-hover:text-primary group-hover:translate-x-2 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};
