import { useState } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Play } from "lucide-react";

type PortfolioCategory = "all" | "uiux" | "graphic" | "video";

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  category: Exclude<PortfolioCategory, "all">;
  image: string;
  isVideo?: boolean;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "電商平台 App 介面重設計",
    client: "Fashion Brand",
    category: "uiux",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "品牌識別設計",
    client: "Startup Company",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "產品宣傳影片",
    client: "Tech Product",
    category: "video",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
    isVideo: true,
  },
  {
    id: 4,
    title: "SaaS 儀表板設計",
    client: "Analytics Platform",
    category: "uiux",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "社群媒體素材包",
    client: "Coffee Brand",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "企業形象短片",
    client: "Corporate Client",
    category: "video",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop",
    isVideo: true,
  },
];

const filterTabs: { key: PortfolioCategory; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "uiux", label: "UI/UX" },
  { key: "graphic", label: "平面" },
  { key: "video", label: "影片" },
];

export const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("all");

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            精選<span className="text-gradient">作品集</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            每個專案背後都有獨特的設計思維與解決方案
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={cn(
                "px-5 py-2.5 rounded-lg font-medium transition-all duration-300",
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-card cursor-pointer animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-medium mb-3",
                    item.category === "uiux" && "bg-uiux/20 text-uiux",
                    item.category === "graphic" && "bg-graphic/20 text-graphic",
                    item.category === "video" && "bg-video/20 text-video"
                  )}
                >
                  {item.category === "uiux" && "UI/UX"}
                  {item.category === "graphic" && "平面設計"}
                  {item.category === "video" && "影片剪輯"}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.client}</p>
              </div>

              {/* Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.isVideo ? (
                  <Play className="w-5 h-5 text-foreground" />
                ) : (
                  <ExternalLink className="w-5 h-5 text-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
