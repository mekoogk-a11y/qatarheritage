import React, { useState } from 'react';
import { HERITAGE_TRADITIONS } from '../data/qatarData';
import { HeritageTradition } from '../types';
import { Sparkles, Waves, Coffee, Building2, Utensils, Hammer, CheckCircle2, ChevronLeft, X } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  const [selectedTradition, setSelectedTradition] = useState<HeritageTradition | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="heritage" className="py-16 sm:py-24 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>أصالة الذاكرة والهوية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            تراث قطر الأصيل
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            عادات المجالس، وأغاني الفجري في رحلات الغوص، وعمارة البراجيل، وحرف السدو، ومذاق المجبوس القطري.
          </p>
        </div>

        {/* Heritage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {HERITAGE_TRADITIONS.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-stone-900 border border-white/10 hover:border-[#8A1538]/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image & Category Pill */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />
                
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-[#8A1538] text-white border border-[#D4AF37]/40 shadow-sm flex items-center gap-1.5">
                  {getIcon(item.icon)}
                  <span>{item.categoryLabel}</span>
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FCEBA7] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Quick Details List */}
                <div className="space-y-1.5 pt-1">
                  {item.details.slice(0, 2).map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  onClick={() => setSelectedTradition(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-950 hover:bg-[#8A1538] text-white border border-white/10 hover:border-[#8A1538] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all mt-2 shadow"
                >
                  <span>استكشف تفاصيل التراث</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for Heritage Tradition Detail */}
        {selectedTradition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
            <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl p-6 sm:p-8 text-stone-100 max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-start mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#8A1538] text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
                    {getIcon(selectedTradition.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#D4AF37] block">
                      {selectedTradition.categoryLabel}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {selectedTradition.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTradition(null)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden mb-5 h-64 border border-white/10">
                <img
                  src={selectedTradition.image}
                  alt={selectedTradition.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-serif-ar mb-6">
                {selectedTradition.description}
              </p>

              <div className="space-y-3 mb-6 bg-black/40 p-5 rounded-2xl border border-white/5">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                  المصطلحات والتفاصيل التراثية الموثقة:
                </h4>
                {selectedTradition.details.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200">
                    <span className="w-2 h-2 rounded-full bg-[#8A1538] shrink-0 mt-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {selectedTradition.sources && (
                <div className="text-xs text-stone-400 flex items-center justify-between pt-2 border-t border-white/10">
                  <span>المصدر: {selectedTradition.sources[0]?.title} ({selectedTradition.sources[0]?.verifiedOrg})</span>
                  <button
                    onClick={() => setSelectedTradition(null)}
                    className="px-4 py-2 rounded-xl bg-[#8A1538] text-white text-xs font-bold hover:bg-[#ad1f49] transition"
                  >
                    إغلاق
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
