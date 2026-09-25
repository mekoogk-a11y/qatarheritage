import React, { useState } from 'react';
import { Lightbulb, ChevronRight, ChevronLeft, Sparkles, BookOpen, ExternalLink, X } from 'lucide-react';
import { DID_YOU_KNOW_FACTS } from '../data/qatarData';
import { DidYouKnowFact } from '../types';

export const DidYouKnowSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFact, setSelectedFact] = useState<DidYouKnowFact | null>(null);

  const currentFact = DID_YOU_KNOW_FACTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DID_YOU_KNOW_FACTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DID_YOU_KNOW_FACTS.length) % DID_YOU_KNOW_FACTS.length);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Box */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#8A1538]/30 via-stone-900 to-stone-900 border border-[#D4AF37]/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <div className="w-8 h-8 rounded-full bg-[#8A1538] text-white flex items-center justify-center font-bold text-xs">
                🇶🇦
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                هل تعلم؟
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-400">
              <span>{currentIndex + 1} / {DID_YOU_KNOW_FACTS.length}</span>
              <div className="flex items-center gap-1 mr-2">
                <button
                  onClick={handlePrev}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white"
                  title="السابق"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white"
                  title="التالي"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-lg sm:text-2xl font-bold text-[#FCEBA7] font-serif-ar leading-relaxed mb-4">
            «{currentFact.fact}»
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-400 pt-3 border-t border-white/5">
            <div>
              <span className="text-stone-500">المصدر الموثق: </span>
              <span className="text-stone-300 font-medium">{currentFact.source}</span>
            </div>

            <button
              onClick={() => setSelectedFact(currentFact)}
              className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white font-bold text-xs flex items-center gap-1.5 transition shadow"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>اكتشف القصة</span>
            </button>
          </div>

        </div>

        {/* Fact Story Modal */}
        {selectedFact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
            <div className="relative w-full max-w-lg rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl p-6 text-stone-100">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  قصة المعلومة
                </h4>
                <button
                  onClick={() => setSelectedFact(null)}
                  className="text-stone-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl bg-[#8A1538]/20 border border-[#8A1538]/40 p-4 mb-4 text-[#FCEBA7] font-serif-ar text-base leading-relaxed">
                «{selectedFact.fact}»
              </div>

              <p className="text-sm text-stone-200 leading-relaxed font-serif-ar mb-6">
                {selectedFact.detailedStory}
              </p>

              <div className="text-xs text-stone-400 flex items-center justify-between pt-2 border-t border-white/10">
                <span>المصدر: {selectedFact.source}</span>
                <button
                  onClick={() => setSelectedFact(null)}
                  className="px-4 py-2 rounded-xl bg-[#8A1538] text-white font-bold hover:bg-[#ad1f49] transition text-xs"
                >
                  تم، إغلاق
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
