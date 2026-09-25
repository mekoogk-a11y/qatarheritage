import React from 'react';
import { Phone, Heart, Shield, Globe, ExternalLink, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenAdmin: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenAdmin,
  onNavigateTo,
}) => {
  return (
    <footer className="bg-stone-950 border-t border-white/10 text-stone-300 pt-16 pb-24 sm:pb-16 relative overflow-hidden">
      
      {/* Decorative Traditional Qatar Flag Serration (9 teeth) at top of footer */}
      <div className="absolute top-0 inset-x-0 h-4 opacity-20 overflow-hidden flex justify-between pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-[#8A1538]"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8A1538] border border-[#D4AF37] flex items-center justify-center text-xl shadow">
                🇶🇦
              </div>
              <div>
                <h3 className="text-xl font-black text-white">اكتشف قطر</h3>
                <span className="text-xs text-[#D4AF37] font-semibold">قطر كما لم تعرفها من قبل</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif-ar max-w-lg">
              «اكتشف قطر هو مشروع رقمي ثقافي يهدف إلى تقديم المعرفة عن دولة قطر ومدنها وتراثها ومعالمها بطريقة حديثة وتفاعلية.»
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-lg">
              «هذا التطبيق مشروع مستقل وليس موقعاً حكومياً رسمياً، والمعلومات يتم توثيقها من المصادر المتاحة والموثوقة.»
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              أقسام المنصة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTo('cities')} className="hover:text-white transition">
                  مدن وبلدات قطر
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('landmarks')} className="hover:text-white transition">
                  معالم قطر التراثية والحديثة
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('museums')} className="hover:text-white transition">
                  متاحف قطر الوطنية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('timeline')} className="hover:text-white transition">
                  رحلة قطر عبر الزمن (التاريخ)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('heritage')} className="hover:text-white transition">
                  تراث قطر (الغوص والمجالس والسدو)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('map')} className="hover:text-white transition">
                  خريطة قطر التفاعلية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('quiz')} className="hover:text-white transition">
                  مسابقة: كم تعرف عن قطر؟
                </button>
              </li>
            </ul>
          </div>

          {/* Credits & Official Sources */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              المصادر المعتمدة
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>• متاحف قطر (Qatar Museums)</li>
              <li>• قطر للسياحة (Visit Qatar)</li>
              <li>• وزارة الثقافة القطرية</li>
              <li>• سجل التراث العالمي لليونسكو (UNESCO)</li>
              <li>• وزارة البيئة والتغير المناخي</li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-xs text-stone-400 hover:text-white flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 transition"
              >
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>لوحة تحكم المشرف (CMS)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Prominent Designer Signature Block */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#8A1538]/30 via-stone-900 to-[#8A1538]/20 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right my-8 shadow-xl">
          <div>
            <span className="text-[11px] text-[#D4AF37] font-bold block mb-0.5">
              تطوير وتصميم وبرمجة الواجهة والأنظمة:
            </span>
            <h4 className="text-xl font-black text-white">
              تصميم كمال جعفر زكريا
            </h4>
            <div className="text-xs text-stone-300 font-mono mt-0.5 flex items-center justify-center sm:justify-start gap-1.5" dir="ltr">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>واتساب: 00249919980435</span>
            </div>
          </div>

          <a
            href="https://wa.me/249919980435"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>مراسلة عبر واتساب</span>
          </a>
        </div>

        {/* Bottom Rights Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3 text-center">
          <div>
            © {new Date().getFullYear()} «اكتشف قطر 🇶🇦» — منصة معرفية وثقافية وسياحية.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenAbout} className="hover:text-white underline">
              حول التطبيق والسياسة
            </button>
            <span>•</span>
            <span className="text-[#D4AF37]">تصميم كمال جعفر زكريا</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
