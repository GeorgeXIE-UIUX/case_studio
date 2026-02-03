import { useEffect, useRef } from "react";
import { Zap, Target, Users } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

// --- ✨ 修正後的數字滾動組件 ---
const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  // 1. 調整 margin: 改成 "-10px"，讓它更容易被觸發，不會因為還沒完全進入畫面就不顯示
  const isInView = useInView(ref, { once: false, margin: "-10px" });
  
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/\d/g, "");

  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 50, damping: 15 });

  useEffect(() => {
    if (isInView) {
      count.set(numericValue);
    } else {
      // 離開畫面時歸零，這樣下次滑回來才會再跑一次動畫
      count.set(0);
    }
  }, [isInView, numericValue, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
    return () => unsubscribe();
  }, [rounded, suffix]);

  // ✨ 關鍵修正：這裡預設顯示 "0+"，避免動畫開始前是空白的
  return <span ref={ref}>0{suffix}</span>;
};

// --- 資料與內容 ---
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

const stats = [
  { value: "50+", label: "完成專案" },
  { value: "30+", label: "合作客戶" },
  { value: "5+", label: "年經驗" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-transparent relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左側內容 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              關於<span className="text-gradient">我</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              擁有多年設計經驗的跨領域設計師，專注於將 UI/UX 設計、平面視覺與動態影像完美整合。
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              從使用者體驗的角度出發，打造不只美觀、更能解決問題的設計作品。
            </p>

            {/* 數據統計區塊 */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="text-center sm:text-left"
                >
                  <span className="font-display text-3xl md:text-4xl font-bold text-primary block mb-2 tabular-nums">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 右側亮點卡片 */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="rounded-2xl p-6 border border-border/50 bg-card/50 backdrop-blur-sm flex gap-5 hover:border-primary/30 transition-colors shadow-sm"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};