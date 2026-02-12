import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// 1. 定義資料結構
const faqCategories = [
  {
    id: "general",
    label: "一般常見問題",
    questions: [
      { q: "專案通常需要多長時間？", a: "專案時程取決於功能的複雜度。一般 Landing Page 約 2-3 週；形象官網約 4-6 週；若包含客製化後台或大型系統開發，則通常需 8 週以上。" },
      { q: "我需要準備什麼資料？", a: "建議您準備：1. 品牌識別素材 (Logo AI檔、品牌色票)。2. 網站架構圖 (Sitemap)。3. 預計放置的文案與圖片。若尚未準備齊全，我們也能協助企劃。" },
      { q: "可以簽署保密協定(NDA)嗎？", a: "當然可以。我們重視每一位客戶的商業機密，在專案開始前皆可配合簽署保密協定，保障您的權益。" }
    ]
  },
  {
    id: "process",
    label: "服務與合作流程",
    questions: [
      { q: "設計不滿意可以修改嗎？", a: "沒問題。每個階段（如線稿、UI設計）皆包含 2-3 次的來回修改討論 (Revision)，我們會在開發前確保設計圖完全符合您的期待。" },
      { q: "合作流程是怎麼樣的？", a: "大致流程為：需求訪談 → 報價與簽約 → 介面設計(UI/UX) → 程式開發 → 測試與驗收 → 正式上線 → 後續維護。" },
      { q: "專案進行中如何溝通？", a: "我們會建立專屬的 Line 群組或 Slack 頻道，並定期回報進度。重大里程碑會安排線上會議進行展示與討論。" }
    ]
  },
  {
    id: "technical",
    label: "技術與主機維護",
    questions: [
      { q: "網站需要自己租主機嗎？", a: "這取決於您的需求。我們可以協助您評估並代管主機（使用 AWS, GCP 等雲端服務）；若您已有指定伺服器，我們也能配合部署。" },
      { q: "你們提供後續維護嗎？", a: "有的，上線後享有 30 天免費技術保固。保固期結束後，我們提供彈性的「年度維護合約」，包含資安更新、備份及內容修改。" },
      { q: "網站會支援手機版嗎？", a: "一定會。我們所有的專案皆採用 RWD (響應式網頁設計)，確保在桌機、平板、手機上都有完美的瀏覽體驗。" }
    ]
  },
  {
    id: "payment",
    label: "費用與付款方式",
    questions: [
      { q: "付款方式如何計算？", a: "標準流程為：簽約支付 50% 訂金啟動專案；開發完成並驗收後支付 50% 尾款。金額較大專案可討論依里程碑分期。" },
      { q: "是否有額外隱藏費用？", a: "報價單會列出所有開發項目。除非在執行過程中新增了原範疇外的功能需求，否則不會有任何額外費用產生。" }
    ]
  }
];

// 將所有問題扁平化，供手機版使用
const allQuestions = faqCategories.flatMap(cat => cat.questions);

const fadeTransition = { duration: 0.4, ease: "easeInOut" } as const;

