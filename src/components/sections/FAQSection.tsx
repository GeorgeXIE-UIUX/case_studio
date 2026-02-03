import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "修改次數限制？",
    answer: "一般專案包含 2-3 次修改機會。若需額外修改，將另行報價。建議在初稿階段提供完整回饋，以確保修改方向正確。",
  },
  {
    question: "是否提供原始檔？",
    answer: "是的，專案完成後會提供完整的原始設計檔案（Figma、AI、PSD、PR 等），方便日後修改與使用。",
  },
  {
    question: "急件如何加價？",
    answer: "急件加價視專案複雜度與時程而定，通常為原價的 20%-50%。建議提前規劃以確保最佳品質。",
  },
  {
    question: "付款方式為何？",
    answer: "採分期付款：簽約時支付 50% 定金，專案交付後支付 50% 尾款。支援銀行轉帳與信用卡付款。",
  },
  {
    question: "合作流程需要多長時間？",
    answer: "視專案規模而定。Landing Page 約 1-2 週，完整官網設計約 3-6 週，影片剪輯約 3-7 個工作天。",
  },
  {
    question: "可以只諮詢不合作嗎？",
    answer: "當然可以！歡迎先填寫表單了解需求，我會提供免費的初步評估與建議。沒有任何強制合作的壓力。",
  },
];

export const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-transparent relative">

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            <span className="text-gradient">常見問答</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            合作前你可能想知道的事情，這裡都有解答
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }} // 每次滑動觸發
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border transition-all duration-300 ${
                openFaq === index 
                  ? "bg-primary/5 border-primary/50 shadow-md" 
                  : "bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className={`font-display font-medium text-lg ${openFaq === index ? "text-primary" : "text-foreground"}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded-full ${openFaq === index ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};