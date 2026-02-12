import React from "react"; // 需要引入 React 以使用 Fragment
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
    <section id="about" className="py-10 md:py-16 bg-background lg:h-screen lg:min-h-0 lg:py-0 lg:overflow-hidden lg:flex lg:flex-col lg:justify-center">
      <div className="container px-6 mx-auto lg:scale-[0.9] xl:scale-100 lg:origin-center transition-transform duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-0">
          <div className="flex-shrink-0">
            <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight py-2 md:whitespace-nowrap">
              精實團隊 <span className="text-gray-600">卓越影響。</span>
            </motion.h2>
          </div>
        </div>
        
        {/* 修改處：移除 gap-12，改由分隔線控制間距，並確保 items-stretch 讓分隔線高度正確 */}
        <div className="flex flex-col lg:flex-row items-stretch relative">
          {team.map((member, index) => (
            <React.Fragment key={member.name}>
                {/* 修改重點：
                   1. motion.div 現在只單純包含卡片內容 (圖片+文字)。
                   2. 移除了內部的分隔線邏輯，確保 md:flex-row 時不會有額外元素干擾排版。
                */}
                <motion.div 
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: false }} 
                    transition={{ delay: index * 0.2, ...springTransition }} 
                    className="flex-1 flex flex-col md:flex-row gap-8 items-start group w-full"
                >
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
                </motion.div>

                {/* 修改處：將分隔線移到這裡 (motion.div 之外) */}
                {index === 0 && (
                  <>
                    {/* 電腦版垂直分隔線 */}
                    <div className="hidden lg:block w-[1px] bg-white/10 mx-12 self-stretch" />
                    
                    {/* 手機/平板水平分隔線 */}
                    <div className="block lg:hidden w-full h-[1px] bg-white/10 my-12" />
                  </>
                )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};