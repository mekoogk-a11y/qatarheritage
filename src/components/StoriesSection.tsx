import React, { useState } from 'react';
import { BookOpen, Clock, ChevronLeft, X, Sparkles, Share2 } from 'lucide-react';
import { STORIES_DATA } from '../data/qatarData';
import { Story } from '../types';

interface StoriesSectionProps {
  onOpenShare: (title: string, text: string) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ onOpenShare }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <section id="stories" className="py-16 sm:py-24 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <BookOpen className="w-4 h-4" />
            <span>حكايات ملهمة من عبق الماضي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            قصص من قطر
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            روايات تاريخية شيقة توثق حياة الأجداد في مغاصات اللؤلؤ وحكاية الأسواق العتيقة وأسوار الزبارة العالمية.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {STORIES_DATA.map((story) => (
            <div
              key={story.id}
              className="group rounded-3xl bg-stone-900 border border-white/10 hover:border-[#8A1538]/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={story.heroImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8A1538] text-white border border-[#D4AF37]/40 shadow">
                    {story.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 text-xs text-stone-300 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{story.readTime}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#FCEBA7] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3 font-serif-ar">
                    {story.intro}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedStory(story)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-md"
                >
                  <span>اقرأ القصة كاملة</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Story Reading Modal (Mobile First optimized) */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
            <div className="relative w-full max-w-3xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-stone-100">
              
              {/* Header */}
              <div className="relative h-64 sm:h-80 shrink-0">
                <img
                  src={selectedStory.heroImage}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />

                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 left-4 p-2 rounded-full bg-black/70 text-white hover:bg-black transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 right-6 left-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8A1538] text-white border border-[#D4AF37]/50">
                      {selectedStory.category}
                    </span>
                    <span className="text-xs text-stone-300 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{selectedStory.readTime}</span>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {selectedStory.title}
                  </h3>
                </div>
              </div>

              {/* Story Content Reader */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Intro Blockquote */}
                <div className="p-4 rounded-2xl bg-[#8A1538]/15 border-r-4 border-[#8A1538] text-base sm:text-lg font-serif-ar italic text-[#FCEBA7] leading-relaxed">
                  "{selectedStory.intro}"
                </div>

                {/* Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-stone-200 leading-relaxed font-serif-ar">
                  {selectedStory.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Historical Context Box */}
                {selectedStory.historicalContext && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3 text-xs sm:text-sm text-stone-300">
                    <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block mb-0.5">السياق التاريخي:</strong>
                      <p>{selectedStory.historicalContext}</p>
                    </div>
                  </div>
                )}

                {/* Sources & Share */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-400">
                  <div>
                    المصدر: {selectedStory.sources[0]?.title} ({selectedStory.sources[0]?.verifiedOrg})
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onOpenShare(
                          selectedStory.title,
                          `اقرأ قصة: ${selectedStory.title} عبر منصة اكتشف قطر 🇶🇦`
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>مشاركة القصة</span>
                    </button>
                    <button
                      onClick={() => setSelectedStory(null)}
                      className="px-5 py-2 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white font-bold transition"
                    >
                      إغلاق القراءة
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
