import React from 'react';
import { X, ShieldCheck, Heart, Award, Phone, ExternalLink } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl p-6 sm:p-8 text-stone-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8A1538] to-[#5e0d24] text-white flex items-center justify-center font-bold text-xl border border-[#D4AF37]/50 shadow">
              🇶🇦
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">
                عن تطبيق «اكتشف قطر»
              </h3>
              <span className="text-xs text-[#D4AF37] font-semibold">
                قطر كما لم تعرفها من قبل
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Cultural Mission Text */}
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-200 font-serif-ar mb-6">
          <p className="p-4 rounded-2xl bg-[#8A1538]/15 border-r-4 border-[#8A1538] text-white font-sans text-base">
            «اكتشف قطر هو مشروع رقمي ثقافي يهدف إلى تقديم المعرفة عن دولة قطر ومدنها وتراثها ومعالمها بطريقة حديثة وتفاعلية.»
          </p>

          <p className="text-stone-300 text-xs sm:text-sm">
            «هذا التطبيق مشروع مستقل وليس موقعاً حكومياً رسمياً، والمعلومات يتم توثيقها من المصادر المتاحة والموثوقة.»
          </p>
        </div>

        {/* Source and Copyright Policy */}
        <div className="p-5 rounded-2xl bg-stone-950 border border-white/10 space-y-3 mb-6 text-xs text-stone-300">
          <h4 className="font-bold text-[#FCEBA7] text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>سياسة التوثيق وحقوق الصور والمحتوى</span>
          </h4>
          <p className="leading-relaxed">
            يعتمد التطبيق في معلوماته التاريخية والجغرافية على السجلات الرسمية الصادرة عن متاحف قطر (QM)، قطر للسياحة (Visit Qatar)، وزارة الثقافة، وزارة البيئة والتغير المناخي، ومنظمة الأمم المتحدة للتربية والعلم والثقافة (اليونسكو).
          </p>
          <p className="leading-relaxed">
            الصور المستخدمة إما مرخصة أو من مصادر عامة تسمح بإعادة الاستخدام الثقافي غير التجاري مع حفظ حقوق المصورين والجهات المالكة.
          </p>
        </div>

        {/* Designer Credits */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#8A1538]/30 via-stone-950 to-stone-950 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div>
            <span className="text-xs text-[#D4AF37] font-bold block mb-1">
              إشراف وتطوير المنصة:
            </span>
            <h4 className="text-lg font-black text-white">
              تصميم كمال جعفر زكريا
            </h4>
            <div className="text-xs text-stone-300 mt-1 flex items-center justify-center sm:justify-start gap-1.5" dir="ltr">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono">واتساب: 00249919980435</span>
            </div>
          </div>

          <a
            href="https://wa.me/249919980435"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg"
          >
            <span>تواصل عبر WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs sm:text-sm font-bold transition"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
