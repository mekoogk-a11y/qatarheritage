import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed, don't show prompt
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {isInstallable && (
        <button
          onClick={install}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-[#8A1538] hover:bg-[#ad1f49] text-white border border-[#D4AF37]/40 shadow-sm transition-all hover:scale-105 active:scale-95"
          title="تثبيت التطبيق على جهازك"
        >
          <Download className="w-3.5 h-3.5" />
          <span>تثبيت التطبيق</span>
        </button>
      )}

      {isIOS && !isInstallable && (
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-[#8A1538]/30 hover:bg-[#8A1538]/60 text-white/90 border border-white/20 transition-all"
          title="تثبيت على أجهزة iPhone و iPad"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>تثبيت على iOS</span>
        </button>
      )}

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 text-right">
          <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-[#8A1538]/40 p-6 shadow-2xl text-stone-100 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#D4AF37]" />
                التثبيت على أجهزة آيفون / آيباد
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-stone-300 leading-relaxed mb-4">
              لتثبيت تطبيق <span className="text-[#D4AF37] font-bold">«اكتشف قطر»</span> والوصول إليه بسرعة كأي تطبيق أصلي:
            </p>

            <ol className="text-xs sm:text-sm space-y-3 text-stone-300 bg-black/40 p-4 rounded-xl border border-white/5 mb-5">
              <li className="flex items-start gap-2">
                <span className="bg-[#8A1538] text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs">١</span>
                <span>اضغط على زر <strong>المشاركة (Share)</strong> في شريط متصفح سفاري السفلي.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-[#8A1538] text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs">٢</span>
                <span>مرر للأسفل واختر <strong>«إضافة إلى الصفحة الرئيسية» (Add to Home Screen)</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-[#8A1538] text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs">٣</span>
                <span>اضغط على <strong>«إضافة» (Add)</strong> في الزاوية العلوية لتثبيت التطبيق.</span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#8A1538] text-white font-medium hover:bg-[#ad1f49] transition"
            >
              فهمت ذلك، إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
};
