import { useEffect, useRef } from "react";
import { Zap, Target, Users } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10px" });
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/\d/g, "");
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 50, damping: 15 });

  useEffect(() => {
    if (isInView) count.set(numericValue);
    else count.set(0);
  }, [isInView, numericValue, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest) + suffix;
    });
    return () => unsubscribe();
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const highlights = [
  { icon: Zap, title: "跨領域整合", description: "能同時處理 UI 介面與影片剪輯，為品牌提供一致的視覺語言。" },
  { icon: Target, title: "結果導向", description: "不只追求美觀，更注重設計能否達成商業目標與使用者需求。" },
  { icon: Users, title: "高效溝通", description: "標準化的合作流程，確保專案順利推進、按時交付。" },
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              關於<span className="text-gradient">我</span>
            </h2>
            {/* ✨ 修改：將文字包裹在白色卡片中 */}
            <div className="cartoon-card bg-white p-8 rounded-3xl mb-8">
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                擁有多年設計經驗的跨領域設計師，專注於將 UI/UX 設計、平面視覺與動態影像完美整合。
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                從使用者體驗的角度出發，打造不只美觀、更能解決問題的設計作品。
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="text-center sm:text-left p-4 rounded-2xl border-2 border-transparent hover:border-primary/20 transition-colors"
                >
                  <span className="font-display text-3xl md:text-4xl font-bold text-primary block mb-2 tabular-nums">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <p className="text-sm text-muted-foreground font-bold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 10 }}
                // ✨ 修改：使用 cartoon-card 樣式
                className="cartoon-card bg-white rounded-2xl p-6 flex gap-5"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">
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