export const FAQSection = () => {
  // Desktop State
  const [activeCategoryId, setActiveCategoryId] = useState(faqCategories[0].id);
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);
  
  // Mobile State
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);

  const activeCategory = faqCategories.find(c => c.id === activeCategoryId) || faqCategories[0];

  useEffect(() => {
    setOpenQuestionIndex(0);
  }, [activeCategoryId]);

  return (
    // Section: 電腦版 h-screen 固定高度，手機版 min-h-screen 自動高度
    <section id="faq" className="bg-background relative z-10 overflow-hidden lg:h-screen flex flex-col justify-center py-10 lg:py-0">
      
      <div className="container px-6 mx-auto h-full lg:max-h-[900px] flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-8 lg:mb-12 shrink-0">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-white leading-tight w-fit pr-2">
            解惑 <span className="text-gray-600">您的疑問。</span>
          </h2>
        </div>

        {/* =========================================
            MOBILE & TABLET VIEW (< lg)
            直接列出所有問題
           ========================================= */}
        <div className="flex flex-col gap-4 lg:hidden pb-12">
          {allQuestions.map((item, index) => {
            const isOpen = mobileOpenIndex === index;
            return (
              <div 
                key={`mobile-${index}`}
                onClick={() => setMobileOpenIndex(isOpen ? null : index)}
                className={cn(
                  "group border border-white/10 rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden",
                  isOpen ? "bg-white/5 border-white/20" : "bg-transparent hover:bg-white/[0.02]"
                )}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className={cn("text-lg font-medium transition-colors", isOpen ? "text-white" : "text-gray-400 group-hover:text-white")}>
                    {item.q}
                  </h3>
                  <div className={cn(
                    "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 flex-shrink-0",
                    isOpen ? "bg-white text-black rotate-180 border-white" : "text-gray-500 group-hover:text-white group-hover:border-white"
                  )}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="text-gray-400 leading-relaxed text-base border-t border-white/10 pt-4">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* =========================================
            DESKTOP VIEW (>= lg)
            維持分類切換與左右佈局
           ========================================= */}
        <div className="hidden lg:flex flex-row w-full flex-1 min-h-0 max-h-[60vh]">
          
          {/* 左側：問題列表 (70%) */}
          <div className="flex-[7] pr-12 overflow-y-auto custom-scrollbar pr-2">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeCategoryId}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 10 }}
                 transition={fadeTransition}
                 className="flex flex-col gap-4"
               >
                  {activeCategory.questions.map((item, index) => {
                    const isOpen = openQuestionIndex === index;
                    return (
                      <div 
                        key={index}
                        onClick={() => setOpenQuestionIndex(isOpen ? null : index)}
                        className={cn(
                          "group border border-white/10 rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden",
                          isOpen ? "bg-white/5 border-white/20" : "bg-transparent hover:bg-white/[0.02]"
                        )}
                      >
                        <div className="flex justify-between items-center gap-4">
                          <h3 className={cn("text-xl font-medium transition-colors", isOpen ? "text-white" : "text-gray-400 group-hover:text-white")}>
                            {item.q}
                          </h3>
                          <div className={cn(
                            "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 flex-shrink-0",
                            isOpen ? "bg-white text-black rotate-180 border-white" : "text-gray-500 group-hover:text-white group-hover:border-white"
                          )}>
                             {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                          </div>
                        </div>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <p className="text-gray-400 leading-relaxed text-base border-t border-white/10 pt-4">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
               </motion.div>
             </AnimatePresence>
          </div>

          {/* 分隔線 */}
          <div className="w-[1px] bg-white/10 mx-4 h-full" />

          {/* 右側：類別選單 (30%) */}
          <div className="flex flex-[3] pl-8 flex-col justify-between py-1">
             {faqCategories.map((cat) => {
               const isActive = activeCategoryId === cat.id;
               return (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCategoryId(cat.id)}
                   className="group relative w-full text-left py-6 px-6 rounded-xl transition-all duration-500 flex items-center"
                 >
                   {/* 背景 Highlight */}
                   <span className={cn(
                     "absolute inset-0 rounded-xl bg-white/5 transition-opacity duration-500",
                     isActive ? "opacity-100" : "opacity-0 group-hover:opacity-30"
                   )} />
                   
                   {/* 左側指示條 */}
                   <span className={cn(
                     "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-[#0071e3] transition-all duration-300",
                     isActive ? "opacity-100 h-12" : "opacity-0 h-4"
                   )} />

                   <div className="relative z-10 w-full">
                     <span className={cn(
                       "text-xl font-medium transition-colors duration-300 block",
                       isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                     )}>
                       {cat.label}
                     </span>
                   </div>
                 </button>
               )
             })}
          </div>

        </div>
      </div>
    </section>
  );
};