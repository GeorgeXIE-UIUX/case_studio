import { motion, Variants } from "framer-motion";

const team = [
  { name: "George Xie", role: "創意總監", experience: "7年以上經驗", bio: "專注於數位產品的介面設計與使用者體驗。曾主導多個跨國品牌的視覺重塑專案。", skills: ["UI/UX", "品牌識別", "Figma"], image: "" }, 
  { name: "MengPin Wang", role: "技術主管", experience: "5年以上經驗", bio: "熱愛鑽研新技術的全端工程師。負責系統架構規劃與效能優化。", skills: ["React", "Node.js", "WebGL"], image: "" }
];

const springTransition = { type: "spring" as const, stiffness: 50, damping: 20, mass: 1 };
const revealVariants: Variants = { hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)", transition: springTransition } };
const fadeUpVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: springTransition } };

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background min-h-[100dvh] snap-start snap-always scroll-mt-0">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-0">
          <div className="flex-shrink-0">
            <motion.span variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">關於我們</motion.span>
            <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight py-2 md:whitespace-nowrap">
              精實團隊 <span className="text-gray-600">卓越影響。</span>
            </motion.h2>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start relative">
          {team.map((member, index) => (
            <motion.div key={member.name} initial={{ opacity: 0, x: index === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: index * 0.2, ...springTransition }} className="flex-1 flex flex-col md:flex-row gap-8 items-start group w-full">
               
               {/* 圖片區域：圓角正方形 + 手機版滿寬 */}
               <div className="relative w-full md:max-w-none md:w-48 aspect-square flex-shrink-0 overflow-hidden rounded-2xl bg-white/5 mx-auto md:mx-0">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div className="border-b border-white/10 pb-3 mb-3">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <div className="flex flex-wrap justify-between items-center mt-1 gap-2">
                      <p className="text-[#0071e3] text-sm font-medium tracking-wide uppercase">{member.role}</p>
                      <span className="text-xs font-mono text-gray-500">{member.experience}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  <div className="pt-2 flex flex-wrap gap-2">{member.skills.map((skill) => (<span key={skill} className="text-[10px] uppercase tracking-wider font-medium text-gray-500 border border-white/10 px-2 py-1 rounded bg-white/5">{skill}</span>))}</div>
                </div>

                {/* 修改處：移除 min-h-[300px]，只保留 self-stretch 與 w-[1px] */}
                {/* 這樣線條高度就會自動跟隨該卡片內容的高度 */}
                {index === 0 && <div className="hidden lg:block w-[1px] bg-white/10 self-stretch mx-4" />}
                
                {/* 手機版橫線 */}
                {index === 0 && <div className="block lg:hidden w-full h-[1px] bg-white/10 my-4" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};